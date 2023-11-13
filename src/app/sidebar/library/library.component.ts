import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { SupabaseService } from '../../services/supabase.service';
import { AuthSession } from '@supabase/supabase-js';
import { Song } from '../../types/types';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
})
export class LibraryComponent implements OnInit {
  session: AuthSession | null;
  songs: Song[];

  constructor(
    private modalService: ModalService,
    private supabaseService: SupabaseService
  ) {}

  toggleUploadModal() {
    if (!this.session) {
      this.modalService.toggleLoginModal();
      return;
    }
    this.modalService.toggleUploadModal();
  }

  ngOnInit() {
    this.supabaseService.authChanges((_, session) => (this.session = session));

    this.supabaseService.getSongsByUserId().then((songs: Song[]) => {
      this.songs = songs;
      console.log('songs: ', songs);
    });
  }
}
