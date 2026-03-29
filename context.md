PROJECT NAME:
ShieldOps – Workforce Operations Management System

PROJECT TYPE:
College DBMS + Web Application

CORE IDEA:
A centralized digital platform to manage operations of small security and domestic workforce agencies.

PROBLEM STATEMENT:
Small agencies manage staff, contracts, deployment, attendance, and payments using manual methods (registers, Excel, WhatsApp), leading to:
• Deployment conflicts
• Salary miscalculations
• Contract mismanagement
• Payment tracking issues

TARGET USERS:
• Admin (Agency Owner)
• Client (Schools, malls, banks, etc.)

SYSTEM OBJECTIVE:
To digitize workforce operations and provide structured, error-free management.

---

SYSTEM FEATURES (FINALIZED SCOPE):

1. Client Management
• Store client details (name, type, contact, address)

2. Staff Management
• Store staff info (role, salary, experience, status)

3. Contract Management
• Create contracts with duration, staff requirement, and rate

4. Deployment Management
• Assign staff to contracts
• Prevent double deployment (same time conflict)

5. Attendance Management
• Track monthly present days
• Used for salary calculation

6. Invoice System
• Monthly billing based on contract
• amount = staff_required × monthly_rate_per_staff

7. Payment Tracking
• Track full/partial payments
• Maintain payment history

8. User Authentication
• Role-Based Access Control (Admin / Client)

---

DATABASE TABLES:

• users (user_id, email, password, role, client_id)
• client (client_id, client_name, client_type, contact, address)
• staff (staff_id, name, staff_type, experience, base_salary, status)
• contract (contract_id, client_id, start_date, end_date, staff_required, monthly_rate_per_staff, total_contract_value, status)
• deployment (deployment_id, staff_id, contract_id, shift, duty_start, duty_end)
• attendance (attendance_id, staff_id, contract_id, month, year, present_days)
• invoice (invoice_id, contract_id, invoice_month, total_amount, status)
• payment (payment_id, invoice_id, amount_paid, payment_date)

---

BUSINESS LOGIC:

• Prevent overlapping deployment of same staff
• Salary = (base_salary / 30) × present_days
• Invoice = staff_required × monthly_rate_per_staff
• Payment can be partial

---

TECH STACK:

Frontend:
• HTML, CSS, JavaScript

Backend:
• Python Flask

Database:
• MySQL

Tools:
• MySQL Workbench, VS Code

---

SYSTEM ARCHITECTURE:

Frontend → Backend (Flask) → MySQL Database

---

EXCLUDED FEATURES:

• GPS tracking
• Biometric attendance
• AI/ML features
• Multi-branch system
• Payroll tax system

---

PROJECT STATUS:

• PPT ready
• ER Diagram complete
• SQL schema created
• Sample data inserted
• Queries prepared
• Backend not fully implemented yet

---

GOAL FOR AI:

Assist in:
• Backend development
• Query optimization
• Feature enhancement
• Debugging
• UI integration