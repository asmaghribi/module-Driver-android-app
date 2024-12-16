import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/signup',
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },
  {
    path: 'folder/:id',
    loadChildren: () =>
      import('./folder/folder.module').then((m) => m.FolderPageModule),
  },
  {
    path: 'planning-trip',
    loadChildren: () =>
      import('./planning-trip/planning-trip.module').then(
        (m) => m.PlanningTripPageModule
      ),
  },
  {
    path: 'create-planning',
    loadChildren: () =>
      import('./create-planning/create-planning.module').then(
        (m) => m.CreatePlanningPageModule
      ),
  },
  {
    path: 'edit-planning/:id',
    loadChildren: () =>
      import('./edit-planning/edit-planning.module').then(
        (m) => m.EditPlanningPageModule
      ),
  },
  {
    path: 'ticket',
    loadChildren: () => import('./ticket/ticket.module').then( m => m.TicketPageModule)
  },
  {
    path: 'driver',
    loadChildren: () =>
      import('./driver/driver.module').then((m) => m.DriverPageModule),
  },
  {
    path: 'driver-list',
    loadChildren: () =>
      import('./driver-list/driver-list.module').then(
        (m) => m.DriverListPageModule
      ),
  },
  {
    path: 'driver-edit/:id',
    loadChildren: () =>
      import('./driver-edit/driver-edit.module').then(
        (m) => m.DriverEditPageModule
      ),
  },

  /*{
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },*/

  {
    path: 'login',
    loadChildren: () =>
      import('./auth/login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'reset-password',
    loadChildren: () =>
      import('./auth/reset-password/reset-password.module').then(
        (m) => m.ResetPasswordPageModule
      ),
  },
  {
    path: 'create-account',
    loadChildren: () =>
      import('./create-account/create-account.module').then(
        (m) => m.CreateAccountPageModule
      ),
  },
  {
    path: 'signup',
    loadChildren: () =>
      import('./signup/signup.module').then((m) => m.SignupPageModule),
  },
  {
    path: 'consultation',
    loadChildren: () =>
      import('./consultation/consultation.module').then(
        (m) => m.ConsultationPageModule
      ),
  },
  {
    path: 'reserve',
    loadChildren: () =>
      import('./reserve/reserve.module').then((m) => m.ReservePageModule),
  },
  {
    path: 'trip-list',
    loadChildren: () =>
      import('./trip-list/trip-list.module').then((m) => m.TripListPageModule),
  },
  {
    path: 'checkout',
    loadChildren: () =>
      import('./checkout/checkout.module').then((m) => m.CheckoutPageModule),
  },
  {
    path: 'paymentmethod',
    loadChildren: () =>
      import('./paymentmethod/paymentmethod.module').then(
        (m) => m.PaymentmethodPageModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
