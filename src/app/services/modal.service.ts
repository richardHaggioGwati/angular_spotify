import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class ModalService {
  isLoginModalOpen = false;

  isLoginModalOpenChange = new Subject<boolean>();

  toggleLoginModal() {
    console.log(this.isLoginModalOpen);
    this.isLoginModalOpen = !this.isLoginModalOpen;
    this.isLoginModalOpenChange.next(this.isLoginModalOpen);
  }
}
