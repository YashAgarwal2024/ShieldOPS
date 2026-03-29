-- ShieldOps MySQL schema

DROP DATABASE IF EXISTS shieldops;
CREATE DATABASE shieldops CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE shieldops;

-- 1. client
CREATE TABLE client (
  client_id INT AUTO_INCREMENT PRIMARY KEY,
  client_name VARCHAR(255) NOT NULL,
  client_type VARCHAR(50) NOT NULL,
  contact VARCHAR(100),
  address VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 2. staff
CREATE TABLE staff (
  staff_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  staff_type VARCHAR(50) NOT NULL,
  experience INT NOT NULL COMMENT 'years of experience',
  base_salary DECIMAL(13,2) NOT NULL,
  status ENUM('active','inactive') NOT NULL DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 3. users
CREATE TABLE users (
  user_id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('admin','client') NOT NULL DEFAULT 'client',
  client_id INT DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_users_client FOREIGN KEY (client_id) REFERENCES client(client_id) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB;

-- 4. contract
CREATE TABLE contract (
  contract_id INT AUTO_INCREMENT PRIMARY KEY,
  client_id INT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  staff_required INT NOT NULL,
  monthly_rate_per_staff DECIMAL(13,2) NOT NULL,
  total_contract_value DECIMAL(15,2) NOT NULL,
  status ENUM('active','expired','terminated') NOT NULL DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_contract_client FOREIGN KEY (client_id) REFERENCES client(client_id) ON DELETE CASCADE ON UPDATE CASCADE,
  CHECK (start_date <= end_date)
) ENGINE=InnoDB;

-- 5. deployment
CREATE TABLE deployment (
  deployment_id INT AUTO_INCREMENT PRIMARY KEY,
  staff_id INT NOT NULL,
  contract_id INT NOT NULL,
  shift VARCHAR(50) NOT NULL,
  duty_start DATETIME NOT NULL,
  duty_end DATETIME NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_deployment_staff FOREIGN KEY (staff_id) REFERENCES staff(staff_id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_deployment_contract FOREIGN KEY (contract_id) REFERENCES contract(contract_id) ON DELETE CASCADE ON UPDATE CASCADE,
  CHECK (duty_start < duty_end)
) ENGINE=InnoDB;

-- 6. attendance
CREATE TABLE attendance (
  attendance_id INT AUTO_INCREMENT PRIMARY KEY,
  staff_id INT NOT NULL,
  contract_id INT NOT NULL,
  month TINYINT UNSIGNED NOT NULL,
  year SMALLINT UNSIGNED NOT NULL,
  present_days TINYINT UNSIGNED NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_attendance_staff FOREIGN KEY (staff_id) REFERENCES staff(staff_id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_attendance_contract FOREIGN KEY (contract_id) REFERENCES contract(contract_id) ON DELETE CASCADE ON UPDATE CASCADE,
  CHECK (month BETWEEN 1 AND 12),
  CHECK (present_days BETWEEN 0 AND 31),
  UNIQUE KEY uq_attendance_staff_contract_month_year (staff_id, contract_id, month, year)
) ENGINE=InnoDB;

-- 7. invoice
CREATE TABLE invoice (
  invoice_id INT AUTO_INCREMENT PRIMARY KEY,
  contract_id INT NOT NULL,
  invoice_month TINYINT UNSIGNED NOT NULL,
  invoice_year SMALLINT UNSIGNED NOT NULL,
  total_amount DECIMAL(15,2) NOT NULL,
  status ENUM('paid','unpaid','partial') NOT NULL DEFAULT 'unpaid',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_invoice_contract FOREIGN KEY (contract_id) REFERENCES contract(contract_id) ON DELETE CASCADE ON UPDATE CASCADE,
  CHECK (invoice_month BETWEEN 1 AND 12),
  UNIQUE KEY uq_invoice_contract_month_year (contract_id, invoice_month, invoice_year)
) ENGINE=InnoDB;

-- 8. payment
CREATE TABLE payment (
  payment_id INT AUTO_INCREMENT PRIMARY KEY,
  invoice_id INT NOT NULL,
  amount_paid DECIMAL(15,2) NOT NULL,
  payment_date DATE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_payment_invoice FOREIGN KEY (invoice_id) REFERENCES invoice(invoice_id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;
