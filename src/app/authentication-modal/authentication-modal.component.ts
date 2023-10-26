import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SupabaseService } from '../supabase.service';
import { FormBuilder } from '@angular/forms';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-authentication-modal',
  templateUrl: './authentication-modal.component.html',
  styleUrls: ['./authentication-modal.component.css'],
})
export class AuthenticationModalComponent implements OnInit, OnDestroy {
  isActive = false;
  loading = false;
  isOpen = this.modalService.isAuthModalOpen;
  private isAuthModalOpenSubscription: Subscription;

  toggleActive() {
    this.isActive = !this.isActive;
  }

  signInForm = this.formBuilder.group({
    email: '',
  });

  constructor(
    private readonly supabase: SupabaseService,
    private readonly formBuilder: FormBuilder,
    private modalService: ModalService
  ) {
    this.isAuthModalOpenSubscription =
      this.modalService.isAuthModalOpenChange.subscribe(value => {
        this.isOpen = value;
      });
  }

  onCloseModel() {
    this.modalService.toggleLoginModal();
    console.log('clicked', this.isOpen);
  }

  ngOnInit() {
    this.isOpen = this.modalService.isAuthModalOpen;
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
    this.isAuthModalOpenSubscription.unsubscribe();
  }
}
