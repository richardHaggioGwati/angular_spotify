import { Component, OnDestroy } from '@angular/core';
import { ModalService } from '../services/modal.service';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-upload-song-modal',
  templateUrl: './upload-song-modal.component.html',
})
export class UploadSongModalComponent implements OnDestroy {
  isOpen: boolean;
  private isSongUploadModalChangeSubscription: Subscription;
  isLoading = false;

  songUploadForm: FormGroup;

  constructor(
    private modalService: ModalService,
    private formBuilder: FormBuilder
  ) {
    this.isSongUploadModalChangeSubscription =
      this.modalService.isUploadModalOpenChange.subscribe(value => {
        this.isOpen = value;
      });
    this.songUploadForm = this.formBuilder.group({
      song_title: formBuilder.control('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      song_author: formBuilder.control('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      song_file: formBuilder.control('', [Validators.required]),
      song_cover: formBuilder.control('', [Validators.required]),
    });
  }

  closeModal() {
    this.modalService.toggleUploadModal();
  }

  ngOnDestroy() {
    this.isSongUploadModalChangeSubscription.unsubscribe();
  }
}
