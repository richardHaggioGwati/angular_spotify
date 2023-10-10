import { Component } from '@angular/core';

import {
  faCaretLeft,
  faCaretRight,
  faHome,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  leftIcon = faCaretLeft;
  rightIcon = faCaretRight;
  homeIcon = faHome;
  searchIcon = faSearch;

  constructor(private modalService: ModalService) {}

  openLoginModal() {
    this.modalService.toggleLoginModal();
  }
}
