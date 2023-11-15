import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageContentComponent } from './pages/page-content/page-content.component';
import { SearchComponent } from './pages/search/search.component';
import { LikedComponent } from './pages/liked/liked.component';

const routes: Routes = [
  { path: '', component: PageContentComponent },
  { path: 'search', component: SearchComponent },
  { path: 'liked', component: LikedComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
