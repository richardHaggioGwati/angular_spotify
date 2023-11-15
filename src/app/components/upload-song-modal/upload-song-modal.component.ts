import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SupabaseService } from '../../services/supabase.service';
import { AuthSession } from '@supabase/supabase-js';

@Component({
  selector: 'app-upload-song-modal',
  templateUrl: './upload-song-modal.component.html',
})
export class UploadSongModalComponent implements OnDestroy, OnInit {
  isOpen: boolean;
  private isSongUploadModalChangeSubscription: Subscription;
  isLoading = this.supabaseService.uploadSongLoading;

  songUploadForm: FormGroup;
  session: AuthSession | null;

  //FILES
  songFile: File | null;
  songCoverFile: File | null;

  constructor(
    private modalService: ModalService,
    private formBuilder: FormBuilder,
    private supabaseService: SupabaseService
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
    });
  }

  ngOnInit() {
    this.supabaseService.authChanges((_, session) => (this.session = session));
  }

  closeModal() {
    this.modalService.toggleUploadModal();
  }

  getSongFile(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const files = inputElement.files;

    if (files && files.length > 0) {
      this.songFile = files[0];
    }
  }

  getSongCoverFile(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const files = inputElement.files;

    if (files && files.length > 0) {
      this.songCoverFile = files[0];
    }
  }

  async onSubmit() {
    this.closeModal();
    this.modalService.toggleLoadingModal();
    const songTitle = this.songUploadForm.get('song_title')?.value as string;
    const songAuthor = this.songUploadForm.get('song_author')?.value as string;

    await this.supabaseService.uploadSong(
      songTitle,
      songAuthor,
      this.songFile,
      this.songCoverFile
    );
    this.songUploadForm.reset();
    this.songFile = null;
    this.songCoverFile = null;
    this.modalService.toggleLoadingModal();
  }

  ngOnDestroy() {
    this.isSongUploadModalChangeSubscription.unsubscribe();
  }
}
