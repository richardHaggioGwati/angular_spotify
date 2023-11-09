import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './tmp/search/search.component';
import { PageContentComponent } from './page-content/page-content.component';

const routes: Routes = [
  { path: '', component: PageContentComponent },
  { path: 'search', component: SearchComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
