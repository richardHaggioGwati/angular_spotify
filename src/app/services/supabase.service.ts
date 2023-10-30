import { Injectable } from '@angular/core';
import {
  AuthChangeEvent,
  AuthSession,
  createClient,
  Session,
  SupabaseClient,
  User,
} from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';

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
  _session: AuthSession | null = null;

  constructor() {
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
  signUpWithOtp(email: string) {
    return this.supabase_client.auth.signInWithOtp({ email });
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

  downLoadImage(path: string) {
    return this.supabase_client.storage.from('avatars').download(path);
  }

  uploadAvatar(filePath: string, file: File) {
    return this.supabase_client.storage.from('avatars').upload(filePath, file);
  }
}
