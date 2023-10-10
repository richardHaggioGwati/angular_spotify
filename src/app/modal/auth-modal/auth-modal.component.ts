import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SupabaseService } from '../../supabase.service';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-auth-modal',
  templateUrl: './auth-modal.component.html',
})
export class AuthModalComponent implements OnInit, OnDestroy {
  loading = false;
  isOpen = this.modalService.isLoginModalOpen;
  private isLoginModalOpenSubscription: Subscription;

  signInForm = this.formBuilder.group({
    email: '',
  });

  constructor(
    private readonly supabase: SupabaseService,
    private readonly formBuilder: FormBuilder,
    private modalService: ModalService
  ) {
    this.isLoginModalOpenSubscription =
      this.modalService.isLoginModalOpenChange.subscribe(value => {
        this.isOpen = value;
      });
  }

  onCloseModel() {
    this.modalService.toggleLoginModal();
    console.log('clicked', this.isOpen);
  }

  ngOnInit() {
    this.isOpen = this.modalService.isLoginModalOpen;
  }

  async onSubmit(): Promise<void> {
    try {
      this.loading = true;
      const email = this.signInForm.value.email as string;
      const { error } = await this.supabase.signIn(email);
      if (error) throw error;
      alert('Check your email for the login link!');
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    } finally {
      this.signInForm.reset();
      this.loading = false;
    }
  }

  ngOnDestroy() {
    // Unsubscribe to prevent memory leaks
    this.isLoginModalOpenSubscription.unsubscribe();
  }
}
