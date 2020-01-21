import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OffresPage } from './offres.page';

const routes: Routes = [
  {
    path: '',
    component: OffresPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OffresPageRoutingModule {}
