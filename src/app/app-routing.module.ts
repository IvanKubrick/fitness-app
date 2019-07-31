import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from '../app/material.module';
import { WelcomeComponent } from './welcome/welcome.component';
import { TrainingComponent } from './training/training.component';
import { AuthGuard } from './auth/auth.guad';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'training', component: TrainingComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MaterialModule
  ],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
