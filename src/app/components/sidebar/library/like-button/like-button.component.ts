import { Component, Input } from '@angular/core';
import { SupabaseService } from '../../../../services/supabase.service';

@Component({
  selector: 'app-like-button',
  templateUrl: './like-button.component.html',
})
export class LikeButtonComponent {
  @Input() songID: string;
  liked: boolean = this.supabaseService._songLiked;

  constructor(private supabaseService: SupabaseService) {}

  likeSong() {
    this.liked = !this.liked;
    this.supabaseService.handleLike(this.songID);
  }
}
