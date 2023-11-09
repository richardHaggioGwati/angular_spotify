import { Component, OnInit } from '@angular/core';
import { SupabaseService } from '../services/supabase.service';
import { Song } from '../types/types';

@Component({
  selector: 'app-page-content',
  templateUrl: './page-content.component.html',
})
export class PageContentComponent implements OnInit {
  songs: Song[] = [];

  constructor(private supabaseService: SupabaseService) {}

  ngOnInit() {
    this.supabaseService.getSongs().then((songs: Song[]) => {
      this.songs = songs;
      console.log(songs);
    });
  }
}
