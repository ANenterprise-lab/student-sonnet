import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth';
import { StudentService, Student } from '../../services/student';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard implements OnInit {
  user: any = null;
  studentsCount = 0;
  recentStudents: Student[] = [];
  isLoading = true;

  constructor(
    private authService: AuthService,
    private studentService: StudentService
  ) {}

  ngOnInit() {
    this.user = this.authService.getCurrentUser();
    this.loadDashboardData();
  }

  loadDashboardData() {
    this.studentService.getStudents().subscribe({
      next: (students) => {
        this.studentsCount = students.length;
        this.recentStudents = students.slice(0, 5); // Show last 5 students
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading dashboard data:', error);
        this.isLoading = false;
      }
    });
  }

  logout() {
    this.authService.logout();
  }
}
