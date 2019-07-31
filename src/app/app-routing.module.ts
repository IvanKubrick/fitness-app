import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { WelcomeComponent } from './welcome/welcome.component';
import { AuthGuard } from './auth/auth.guad';
import { TrainingModule } from './training/training.module';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  {
    path: 'training',
    loadChildren: () => TrainingModule
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), BrowserAnimationsModule],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
