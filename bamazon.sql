-- Drops the bamazon_db if it already exists --
DROP DATABASE IF EXISTS bamazon_db;
-- Create a database called bamazon_db --
CREATE DATABASE bamazon_db;

-- Use bamazon_db for the following statements --
USE bamazon_db;

CREATE TABLE products(
  -- Create a numeric column called "item_id" which will automatically increment its default value as we create new rows. --
item_id INTEGER NOT NULL AUTO_INCREMENT,
  -- Create a string column called "product_name" --
product_name VARCHAR(100) NOT NULL,
  -- Create a string column called "department_name" --
department_name VARCHAR(100) NOT NULL,
  -- Create a decimal column called "price" --
price DECIMAL(10,2) NOT NULL,
-- Create an integer column called "stock" --
stock_quantity INTEGER(11) NOT NULL,
product_sales INTEGER(11) default 0,
  PRIMARY KEY (item_id)
);

-- Insert the value in to the table
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Listerine Total Care", "Personal Care", 6.57, 150),
("Kittles Cat Treats", "Pet Supplies", 2.37, 245),
("Pots & Pans", "Kitchen", 39.99, 20),
("Hanging Planter", "Garden & Outdoor", 15.07, 15),
("PlayStation 4", "Video Games", 49.94, 5),
("Dove Powder", "Cosmetics", 9.46, 50),
("Sweater", "Clothing", 90, 3),
("Granny Smith Apples", "Produce", 0.35, 800),
("Brawny Paper Towels", "Grocery", 4.25, 400),
("Ibuprophen", "Pharmacy", 4.95, 389);

SELECT * FROM products;

CREATE TABLE departments(
    -- Create a numeric column called "department_id" which will automatically increment its default value as we create new rows. --
department_id INTEGER NOT NULL AUTO_INCREMENT,
  -- Create a string column called "department_name" --
department_name VARCHAR(100) NOT NULL,
-- Create a decimal column called "over-head-cost" --
over_head_costs DECIMAL(10,2) NOT NULL,
PRIMARY KEY (department_id)
);

-- Insert the value in to the table
INSERT INTO departments (department_name, over_head_costs)
VALUES ("Personal Care",  150.00),
("Kitchen", 200.00),
("Clothing", 500.00),
("Cosmetics", 300.00),
("Garden & Outdoor", 200.00),
("Produce", 350.00),
("Pharmacy", 120.00),
("Video Games", 500.00),
("Grocery", 400.00),
("Pet Supplies",110.00);
