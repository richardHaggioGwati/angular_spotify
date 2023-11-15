import { Injectable } from '@angular/core';
import {
  AuthChangeEvent,
  AuthSession,
  createClient,
  Session,
  SupabaseClient,
  User,
} from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';
import { environment } from 'src/environments/environment';
import { Song } from '../types/types';
import { ModalService } from './modal.service';

export interface Profile {
  id?: string;
  username: string;
  avatar_url: string;
}

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase_client: SupabaseClient;
  uploadSongLoading = false;
  _session: AuthSession | null = null;
  _songLiked = false;

  constructor(private modalService: ModalService) {
    this.supabase_client = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
  }

  get session() {
    this.supabase_client.auth.getSession().then(({ data }) => {
      this._session = data.session;
    });
    return this._session;
  }

  profile(user: User) {
    return this.supabase_client
      .from('profiles')
      .select(`username, website, avatar_url`)
      .eq('id', user.id)
      .single();
  }

  authChanges(
    callback: (event: AuthChangeEvent, session: Session | null) => void
  ) {
    return this.supabase_client.auth.onAuthStateChange(callback);
  }

  signUp(email: string, password: string) {
    return this.supabase_client.auth.signUp({ email, password });
  }

  login(email: string, password: string) {
    return this.supabase_client.auth.signInWithPassword({ email, password });
  }

  signOut() {
    return this.supabase_client.auth.signOut();
  }

  updateProfile(profile: Profile) {
    const update = {
      ...profile,
      updated_at: new Date(),
    };

    return this.supabase_client.from('profiles').upsert(update);
  }

  async uploadSong(
    title: string,
    author: string,
    songFile: File | null,
    image: File | null
  ) {
    try {
      const user = await this.supabase_client.auth.getSession();
      const userID = user.data.session?.user.id;

      console.log({
        userID: 'userId',
      });
      console.log('Upload started...');
      this.uploadSongLoading = true;

      if (
        !image ||
        !songFile ||
        !(await this.supabase_client.auth.getSession())
      ) {
        return new Error('Missing fields');
      }

      const uniqueID = uuidv4();

      const { data: songData, error: songError } =
        await this.supabase_client.storage
          .from('songs')
          .upload(`song-${title}-${uniqueID}`, songFile, {
            cacheControl: '3600',
            upsert: false,
          });

      if (songError) {
        this.uploadSongLoading = false;
        return new Error(`Song upload error: ${songError.message}`);
      }

      const { data: imageData, error: imageError } =
        await this.supabase_client.storage
          .from('images')
          .upload(`image-${title}-${uniqueID}`, image, {
            cacheControl: '3600',
            upsert: false,
          });

      if (imageError) {
        this.uploadSongLoading = false;
        return new Error(`Image upload error: ${imageError.message}`);
      }

      // Create record
      const { error: supabaseError } = await this.supabase_client
        .from('songs')
        .insert({
          user_id: userID,
          title: title,
          author: author,
          image_path: imageData.path,
          song_path: songData.path,
        });

      if (supabaseError) {
        return new Error(`Supabase insert error: ${supabaseError.message}`);
      }

      console.log('Upload completed...');
      return;
    } catch (error) {
      return console.log('Error: ', error);
    } finally {
      this.uploadSongLoading = false;
    }
  }

  async getSongs(): Promise<Song[]> {
    const { data, error } = await this.supabase_client
      .from('songs')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.log(error);
    }

    return (data as Song[]) || [];
  }

  downloadSongImageCover(song: Song) {
    if (!song) return null;

    const { data: imageData } = this.supabase_client.storage
      .from('images')
      .getPublicUrl(song.image_path);

    return imageData.publicUrl;
  }

  async getSongsByUserId() {
    const { data: sessionData, error: sessionError } =
      await this.supabase_client.auth.getSession();

    if (sessionError) {
      console.log(sessionError.message);
      return [];
    }

    const { data, error } = await this.supabase_client
      .from('songs')
      .select('*')
      .eq('user_id', sessionData.session?.user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.log(error.message);
    }

    return (data as Song[]) || [];
  }

  async getSongsByTitle(title: string): Promise<Song[]> {
    if (!title) {
      return this.getSongs();
    }

    const { data, error } = await this.supabase_client
      .from('songs')
      .select('*')
      .ilike('title', `%${title}%`)
      .order('created_at', { ascending: false });

    if (error) {
      console.log(error);
    }

    return (data as Song[]) || [];
  }

  async likeSong(songID: string) {
    const user = await this.supabase_client.auth.getSession();
    const userID = user.data.session?.user.id;

    const { data, error } = await this.supabase_client
      .from('liked_songs')
      .select('*')
      .eq('userId', userID)
      .eq('song_id', songID)
      .single();

    if (!error && data) {
      this._songLiked = true;
    }
  }

  async handleLike(songId: string) {
    const user = await this.supabase_client.auth.getSession();
    const userID = user.data.session?.user.id;

    if (!user) {
      return this.modalService.toggleLoadingModal();
    }

    if (this._songLiked) {
      const { error } = await this.supabase_client
        .from('liked_songs')
        .delete()
        .eq('user_id', userID)
        .eq('song_id', songId);

      if (error) {
        console.log(error.message);
      } else {
        this._songLiked = false;
      }
    } else {
      const { error } = await this.supabase_client.from('liked_songs').insert({
        song_id: songId,
        user_id: userID,
      });

      if (error) {
        console.error(error.message);
      } else {
        this._songLiked = true;
        console.log('Success');
      }
    }
  }

  async getLikedSongs() {
    const {
      data: { session },
    } = await this.supabase_client.auth.getSession();

    const { data, error } = await this.supabase_client
      .from('liked_songs')
      .select('*, songs(*)')
      .eq('user_id', session?.user?.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.log(error);
    }

    return data?.map(item => ({
      ...item.songs,
    }));
  }
}
