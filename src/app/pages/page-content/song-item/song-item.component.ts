import { Component, Input, OnInit } from '@angular/core';
import { Song } from '../../../types/types';
import { SupabaseService } from '../../../services/supabase.service';

@Component({
  selector: 'app-song-item',
  templateUrl: './song-item.component.html',
})
export class SongItemComponent implements OnInit {
  @Input() song: Song;
  imagePath: string | null;

  constructor(private supabaseService: SupabaseService) {}

  ngOnInit() {
    this.imagePath = this.supabaseService.downloadSongImageCover(this.song);
  }
}
