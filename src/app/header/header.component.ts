import { Component, OnInit } from '@angular/core';
import { ModalService } from '../services/modal.service';
import { SupabaseService } from '../services/supabase.service';
import { AuthSession } from '@supabase/supabase-js';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  session: AuthSession | null;

  constructor(
    private modalService: ModalService,
    private supabaseService: SupabaseService
  ) {}

  openAuthModal() {
    this.modalService.toggleLoginModal();
  }

  handleLogout() {
    this.supabaseService.signOut();
  }

  ngOnInit() {
    this.supabaseService.authChanges((_, session) => (this.session = session));
  }
}
