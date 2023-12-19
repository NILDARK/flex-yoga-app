# Flex Yoga Class Admission Portal

## Overview
Welcome to the Flex Yoga Class Admission Portal! This application serves as an admission form for monthly yoga classes, allowing users to enroll in different batches, make monthly payments, and manage their class preferences. The portal is designed to be user-friendly, adhering to specific requirements such as age limitations, monthly payments, and batch preferences.

## Technologies Used
- Frontend: ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
- Backend: ![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white)
- Deployment: ![Netlify](https://img.shields.io/badge/netlify-%23000000.svg?style=for-the-badge&logo=netlify&logoColor=#00C7B7) (Frontend), ![Render](https://img.shields.io/badge/Render-%46E3B7.svg?style=for-the-badge&logo=render&logoColor=white) (Backend)
- Containerization: ![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
- Orchestration: ![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
- Database: ![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)

## Project Structure
The project is structured into frontend and backend components, with each having its own directory. The frontend is built using React and Vite, while the backend is implemented in Flask with a PostgreSQL database. Both components are containerized using Docker, and Docker Compose is utilized for orchestration.

## Frontend
### Overview

The frontend serves as a user interface, allowing individuals to seamlessly enroll in yoga classes, log in, change their yoga batch for the next month, and make payments for the current month. It interacts with the backend through APIs, utilizing the provided endpoints to execute these functions. The intuitive design ensures a user-friendly experience for managing class preferences and payments.

### Technologies
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white) ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![Bootstrap](https://img.shields.io/badge/bootstrap-%238511FA.svg?style=for-the-badge&logo=bootstrap&logoColor=white) ![Netlify](https://img.shields.io/badge/netlify-%23000000.svg?style=for-the-badge&logo=netlify&logoColor=#00C7B7)
### Visual Web Design
![User Flow](./Docs/images/visual_user_flow.png)

### Installation for frontend

To run the frontend locally, follow these steps:

    1. Create an `.env` file in the `frontend` directory.

        ```env
        # .env
        VITE_API_BASE_URL="http://localhost:5000"
        ```

    2. Run the following command:

        ```bash
        npm install
        ```

    3. Start the development server:

        ```bash
        npm run dev
        ```

Now, the frontend will be accessible at [http://localhost:5173](http://localhost:5173).

## Backend
### Overview

The backend serves as the API server for the Flex Yoga Class Admission Portal. It handles API calls initiated from the frontend, managing the application's database. Built using Flask, the backend provides a RESTful API, and the database is powered by PostgreSQL. Object-Relational Mapping (ORM) is employed to interact seamlessly with the PostgreSQL database, ensuring efficient data management and retrieval.

### Technologies
![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white)![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white) ![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white) ![Render](https://img.shields.io/badge/Render-%46E3B7.svg?style=for-the-badge&logo=render&logoColor=white)

### Database Design

#### Entity Relationship (ER) Diagram

![ER Diagram](./Docs/images/ER_Diagram.svg)

#### Tables

##### User Table

- **username**: primary key, varchar(50)
- **password**: text
- **name**: text
- **age**: int, CheckConstraint('age >= 18 AND age <= 65')
- **contact**: varchar(20)
- **joined_date**: timestamp, Default: current timestamp
- **is_active**: boolean, Default: True

##### Batches Table

- **batch_id**: primary key, int
- **batch**: varchar(50)

##### BatchChangeRequest Table

- **id**: primary key, int
- **username**: foreign key (User), varchar(50)
- **requested_time**: timestamp, Default: current timestamp + 1 month
- **batch_id**: foreign key (Batches), int

##### PaymentHistory Table

- **id**: primary key, int
- **username**: foreign key (User), varchar(50)
- **time_of_payment**: timestamp, Default: current timestamp
- **amount**: int, Default: 500

#### Relationships

- **User -> BatchChangeRequest**: One-to-Many relationship on username
- **User -> PaymentHistory**: One-to-Many relationship on username
- **Batches -> BatchChangeRequest**: One-to-Many relationship on batch_id

#### Constraints

- **User -> age**: Check constraint to ensure age is between 18 and 65
- **BatchChangeRequest -> requested_time**: Default constraint to set requested_time to current timestamp + 1 month

### API Endpoints

#### 1. Home
- **Endpoint**: `/`
- **Method**: `GET`
- **Description**: Welcomes users to the Yoga Class App.

#### 2. Create User
- **Endpoint**: `/create_user`
- **Method**: `POST`
- **Description**: Creates a new user for the Yoga Class App and enrolls him to specified batch.
- **Request Body**:
  ```json
  {
    "username": "example_username",
    "password": "example_password",
    "name": "John Doe",
    "age": 25,
    "contact": "1234567890",
    "batch": 1
  }
  ```
- **Response**:
  - **Success**: Status Code 201
  ```json
  {
    "message": "User created successfully"
  }
  ```
  - **Error**: Status Code 400 or 500
  ```json
  {
    "error": "Error message"
  }
  ```

#### 3. Login
- **Endpoint**: `/login`
- **Method**: `POST`
- **Description**: Validates user credentials for login.
- **Request Body**:
  ```json
  {
    "username": "example_username",
    "password": "example_password"
  }
  ```
- **Response**:
  - **Success**: Status Code 200
  ```json
  {
    "message": "Login successful"
  }
  ```
  - **Error**: Status Code 401
  ```json
  {
    "error": "Invalid credentials"
  }
  ```

#### 4. Batch Change Request
- **Endpoint**: `/batch-change`
- **Method**: `POST`
- **Description**: Initiates a request to change the user's yoga batch for the next month.
- **Request Body**:
  ```json
  {
    "username": "example_username",
    "new_batch_id": 2
  }
  ```
- **Response**:
  - **Success**: Status Code 200
  ```json
  {
    "message": "Request Processed Successfully"
  }
  ```
  - **Error**: Status Code 500
  ```json
  {
    "error": "Error message"
  }
  ```

#### 5. Get Current Batch
- **Endpoint**: `/get-current-batch`
- **Method**: `GET`
- **Description**: Retrieves the user's current yoga batch.
- **Query Parameters**:
  - `username` (string): User's username
- **Response**:
  - **Success**: Status Code 200
  ```json
  {
    "current_batch": 1,
    "batch": "6-7AM"
  }
  ```
  - **Error**: Status Code 404
  ```json
  {
    "error": "No records found for username: example_username"
  }
  ```

#### 6. Complete Payment
- **Endpoint**: `/complete-payment`
- **Method**: `POST`
- **Description**: Records the completion of a payment for the user, this is dummy function handling payment.
- **Request Body**:
  ```json
  {
    "username": "example_username",
    "amount": 500
  }
  ```
- **Response**:
  - **Success**: Status Code 200
  ```json
  {
    "message": "Payment Processed Successfully"
  }
  ```
  - **Error**: Status Code 500
  ```json
  {
    "error": "Error message"
  }
  ```

#### 7. Get Payment Status
- **Endpoint**: `/get-payment-status`
- **Method**: `GET`
- **Description**: Retrieves the payment status for the user, i.e. fee dues till the current month.
- **Query Parameters**:
  - `username` (string): User's username
- **Response**:
  - **Success**: Status Code 200
  ```json
  {
    "due_status": true,
    "amount": 500
  }
  ```
  - **Error**: Status Code 404
  ```json
  {
    "error": "No records found for username: example_username"
  }
  ```

#### 8. Get Active Status
- **Endpoint**: `/get-active-status`
- **Method**: `GET`
- **Description**: Retrieves the active status for the user i.e. active user has no fee dues except current month.
- **Query Parameters**:
  - `username` (string): User's username
- **Response**:
  - **Success**: Status Code 200
  ```json
  {
    "is_active": true
  }
  ```
  - **Error**: Status Code 500
  ```json
  {
    "error": "Error message"
  }
  ```
### Installation for backend

To run the backend locally, follow these steps:

    1. Create an `.env` file in the `backend` directory.

        ```env
        # .env
        DATABASE_URL="postgresql://user:password@localhost:5432/yoga_class"
        ```

    Replace `user` and `password` with your PostgreSQL credentials.

    2. Run the following commands:

        ```bash
        pip install -r requirements.txt
        ```

    3. Start the backend server:

        ```bash
        python flex-yoga-app.wsgi
        ```

Now, the backend will be accessible at [http://localhost:5000](http://localhost:5000).

Note: Ensure that you have a PostgreSQL server running locally with the specified credentials.

## Containerization

### Docker Compose

Docker Compose is used to orchestrate the deployment of both frontend and backend components. Ensure you have Docker and Docker Compose installed on your system.

#### Configuration

Create an `.env` file in the root directory and include the following environment variables:

```env
# .env
DATABASE_URL=""
VITE_API_BASE_URL=""
```

#### Building and Running

Use the following commands to build and run the Docker containers:

```bash
# Build and run containers
docker-compose up --build

# To run in detached mode
docker-compose up --build -d
```

### Individual Containers

If you prefer to build and run containers individually, you can use the following commands:

#### Backend

```bash
# Build backend container
docker build -t backend ./backend

# Run backend container
docker run -p 5000:5000 --env-file .env backend
```

#### Frontend

```bash
# Build frontend container
docker build -t frontend ./frontend

# Run frontend container
docker run -p 5173:5173 --env-file .env frontend
```

##### Note

- Ensure that the `.env` file is present and contains the required environment variables before building the containers.
- For the frontend, VITE_API_BASE_URL is a runtime environment variable and should be included in the `.env` file.

## Live Links

- Frontend: [Flex Yoga Admission Portal](https://flex-yoga-admission-portal.netlify.app/)
- Backend: [Flex Yoga App API](https://flex-yoga-app.onrender.com/)

**Note**: There might be an issue with the initial request when from frontend. If you encounter any problems, please try making multiple requests, and it should work smoothly.

## Demo GIFs

Below are visual demonstrations of key functionalities within the Flex Yoga Admission Portal.
###  Creating a User

![Create User](./Docs/gifs/CreateUser.gif)

### Logging In, Paying Dues, Making batch change request, persisting user data on reload

![Login](./Docs/gifs/UserLogin.gif)
