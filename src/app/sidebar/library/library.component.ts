import { Component } from '@angular/core';
import { faMusic, faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
})
export class LibraryComponent {
  //TODO: proper music list icon
  faMusicLibrary = faMusic;

  faPlus = faPlus;

  //TODO: add a handle upload function, for user songs
}
