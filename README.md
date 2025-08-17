# Student Management System

A modern student management application built with Angular frontend and Django backend. This repository contains the Angular frontend application that provides a responsive web interface for managing student records with JWT authentication.

## Features

### 🔐 Authentication
- User registration and login
- JWT token-based authentication
- Secure token storage
- Authentication guards for protected routes

### 👨‍🎓 Student Management
- Dashboard with overview statistics
- Complete student listing with search and filters
- Detailed student profiles
- Create, edit, and delete student records
- Student information includes:
  - Personal details (name, email, date of birth)
  - Academic information (major, year, GPA)
  - Student ID management

### 🎨 Modern UI/UX
- Responsive design that works on all devices
- Clean, modern interface with gradient backgrounds
- Form validation with real-time feedback
- Loading states and error handling
- Accessible components following best practices

## Technology Stack

- **Frontend Framework**: Angular 20+
- **Language**: TypeScript
- **Styling**: SCSS with custom responsive design
- **HTTP Client**: Angular HttpClient
- **Authentication**: JWT tokens with @auth0/angular-jwt
- **Build Tool**: Angular CLI with Vite
- **Package Manager**: npm

## Prerequisites

Before running the application, ensure you have:

- Node.js (v18 or higher)
- npm (v8 or higher)
- Angular CLI (`npm install -g @angular/cli`)

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ANenterprise-lab/student-sonnet.git
   cd student-sonnet
   ```

2. **Navigate to the frontend directory**
   ```bash
   cd frontend
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Configure environment**
   
   The application comes with pre-configured environment files:
   - `src/environments/environment.ts` - Development configuration
   - `src/environments/environment.prod.ts` - Production configuration
   
   Update the API URL in these files to match your Django backend:
   ```typescript
   export const environment = {
     production: false,
     apiUrl: 'http://localhost:8000/api'  // Update this URL
   };
   ```

## Development

### Start the development server
```bash
npm start
# or
ng serve
```

The application will be available at `http://localhost:4200`

### Build for production
```bash
npm run build
# or
ng build --configuration production
```

### Run tests
```bash
npm test
# or
ng test
```

### Run linting
```bash
npm run lint
# or
ng lint
```

## Project Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── components/          # UI Components
│   │   │   ├── login/           # Login component
│   │   │   ├── register/        # Registration component
│   │   │   ├── dashboard/       # Dashboard component
│   │   │   ├── student-list/    # Student listing component
│   │   │   ├── student-detail/  # Student detail view
│   │   │   └── student-form/    # Student create/edit form
│   │   ├── services/            # Business Logic Services
│   │   │   ├── auth.ts          # Authentication service
│   │   │   ├── token-storage.ts # Token management service
│   │   │   └── student.ts       # Student data service
│   │   ├── guards/              # Route Guards
│   │   │   └── auth-guard.ts    # Authentication guard
│   │   ├── app.routes.ts        # Application routing
│   │   └── app.config.ts        # Application configuration
│   ├── environments/            # Environment configurations
│   └── styles.scss             # Global styles
├── angular.json                 # Angular CLI configuration
├── package.json                # Dependencies and scripts
└── README.md                   # This file
```

## API Integration

The frontend is designed to work with a Django backend API with the following endpoints:

### Authentication Endpoints
- `POST /api/auth/login/` - User login
- `POST /api/auth/register/` - User registration

### Student Management Endpoints
- `GET /api/students/` - List all students
- `POST /api/students/` - Create new student
- `GET /api/students/:id/` - Get student details
- `PATCH /api/students/:id/` - Update student
- `DELETE /api/students/:id/` - Delete student

## Backend Compatibility

This frontend is compatible with Django backends that have:
- JWT authentication configured
- CORS enabled for `localhost:4200`
- REST API endpoints for student management
- User registration and authentication endpoints

## Screenshots

### Login Page
![Login Page](https://github.com/user-attachments/assets/cfc31221-f068-47f7-90ae-f70494a8529c)

### Registration Page
![Registration Page](https://github.com/user-attachments/assets/e637f682-2ea0-4cf7-9d86-2dc2a9a67a10)

## Environment Configuration

### Development
```typescript
// src/environments/environment.ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8000/api'
};
```

### Production
```typescript
// src/environments/environment.prod.ts
export const environment = {
  production: true,
  apiUrl: 'https://your-production-api.com/api'
};
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

If you encounter any issues or have questions, please open an issue on GitHub.

---

Built with ❤️ using Angular and modern web technologies.