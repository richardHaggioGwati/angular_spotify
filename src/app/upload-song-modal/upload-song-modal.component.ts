import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalService } from '../services/modal.service';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SupabaseService } from '../services/supabase.service';
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
      song_file: formBuilder.control(null, [Validators.required]),
      song_cover: formBuilder.control(null, [Validators.required]),
    });
  }

  ngOnInit() {
    this.supabaseService.authChanges((_, session) => (this.session = session));
  }

  closeModal() {
    this.modalService.toggleUploadModal();
  }

  async onSubmit() {
    const songTitle = this.songUploadForm.get('song_title')?.value as string;
    const songAuthor = this.songUploadForm.get('song_author')?.value as string;
    const imageFile = this.songUploadForm.get('song_cover')?.value as string;
    const songFile = this.songUploadForm.get('song_file')?.value as string;

    await this.supabaseService.uploadSong(
      songTitle,
      songAuthor,
      songFile,
      imageFile
    );
  }

  ngOnDestroy() {
    this.isSongUploadModalChangeSubscription.unsubscribe();
  }
}
