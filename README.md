---

# Employee Management System (EMS)

## Overview
This is a **full-stack web application** designed to manage employees, HR, and admin roles. It includes features like user authentication, role-based dashboards, task management, payment history, and payroll management. The project is built using **React** for the frontend, **Firebase** for authentication and database, and integrates a **payment gateway** for salary disbursement.

---

## Features

### 🏠 Home Page
- **Banner/Slider**: Displays company success or relevant information.
- **Services**: Highlights services provided by the company.
- **Testimonials**: Slider showcasing client feedback.
- **Additional Sections**: Two custom sections relevant to the company.

### 👥 Authentication
- **Email/Password Login & Registration**:
  - Password validation (6+ characters, capital letter, special character).
  - Role selection during registration (Employee or HR).
- **Social Login**: Google/Github login (defaults to Employee role).
- **User Roles**:
  - **Employee**: Can submit work logs and view payment history.
  - **HR**: Can verify employees, view work progress, and request payments.
  - **Admin**: Can manage employees, adjust salaries, and approve payments.

### 📊 Dashboards
#### **Employee Dashboard**
- **Work Sheet**:
  - Submit daily tasks (Sales, Support, Content, etc.).
  - Edit/Delete tasks dynamically.
- **Payment History**:
  - View monthly salary payments with pagination/infinite scroll.

#### **HR Dashboard**
- **Employee List**:
  - Verify employees and request payments.
  - View employee details with salary vs. month/year bar chart.
- **Progress Tracking**:
  - Filter work logs by employee and month.

#### **Admin Dashboard**
- **All Employee List**:
  - Promote employees to HR or fire them.
  - Adjust salaries (only increase allowed).
- **Payroll**:
  - Approve HR payment requests using a payment gateway.
  - Prevent duplicate payments for the same month/year.

### ✉ Contact Us
- Visitors can submit feedback via a contact form.
- Admin can view submitted messages.

---

## Challenges Implemented
- **🟨 Payment Gateway**: Integrated for salary disbursement.
- **🟨 Duplicate Payment Prevention**: Ensures no double payments for the same month/year.
- **🟦 Salary Adjustment**: Only allows salary increases, not decreases.
- **🟦 View Toggle**: Switch between table and card grid views.

---

## Technologies Used
- **Frontend**: React, React Router, React DatePicker, Chart.js (for bar charts).
- **Backend**: Firebase (Authentication, Firestore Database).
- **Payment Gateway**: Stripe or any other preferred gateway.
- **Image Upload**: ImgBB for user profile pictures.

---

## Admin Credentials
- **Email**: `adib.abc2022@gmail.com`
- **Password**: `Adib123$`

---

## How to Run
1. Clone the repository.
2. Install dependencies: `npm install`.
3. Set up Firebase:
   - Create a Firebase project.
   - Add Firebase config in `src/firebase.js`.
   - Enable Email/Password and Google/Github authentication.
   - Set up Firestore database.
4. Run the app: `npm start`.

---

## Future Improvements
- Email verification and password reset functionality.
- Enhanced UI/UX with animations and transitions.
- Additional social login options (Facebook, LinkedIn).

---
