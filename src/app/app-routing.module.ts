import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { WelcomeComponent } from './welcome/welcome.component';
import { AuthGuard } from './auth/auth.guard';
import { TrainingModule } from './training/training.module';

const routes: Routes = [
  { path: 'welcome', component: WelcomeComponent },
  {
    path: 'training',
    loadChildren: () => TrainingModule,
    canLoad: [AuthGuard]
  },
  { path: '', redirectTo: '/welcome', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), BrowserAnimationsModule],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
