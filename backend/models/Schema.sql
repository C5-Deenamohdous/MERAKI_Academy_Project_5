-- DROP DATABASE Store_P5 ; 
CREATE DATABASE Store_P5 ; 

USE Store_P5;

CREATE TABLE roles (
    id INT AUTO_INCREMENT NOT NULL,
    role VARCHAR(255) NOT NULL,
    PRIMARY KEY (id),
 is_deleted TINYINT DEFAULT 0 

);

CREATE TABLE users(
    id INT AUTO_INCREMENT NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255),
    firstName VARCHAR(255) NOT NULL , 
    lastName VARCHAR(255) NOT NULL , 
    phoneNumber VARCHAR(255) NOT NULL , 
    profileImage VARCHAR(255) NOT NULL , 
    role_id INT,
    FOREIGN KEY (role_id) REFERENCES roles(id),
    is_deleted TINYINT DEFAULT 0,
    PRIMARY KEY (id)
);

CREATE TABLE permissions (
    id INT AUTO_INCREMENT NOT NULL,
    permission VARCHAR(255) NOT NULL,
    PRIMARY KEY (id),
    is_deleted TINYINT DEFAULT 0 
);

CREATE TABLE role_permission (
    id INT NOT NULL AUTO_INCREMENT NOT NULL,
    role_id INT,
    permission_id INT,
    FOREIGN KEY (role_id) REFERENCES roles (id),
    FOREIGN KEY (permission_id) REFERENCES permissions (id),
    PRIMARY KEY (id),
    is_deleted TINYINT DEFAULT 0 
);

-- category
CREATE TABLE categories (
    id INT AUTO_INCREMENT NOT NULL,
    categoryName VARCHAR(255),
    PRIMARY KEY(id),
    is_deleted TINYINT DEFAULT 0 
);

CREATE TABLE brands (
    id INT AUTO_INCREMENT NOT NULL,
    brandName VARCHAR(255),
    category_id INT , 
    FOREIGN KEY (category_id) REFERENCES categories(id),
    PRIMARY KEY(id),
    is_deleted TINYINT DEFAULT 0 
);

CREATE TABLE products(
    id INT AUTO_INCREMENT NOT NULL,
    title VARCHAR(255),
    description VARCHAR(255),
    productImage VARCHAR(255),
    price VARCHAR(255),
    quantity VARCHAR(255),
    category_id INT , 
    -- company ,, id < ()
    FOREIGN KEY (category_id) REFERENCES categories(id),
    brand_id INT,
    FOREIGN KEY (brand_id) REFERENCES brands(id),
    is_deleted TINYINT DEFAULT 0,
    PRIMARY KEY (id)
);



CREATE TABLE comments(
    id INT AUTO_INCREMENT NOT NULL,
    comment VARCHAR(255),
    product_id INT,
    FOREIGN KEY (product_id) REFERENCES products(id),
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id),
    is_deleted TINYINT DEFAULT 0,
    PRIMARY KEY (id)
);


CREATE TABLE rate(
    id INT AUTO_INCREMENT NOT NULL , 
    user_id INT , 
    product_id INT , 
    value VARCHAR(255) , 
    FOREIGN KEY (user_id) REFERENCES users(id) ,
    FOREIGN KEY (product_id) REFERENCES products(id) ,
    PRIMARY KEY (id),
    is_deleted TINYINT DEFAULT 0 
);

CREATE TABLE cart(
    id INT AUTO_INCREMENT NOT NULL , 
    user_id INT , 
    product_id INT , 
     FOREIGN KEY (user_id) REFERENCES users(id) ,
    FOREIGN KEY (product_id) REFERENCES products(id) ,
    PRIMARY KEY (id),
    is_deleted TINYINT DEFAULT 0 
);

