import { Component } from '@angular/core';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  constructor(private modalService: ModalService) {}

  openAuthModal() {
    this.modalService.toggleLoginModal();
  }
}
