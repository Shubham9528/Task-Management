# Ve3 Task Manager 🚀

**Ve3 Task Manager** is a web application designed to help you manage your tasks efficiently. It offers features like adding, updating, deleting, and fetching tasks, along with user authentication through login and registration functionalities.


![login](https://github.com/user-attachments/assets/2106fe57-2e99-4d84-bb07-6dbf11df7b5c)

![task manager](https://github.com/user-attachments/assets/6822a426-82ec-4367-84c1-b74bdbc85ec3)





## Tech Stack 🛠️

*   Frontend: React.js⚛️
*   Backend: Node.js ⚙️, Express.js 🌐
*   Database: PostgreSQL 🐘
*   Cloud: Database on Render ☁️, Application on Vercel ▲

## Prerequisites ✅

Before running the project, make sure you have the following installed:

*   VS Code (or any code editor) 💻
*   Node.js (for both frontend and backend) 🟢
*   PostgreSQL (for managing the database) 💾
*   pgAdmin or DBeaver (for managing the PostgreSQL database) 🗄️
*   Vercel CLI (for deploying the frontend to Vercel) ⏫
*   Render Account (for managing the backend on Render) 🖥️

## Project Setup ⚙️

### Frontend Setup ⚛️

1.  Clone the repository:

    ```bash
    git clone <repository_url>
    ```

2.  Install dependencies:

    ```bash
    cd <frontend_directory>
    npm install
    ```

3.  Create a `.env` file in the frontend directory with the following variable:

    ```
    VITE_BACKEND_PORT=<your_backend_url>
    ```

### Backend Setup ⚙️

1.  Clone the repository:

    ```bash
    git clone <repository_url>
    ```

2.  Install dependencies:

    ```bash
    cd <backend_directory>
    npm install
    ```

3.  Create a `.env` file in the backend directory with the following variables:

    ```
    DB_HOST=<your_database_host>
    DB_USER=<your_database_user>
    DB_PASSWORD=<your_database_password>
    DB_NAME=<your_database_name>
    ```

4.  Run the backend server:

    ```bash
    npm start
    ```

## Environment Variables ⚙️

### Frontend .env:
```
VITE_BACKEND_PORT: The URL of the backend server.
```
### Backend .env:
```
DB_HOST: The host address for the PostgreSQL database. 
DB_USER: The username for the PostgreSQL database. 
DB_PASSWORD: The password for the PostgreSQL database. 
DB_NAME: The name of the PostgreSQL database. 🏷
```
## Running the Application 🏃‍♂️

*   **Frontend:** `http://localhost:3000/` (after running the React development server) 🌐
*   **Backend:** `http://localhost:4000/` (after running the Node.js server) ⚙️

## Modules 📦

The application provides various modules for task management functionality:

*   **AddNewTask:** Allows adding new tasks to the system. ➕
*   **FetchAllTask:** Displays all tasks in a table format. 📑
*   **FetchById:** Fetches and displays details of a specific task by ID. 🔎
*   **UpdateTask:** Allows updating an existing task. ✏️
*   **DeleteTask:** Allows deleting a task by ID. 🗑️

**(Detailed Module Descriptions - Keep these in your full README)**

## Server ⚙️

The backend is built with Node.js ⚙️ and Express.js 🌐, using PostgreSQL 🐘 for task management. It handles:

*   User authentication (login 👤 and registration 📝).
*   CRUD operations for tasks (add ➕, update ✏️, delete 🗑️, fetch 📑).
*   Connecting to the PostgreSQL database. 🐘

It provides a robust API for the frontend.

## API Endpoints 📍

1.  **GET /**
    *   Description: Checks if the server is running. 🚦
    *   Response:

        ```json
        {
          "message": "Backend server is running" ✅
        }
        ```

2.  **POST /login**
    *   Description: Handles user login. 👤
    *   Request Body:
        ```json
        {
          "username": "testuser",
          "password": "password123"
        }
        ```
    *   Response (Success):
        ```json
        {
          "message": "Login successful",
          "userId": 123,
          "username": "testuser"
        }
        ```
    *   Response (Failure):
        ```json
        {
          "message": "Invalid credentials" ❌
        }
        ```

3.  **GET /fetchAll**
    *   Description: This route fetches all tasks from the database. 📑
    *   Response:
        ```json
        [
          {
            "id": 1,
            "name": "Grocery Shopping",
            "description": "Buy groceries for the week",
            "status": "pending"
          },
          // ... more tasks
        ]
        ```

4.  **POST /register**
    *   Description: This route is used for user registration. 📝
    *   Request Body:
        ```json
        {
          "username": "newuser",
          "password": "newpassword"
        }
        ```
    *   Response (Success):
        ```json
        {
          "message": "Registration successful" ✅
        }
        ```
    *   Response (Failure - Username Exists):
        ```json
        {
          "message": "Username already exists" ⚠️
        }
        ```

5.  **GET /fetchById/:id**
    *   Description: This route fetches a task from the database by its unique ID. 🔎
    *   Example Request: `/fetchById/1`
    *   Response (Success):
        ```json
        {
          "id": 1,
          "name": "Grocery Shopping",
          "description": "Buy groceries for the week",
          "status": "pending"
        }
        ```
    *   Response (Failure - Not Found):
        ```json
        {
          "message": "Task not found" ❌
        }
        ```

6.  **POST /AddNewTask**
    *   Description: This route adds a new task to the database. ➕
    *   Request Body:
        ```json
        {
          "name": "Pay Bills",
          "description": "Pay electricity and water bills",
          "status": "pending"
        }
        ```
    *   Response (Success):
        ```json
        {
          "message": "Task added successfully" ✅
        }
        ```
    *   Response (Failure - Missing Fields):
        ```json
        {
          "message": "Name is required" ⚠️
        }
        ```

7.  **PUT /update/:id**
    *   Description: This route updates an existing task in the database by its ID. ✏️
    *   Example Request: `/update/1`
    *   Request Body:
        ```json
        {
          "name": "Grocery Run",
          "description": "Buy groceries for the week at the farmer's market",
          "status": "in progress"
        }
        ```
    *   Response (Success):
        ```json
        {
          "message": "Task updated successfully",
          "updatedTask": {
            "id": 1,
            "name": "Grocery Run",
            "description": "Buy groceries for the week at the farmer's market",
            "status": "in progress"
          }
        }
        ```
    *   Response (Failure - Not Found):
        ```json
        {
          "message": "Task not found" ❌
        }
        ```

8.  **DELETE /delete/:id**
    *   Description: This route deletes a task from the database by its ID. 🗑️
    *   Example Request: `/delete/1`
    *   Response (Success):
        ```json
        {
          "message": "Task deleted successfully" ✅
        }
        ```
    *   Response (Failure - Not Found):
        ```json
        {
          "message": "Task not found" ❌
        }
        ```

9.  **Server Listening**
    *   Description: The server listens on the port specified in the `.env` file and provides API access for all the above routes. 👂 The server uses Node.js and Express.js to handle requests and responses. It connects to a PostgreSQL database to store and retrieve data related to users and tasks. Each route handles a specific part of the task management system, such as authentication, user registration, task CRUD operations, and fetching task details.

## License 📄



This project is licensed under the Codefolio icense - contact codefolio.inquiry@gmail.com for more details. ⚖️
