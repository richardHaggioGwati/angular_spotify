import { Component, Input } from '@angular/core';
import { Song } from '../../types/types';

@Component({
  selector: 'app-media-item',
  templateUrl: './media-item.component.html',
})
export class MediaItemComponent {
  @Input() song: Song;
}
