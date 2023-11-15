import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgOptimizedImage } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { BoxComponent } from './components/sidebar/box/box.component';
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LibraryComponent } from './components/sidebar/library/library.component';
import { HeaderComponent } from './components/header/header.component';
import { ButtonComponent } from './components/header/button/button.component';
import { ListItemComponent } from './components/header/list-item/list-item.component';
import { ModalService } from './services/modal.service';
import { AuthenticationModalComponent } from './components/authentication-modal/authentication-modal.component';
import { UploadSongModalComponent } from './components/upload-song-modal/upload-song-modal.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { AlertComponent } from './components/alert/alert.component';
import { PageContentComponent } from './pages/page-content/page-content.component';
import { MediaItemComponent } from './components/sidebar/library/media-item/media-item.component';
import { LikeButtonComponent } from './components/sidebar/library/like-button/like-button.component';
import { SongItemComponent } from './pages/page-content/song-item/song-item.component';
import { PlayButtonComponent } from './components/play-button/play-button.component';
import { SearchComponent } from './pages/search/search.component';
import { SearchInputComponent } from './pages/search/search-input/search-input.component';
import { LikedComponent } from './pages/liked/liked.component';
import { LikedContentComponent } from './components/liked-content/liked-content.component';
import { PlayerComponent } from './components/player/player.component';
import { PlayerContextComponent } from './components/player/player-context/player-context.component';

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
    SongItemComponent,
    PlayButtonComponent,
    SearchInputComponent,
    LikedComponent,
    LikedContentComponent,
    PlayerComponent,
    PlayerContextComponent,
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
