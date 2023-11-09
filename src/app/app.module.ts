import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { BoxComponent } from './sidebar/box/box.component';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LibraryComponent } from './sidebar/library/library.component';
import { HeaderComponent } from './header/header.component';
import { ButtonComponent } from './header/button/button.component';
import { ListItemComponent } from './header/list-item/list-item.component';
import { NgOptimizedImage } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalService } from './services/modal.service';
import { AuthenticationModalComponent } from './authentication-modal/authentication-modal.component';
import { SearchComponent } from './tmp/search/search.component';
import { UploadSongModalComponent } from './upload-song-modal/upload-song-modal.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { AlertComponent } from './alert/alert.component';
import { PageContentComponent } from './page-content/page-content.component';
import { MediaItemComponent } from './page-content/media-item/media-item.component';
import { LikeButtonComponent } from './page-content/like-button/like-button.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    LibraryComponent,
    HeaderComponent,
    ButtonComponent,
    ListItemComponent,
    AuthenticationModalComponent,
    BoxComponent,
    SearchComponent,
    UploadSongModalComponent,
    LoadingSpinnerComponent,
    AlertComponent,
    PageContentComponent,
    MediaItemComponent,
    LikeButtonComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgOptimizedImage,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [ModalService],
  bootstrap: [AppComponent],
})
export class AppModule {}
