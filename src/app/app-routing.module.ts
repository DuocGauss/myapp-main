import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { MechanicGuard } from './mechanic.guard';
import { SignUpPage } from './pages/auth/sign-up/sign-up.page';
import { RevisionPage } from './pages/auth/revision/revision.page';

const routes: Routes = [
 
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.module').then( m => m.AuthPageModule)
  },
  {
    path: 'signup',
    component: SignUpPage,
    canActivate: [MechanicGuard], // Agrega el guard aquí
  },
  {
    path: 'revision/:autoId',
    component: RevisionPage
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
