import { Component, Input, OnInit } from '@angular/core';
import { Song } from '../../../../types/types';
import { SupabaseService } from '../../../../services/supabase.service';

@Component({
  selector: 'app-media-item',
  templateUrl: './media-item.component.html',
})
export class MediaItemComponent implements OnInit {
  @Input() song: Song;
  imagePath: string | null;

  constructor(private supabaseService: SupabaseService) {}

  ngOnInit() {
    this.imagePath = this.supabaseService.downloadSongImageCover(this.song);
  }
}
