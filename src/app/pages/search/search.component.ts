import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { SupabaseService } from '../../services/supabase.service';
import { FormService } from '../../services/form.service';

import { Song } from '../../types/types';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
})
export class SearchComponent implements OnDestroy {
  songs: Song[] = [];
  searchParam: string;
  private formDataSubscription: Subscription;

  constructor(
    private supabaseService: SupabaseService,
    private formDataService: FormService
  ) {
    this.formDataSubscription =
      this.formDataService.formValueChanged$.subscribe(data => {
        this.searchParam = data;
      });
    this.supabaseService.getSongsByTitle(this.searchParam).then(song => {
      this.songs = song;
    });
    console.log('songs: ', this.songs);
  }

  ngOnDestroy() {
    // Unsubscribe to avoid memory leaks
    this.formDataSubscription.unsubscribe();
  }
}
