import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { Dashboard } from './components/dashboard/dashboard';
import { StudentList } from './components/student-list/student-list';
import { StudentDetail } from './components/student-detail/student-detail';
import { StudentForm } from './components/student-form/student-form';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { 
    path: 'dashboard', 
    component: Dashboard,
    canActivate: [authGuard]
  },
  { 
    path: 'students', 
    component: StudentList,
    canActivate: [authGuard]
  },
  { 
    path: 'students/new', 
    component: StudentForm,
    canActivate: [authGuard]
  },
  { 
    path: 'students/:id', 
    component: StudentDetail,
    canActivate: [authGuard]
  },
  { 
    path: 'students/:id/edit', 
    component: StudentForm,
    canActivate: [authGuard]
  },
  { path: '**', redirectTo: '/dashboard' }
];
