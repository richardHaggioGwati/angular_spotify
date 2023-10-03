import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BoxComponent } from './sidebar/box/box.component';
import { SidebarItemComponent } from './sidebar/sidebar-item/sidebar-item.component';
import { LibraryComponent } from './sidebar/library/library.component';
import { HeaderComponent } from './header/header.component';
import { ButtonComponent } from './header/button/button.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    BoxComponent,
    SidebarItemComponent,
    LibraryComponent,
    HeaderComponent,
    ButtonComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FontAwesomeModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
