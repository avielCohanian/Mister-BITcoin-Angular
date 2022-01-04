import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditComponent } from './cmps/edit/edit.component';
import { AuthGuard } from './guards/auth.guard.guard';

import { ContactDetailsPageComponent } from './pages/contact-details-page/contact-details-page.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { StatisticPageComponent } from './pages/statistic-page/statistic-page.component';

const routes: Routes = [
  // { path: 'contact/edit/:id', component: EditComponent },
  {
    path: 'statistic',
    component: StatisticPageComponent,
    canActivate: [AuthGuard],
  },
  { path: '', component: HomePageComponent, canActivate: [AuthGuard] },
  { path: 'signup', component: SignupPageComponent },

  {
    path: 'contact',
    component: ContactPageComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'edit/:id', component: EditComponent },
      { path: 'edit', component: EditComponent },
    ],
  },
  { path: 'contact/:id', component: ContactDetailsPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
