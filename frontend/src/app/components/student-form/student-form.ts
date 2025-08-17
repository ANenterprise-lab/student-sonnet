import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { StudentService, Student } from '../../services/student';

@Component({
  selector: 'app-student-form',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './student-form.html',
  styleUrl: './student-form.scss'
})
export class StudentForm implements OnInit {
  studentForm: FormGroup;
  isEditing = false;
  isLoading = false;
  errorMessage = '';
  studentId: number | null = null;

  majors = [
    'Computer Science',
    'Engineering',
    'Mathematics',
    'Physics',
    'Chemistry',
    'Biology',
    'Business Administration',
    'Economics',
    'Psychology',
    'Literature',
    'History',
    'Art',
    'Music'
  ];

  years = ['Freshman', 'Sophomore', 'Junior', 'Senior', 'Graduate'];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private studentService: StudentService
  ) {
    this.studentForm = this.fb.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      date_of_birth: ['', [Validators.required]],
      student_id: ['', [Validators.required]],
      major: ['', [Validators.required]],
      year: ['', [Validators.required]],
      gpa: ['', [Validators.min(0), Validators.max(4)]]
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id && id !== 'new') {
      this.isEditing = true;
      this.studentId = parseInt(id);
      this.loadStudent(this.studentId);
    }
  }

  loadStudent(id: number) {
    this.isLoading = true;
    this.studentService.getStudent(id).subscribe({
      next: (student) => {
        this.studentForm.patchValue({
          ...student,
          date_of_birth: student.date_of_birth.split('T')[0] // Format for HTML date input
        });
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load student data';
        this.isLoading = false;
        console.error('Error loading student:', error);
      }
    });
  }

  onSubmit() {
    if (this.studentForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      const studentData = this.studentForm.value;
      
      if (this.isEditing && this.studentId) {
        this.studentService.updateStudent(this.studentId, studentData).subscribe({
          next: (student) => {
            this.isLoading = false;
            this.router.navigate(['/students', student.id]);
          },
          error: (error) => {
            this.isLoading = false;
            this.errorMessage = 'Failed to update student';
            console.error('Error updating student:', error);
          }
        });
      } else {
        this.studentService.createStudent(studentData).subscribe({
          next: (student) => {
            this.isLoading = false;
            this.router.navigate(['/students', student.id]);
          },
          error: (error) => {
            this.isLoading = false;
            this.errorMessage = 'Failed to create student';
            console.error('Error creating student:', error);
          }
        });
      }
    }
  }

  // Form getters for easy access in template
  get first_name() { return this.studentForm.get('first_name'); }
  get last_name() { return this.studentForm.get('last_name'); }
  get email() { return this.studentForm.get('email'); }
  get date_of_birth() { return this.studentForm.get('date_of_birth'); }
  get student_id() { return this.studentForm.get('student_id'); }
  get major() { return this.studentForm.get('major'); }
  get year() { return this.studentForm.get('year'); }
  get gpa() { return this.studentForm.get('gpa'); }
}
