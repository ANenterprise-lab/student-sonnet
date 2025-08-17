import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { StudentService, Student } from '../../services/student';

@Component({
  selector: 'app-student-detail',
  imports: [CommonModule, RouterModule],
  templateUrl: './student-detail.html',
  styleUrl: './student-detail.scss'
})
export class StudentDetail implements OnInit {
  student: Student | null = null;
  isLoading = true;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private studentService: StudentService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadStudent(parseInt(id));
    }
  }

  loadStudent(id: number) {
    this.studentService.getStudent(id).subscribe({
      next: (student) => {
        this.student = student;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load student details';
        this.isLoading = false;
        console.error('Error loading student:', error);
      }
    });
  }

  deleteStudent() {
    if (this.student && confirm('Are you sure you want to delete this student?')) {
      this.studentService.deleteStudent(this.student.id!).subscribe({
        next: () => {
          this.router.navigate(['/students']);
        },
        error: (error) => {
          console.error('Error deleting student:', error);
          alert('Failed to delete student');
        }
      });
    }
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString();
  }
}
