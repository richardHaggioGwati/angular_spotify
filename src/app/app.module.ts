import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BoxComponent } from './sidebar/box/box.component';
import { LibraryComponent } from './sidebar/library/library.component';
import { HeaderComponent } from './header/header.component';
import { ButtonComponent } from './header/button/button.component';
import { ListItemComponent } from './header/list-item/list-item.component';
import { NgOptimizedImage } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { ModalService } from './services/modal.service';
import { AuthenticationModalComponent } from './authentication-modal/authentication-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    BoxComponent,
    LibraryComponent,
    HeaderComponent,
    ButtonComponent,
    ListItemComponent,
    AuthenticationModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    NgOptimizedImage,
    BrowserAnimationsModule,
    MatDialogModule,
    FormsModule,
  ],
  providers: [ModalService],
  bootstrap: [AppComponent],
})
export class AppModule {}
