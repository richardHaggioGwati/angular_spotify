import { Component } from '@angular/core';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
})
export class LibraryComponent {
  constructor(private modalService: ModalService) {}

  toggleUploadModal() {
    this.modalService.toggleUploadModal();
  }
}
