

# E-Commerce Web Application

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Requirements](#requirements)
- [Getting Started](#getting-started)
- [Setup](#setup)
- [Usage](#usage)


## Introduction
This is an open-source e-commerce web application built using Python Django and React.js. The application provides a platform for online shopping with features for browsing products, adding items to the cart, managing user profiles, and processing orders. It utilizes Material-UI for a sleek and responsive user interface.

## Features
- User authentication and registration.
- Product catalog with category filtering.
- Product detail pages with images, descriptions, and prices.
- Shopping cart for adding and managing products.
- Order history and user profile management.

## Technologies Used
- **Frontend**:
  - React.js
  - Material-UI
- **Backend**:
  - Python
  - Django
  - Django REST framework
- **Database**:
  - Sql lite
- **Authentication**:
  - Django authentication system


## Requirements
- Python (3.6+)
- Node.js


## Getting Started
To get started with this project, follow these steps:

1. Clone the repository:
   ```
   git clone https://github.com/anugrahprathap/DjangoReactEcomerce.git
   ```

2. Install the required packages for the frontend:
   ```
   cd frontend
   npm install
   ```

3. Install the required packages for the backend (create a virtual environment if needed):
   ```
   cd backend
   pip install -r requirements.txt
   ```

## Setup
1. **Database Setup**:
   - Create a PostgreSQL database and configure the database settings in `backend/settings.py`.

2. **Environment Variables**:
   - Create a `.env` file for storing sensitive information like database credentials, API keys, and secret keys.

3. **Migrations**:
   - Run database migrations to create the required tables:
     ```
     python manage.py makemigrations
     python manage.py migrate
     ```

4. **Static Files**:
   - Collect static files:
     ```
     python manage.py collectstatic
     ```

5. **Superuser**:
   - Create a superuser for admin access:
     ```
     python manage.py createsuperuser
     ```

6. **Run the Application**:
   - Start the development server for the backend:
     ```
     python manage.py runserver
     ```

   - Start the development server for the frontend:
     ```
     cd frontend
     npm start
     ```

## Usage
1. Visit `http://localhost:8000` to access the e-commerce web application.
2. Register or log in to access user-specific features.
3. Browse the product catalog, add items to the cart, and complete the checkout process.

