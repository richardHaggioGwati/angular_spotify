import { Component } from '@angular/core';

import {
  faCaretLeft,
  faCaretRight,
  faHome,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  leftIcon = faCaretLeft;
  rightIcon = faCaretRight;
  homeIcon = faHome;
  searchIcon = faSearch;
}
