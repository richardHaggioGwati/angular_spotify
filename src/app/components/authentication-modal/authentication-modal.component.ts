import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SupabaseService } from '../../services/supabase.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-authentication-modal',
  templateUrl: './authentication-modal.component.html',
  styleUrls: ['./authentication-modal.component.css'],
})
export class AuthenticationModalComponent implements OnInit, OnDestroy {
  isActive = false;
  private isAuthModalOpenSubscription: Subscription;
  isOpen = this.modalService.isAuthModalOpen;

  //TODO: add loading state
  loading = false;
  registrationForm: FormGroup;
  loginForm: FormGroup;

  toggleActive() {
    this.isActive = !this.isActive;
  }

  constructor(
    private readonly authentication: SupabaseService,
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

  //TODO: consume user name for profile
  onSubmitRegistrationForm() {
    this.authentication
      .signUp(
        this.registrationForm.value.email,
        this.registrationForm.value.password
      )
      .then(res => console.log(res))
      .catch(error => console.log(error));
    this.registrationForm.reset();
    this.onCloseModel();
  }

  onSubmitLoginForm() {
    this.authentication
      .login(this.loginForm.value.email, this.loginForm.value.password)
      .then(res => console.log(res))
      .catch(error => console.log(error));
    this.loginForm.reset();
    this.onCloseModel();
  }

  ngOnInit() {
    this.isOpen = this.modalService.isAuthModalOpen;
  }

  ngOnDestroy() {
    // Unsubscribe to prevent memory leaks
    this.isAuthModalOpenSubscription.unsubscribe();
  }
}
