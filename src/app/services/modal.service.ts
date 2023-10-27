import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class ModalService {
  isAuthModalOpen = false;

  isAuthModalOpenChange = new Subject<boolean>();

  toggleLoginModal() {
    console.log(this.isAuthModalOpen);
    this.isAuthModalOpen = !this.isAuthModalOpen;
    this.isAuthModalOpenChange.next(this.isAuthModalOpen);
  }
}
