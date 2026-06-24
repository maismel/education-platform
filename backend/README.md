# Education Platform Backend

Backend API for the Learning Management System (LMS), built with NestJS, PostgreSQL, Prisma ORM, and JWT authentication.

## Features

- JWT Authentication (Access + Refresh Tokens)
- Role-based authorization (Admin, Teacher, Student)
- User management
- Course management
- Lesson management
- Course enrollment
- Attendance tracking
- Assignment submissions
- Grading system
- File uploads
- Profile management
- Soft delete for users

---

## Tech Stack

- NestJS
- TypeScript
- PostgreSQL
- Prisma ORM
- JWT Authentication
- bcrypt
- Multer
- Class Validator

---

## Requirements

Before starting, make sure you have installed:

- Node.js 18+
- PostgreSQL 14+
- npm or yarn

---

## Installation

Clone the repository:

```bash
git clone <repository-url>
cd backend
```

Install dependencies:

```bash
npm install
```

or

```bash
yarn install
```

---
## Installation

Install dependencies:

```bash
npm install
```

---

## Running PostgreSQL with Docker

Start PostgreSQL:

```bash
docker compose up -d
```

Verify that the container is running:

```bash
docker ps
```

---

## Environment Variables

Create a `.env` file in the project root:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5434/lms?schema=public"

JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret

JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

PORT=3001
```

---

## Database Setup

Generate Prisma Client:

```bash
npx prisma generate
```

Apply migrations:

```bash
npx prisma migrate dev
```

If you want to reset the database:

```bash
npx prisma migrate reset
```

⚠️ This command removes all data.

---

## Running the Application

Start development server:

```bash
npm run start:dev
```

Application will be available at:

```text
http://localhost:3001
```

## Production Build

Build the application:

```bash
npm run build
```

Start production server:

```bash
npm run start:prod
```

---

## Prisma Commands

Generate Prisma Client:

```bash
npx prisma generate
```

Create migration:

```bash
npx prisma migrate dev --name migration_name
```

Reset database:

```bash
npx prisma migrate reset
```

Open Prisma Studio:

```bash
npx prisma studio
```

---

## Project Structure

```text
src/
│
├── modules/
│   ├── auth/
│   ├── users/
│   ├── courses/
│   ├── lessons/
│   ├── enrollments/
│   ├── attendance/
│   ├── materials/
│   ├── submissions/
│   └── grades/
│
├── prisma/
│   ├── prisma.module.ts
│   └── prisma.service.ts
│
├── common/
│
├── main.ts
└── app.module.ts

prisma/
│
└── schema.prisma
```

---

## User Roles

### Admin

- Create teachers
- View all users
- Deactivate users
- Create courses for any teacher
- View all courses

### Teacher

- Manage courses
- Create lessons
- Upload course materials
- View enrolled students
- Review submissions
- Grade assignments
- Track attendance

### Student

- Enroll in courses
- View lessons and materials
- Submit assignments
- View grades
- Track attendance

---

## Authentication

Authentication uses:

- JWT Access Token
- JWT Refresh Token
- HTTP-only Cookies

Protected routes are secured with:

- JwtAuthGuard
- RolesGuard

Role restrictions are implemented using:

```ts
@Roles(Role.ADMIN)
@Roles(Role.TEACHER)
@Roles(Role.STUDENT)
```

---

## File Uploads

Supported uploads:

### User Avatars

Stored in:

```text
/uploads/avatars
```

### Assignment Submissions

Supported format:

```text
PDF
```

Stored in:

```text
/uploads
```

Maximum file size:

```text
10 MB
```

---

## Database

Main entities:

- User
- Course
- Lesson
- Enrollment
- Attendance
- Material
- Submission
- Grade

Relationships are managed through Prisma ORM.

---

## API Documentation

Example base URL:

```text
http://localhost:3001
```

Authentication endpoints:

```text
POST /auth/register
POST /auth/login
POST /auth/logout
POST /auth/refresh
GET  /auth/me
```

Course endpoints:

```text
GET    /courses
POST   /courses
PATCH  /courses/:id
DELETE /courses/:id
```

Lesson endpoints:

```text
GET    /lessons
POST   /lessons
PATCH  /lessons/:id
DELETE /lessons/:id
```

Additional endpoints are available for enrollments, attendance, materials, submissions, grades, and users.

---

## License

This project was created for educational purposes.
