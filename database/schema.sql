CREATE DATABASE IF NOT EXISTS shieldops;
USE shieldops;

CREATE TABLE client (
  client_id INT AUTO_INCREMENT PRIMARY KEY,
  client_name VARCHAR(255) NOT NULL,
  client_type VARCHAR(100),
  contact VARCHAR(255),
  address TEXT
);

CREATE TABLE users (
  user_id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(50),
  client_id INT,
  FOREIGN KEY (client_id) REFERENCES client(client_id)
);

CREATE TABLE staff (
  staff_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  staff_type VARCHAR(100),
  experience INT,
  base_salary DECIMAL(10,2),
  status VARCHAR(50)
);

CREATE TABLE contract (
  contract_id INT AUTO_INCREMENT PRIMARY KEY,
  client_id INT NOT NULL,
  start_date DATE,
  end_date DATE,
  staff_required INT,
  monthly_rate_per_staff DECIMAL(10,2),
  total_contract_value DECIMAL(15,2),
  status VARCHAR(50),
  FOREIGN KEY (client_id) REFERENCES client(client_id)
);

CREATE TABLE deployment (
  deployment_id INT AUTO_INCREMENT PRIMARY KEY,
  staff_id INT NOT NULL,
  contract_id INT NOT NULL,
  shift VARCHAR(50),
  duty_start TIME,
  duty_end TIME,
  FOREIGN KEY (staff_id) REFERENCES staff(staff_id),
  FOREIGN KEY (contract_id) REFERENCES contract(contract_id)
);

CREATE TABLE attendance (
  attendance_id INT AUTO_INCREMENT PRIMARY KEY,
  staff_id INT NOT NULL,
  contract_id INT NOT NULL,
  month INT NOT NULL,
  year INT NOT NULL,
  present_days INT,
  FOREIGN KEY (staff_id) REFERENCES staff(staff_id),
  FOREIGN KEY (contract_id) REFERENCES contract(contract_id)
);

CREATE TABLE invoice (
  invoice_id INT AUTO_INCREMENT PRIMARY KEY,
  contract_id INT NOT NULL,
  invoice_month DATE,
  total_amount DECIMAL(15,2),
  status VARCHAR(50),
  FOREIGN KEY (contract_id) REFERENCES contract(contract_id)
);

CREATE TABLE payment (
  payment_id INT AUTO_INCREMENT PRIMARY KEY,
  invoice_id INT NOT NULL,
  amount_paid DECIMAL(15,2),
  payment_date DATE,
  FOREIGN KEY (invoice_id) REFERENCES invoice(invoice_id)
);