import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SupabaseService } from '../services/supabase.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-authentication-modal',
  templateUrl: './authentication-modal.component.html',
  styleUrls: ['./authentication-modal.component.css'],
})
export class AuthenticationModalComponent implements OnInit, OnDestroy {
  isActive = false;
  private isAuthModalOpenSubscription: Subscription;
  isOpen = this.modalService.isAuthModalOpen;

  loading = false;
  registrationForm: FormGroup;
  loginForm: FormGroup;

  toggleActive() {
    this.isActive = !this.isActive;
  }

  constructor(
    private readonly supabase: SupabaseService,
    private readonly formBuilder: FormBuilder,
    private modalService: ModalService
  ) {
    this.isAuthModalOpenSubscription =
      this.modalService.isAuthModalOpenChange.subscribe(value => {
        this.isOpen = value;
      });
    this.registrationForm = this.formBuilder.group({
      email: formBuilder.control('', [
        Validators.required,
        Validators.email,
        Validators.minLength(5),
      ]),
      password: formBuilder.control('', [
        Validators.required,
        Validators.minLength(7),
      ]),
      username: formBuilder.control('', [
        Validators.required,
        Validators.minLength(3),
      ]),
    });
    this.loginForm = this.formBuilder.group({
      email: formBuilder.control('', [
        Validators.required,
        Validators.email,
        Validators.minLength(5),
      ]),
      password: formBuilder.control('', [
        Validators.required,
        Validators.minLength(7),
      ]),
    });
  }

  onCloseModel() {
    this.modalService.toggleLoginModal();
    console.log('clicked', this.isOpen);
  }

  ngOnInit() {
    this.isOpen = this.modalService.isAuthModalOpen;
  }

  ngOnDestroy() {
    // Unsubscribe to prevent memory leaks
    this.isAuthModalOpenSubscription.unsubscribe();
  }
}
