# Education Platform Frontend

Frontend application for the Learning Management System (LMS), built with Next.js, React, TypeScript, Tailwind CSS, React Query, and React Hook Form.

## Features

- Authentication with JWT (access + refresh tokens)
- Role-based access control (Admin, Teacher, Student)
- Course management
- Lesson management
- Course enrollment
- Attendance tracking
- Assignment submissions
- Grading system
- User profile management
- File uploads
- Responsive UI

---

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- React Query
- React Hook Form
- Zod
- Axios
- shadcn/ui

---

## Requirements

Before starting, make sure you have installed:

- Node.js 18+
- npm or yarn
- Running backend server

---

## Installation

Clone the repository:

```bash
git clone <repository-url>
cd frontend
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

## Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

Adjust the URL if your backend runs on a different host or port.

---

## Running the Application

Development mode:

```bash
npm run dev
```

or

```bash
yarn dev
```

Application will be available at:

```text
http://localhost:3000
```

---

## Build for Production

```bash
npm run build
```

Start production server:

```bash
npm run start
```

---

## Project Structure

```text
src/
│
├── app/                 # Next.js App Router pages
├── api/                 # Axios configuration
├── components/          # Shared UI components
├── features/            # Feature-based modules
│   ├── auth/
│   ├── attendance/
│   ├── courses/
│   ├── enrollments/
│   ├── grades/
│   ├── lessons/
│   ├── materials/
│   ├── submissions/
│   └── users/
│
├── hooks/
├── lib/
├── providers/
├── shared/
│   ├── components/
│   ├── types/
│   └── utils/
```

---

## User Roles

### Admin

- View all users
- Create teachers
- Create courses for any teacher
- Manage platform users
- View all courses

### Teacher

- Create and manage courses
- Create lessons
- Upload learning materials
- View student submissions
- Grade assignments

### Student

- Enroll in courses
- Access lessons and materials
- Submit assignments
- View grades

---

## Authentication

Authentication is handled using:

- Access Token
- Refresh Token
- HTTP-only cookies

Axios automatically attempts to refresh expired access tokens using the refresh endpoint.

---

## Available Scripts

```bash
npm run dev
```

Runs the development server.

```bash
npm run build
```

Creates a production build.

```bash
npm run start
```

Starts the production server.

```bash
npm run lint
```

Runs ESLint.

---

## Backend

This application requires the LMS backend API to be running.

Default backend URL:

```text
http://localhost:3001
```

Make sure the backend server is started before launching the frontend.

---

## License

This project is intended for educational purposes.
