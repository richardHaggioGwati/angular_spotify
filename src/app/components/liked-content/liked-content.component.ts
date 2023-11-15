import { Component, Input } from '@angular/core';
import { Song } from '../../types/types';
import { SupabaseService } from '../../services/supabase.service';

@Component({
  selector: 'app-liked-content',
  templateUrl: './liked-content.component.html',
})
export class LikedContentComponent {
  @Input() songs: Song[] | undefined;

  constructor(private supabaseService: SupabaseService) {
    this.supabaseService.getLikedSongs().then(songs => {
      this.songs = songs;
    });
  }
}
