import { Component, OnDestroy } from '@angular/core';
import { ModalService } from '../services/modal.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loading-spinner.component.html',
})
export class LoadingSpinnerComponent implements OnDestroy {
  isOpen = this.modalService.isLoadingModalOpen;
  private isLoadingModalChangeSubscription: Subscription;

  constructor(private modalService: ModalService) {
    this.isLoadingModalChangeSubscription =
      this.modalService.isLoadingModalOpenChange.subscribe(value => {
        this.isOpen = value;
      });
  }

  ngOnDestroy() {
    this.isLoadingModalChangeSubscription.unsubscribe();
  }
}
