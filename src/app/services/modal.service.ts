import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class ModalService {
  isAuthModalOpen = false;
  isUploadModalOpen = false;
  isLoadingModalOpen = false;

  isAuthModalOpenChange = new Subject<boolean>();
  isUploadModalOpenChange = new Subject<boolean>();
  isLoadingModalOpenChange = new Subject<boolean>();

  toggleLoginModal() {
    console.log(this.isAuthModalOpen);
    this.isAuthModalOpen = !this.isAuthModalOpen;
    this.isAuthModalOpenChange.next(this.isAuthModalOpen);
  }

  toggleUploadModal() {
    this.isUploadModalOpen = !this.isUploadModalOpen;
    this.isUploadModalOpenChange.next(this.isUploadModalOpen);
  }

  toggleLoadingModal() {
    this.isLoadingModalOpen = !this.isLoadingModalOpen;
    this.isLoadingModalOpenChange.next(this.isLoadingModalOpen);
  }
}
