# Real-Time Comments System

This is a real-time comments system built using Next.js for the frontend, Node.js and Express for the backend, and MySQL for data storage. It leverages Socket.IO for real-time updates and uses Material UI and Tailwind CSS for styling.

## Features

- User login with a simple username.
- Real-time comment posting and viewing.
- Responsive UI with Material UI and Tailwind CSS.
- Comments stored in a MySQL database.

## Prerequisites

- **Node.js** (>= 14.x)
- **MySQL** (for database)
- **npm** (or **yarn**)

## Project Setup

### 1. Clone the repository

```bash
git clone https://github.com/sahilf637/Detrator_Assigment.git
cd Detrator_Assigment



### 2. Install Dependencies

```markdown
### 2. Install Dependencies

For both frontend and backend:

```bash
npm install


### 3. Database Setup

```markdown
### 3. Database Setup

1. Ensure MySQL is installed and running on your system.
2. Create a database for the project.

```sql
CREATE DATABASE comments_db;


### 4. Create Comments Table

```markdown
3. Create the `comments` table in the database:

```sql
USE comments_db;

CREATE TABLE comments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255),
  comment TEXT,
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
);


### 5. Start the Backend Server

```markdown
### 4. Start the Backend Server

1. **Navigate to the `backend` directory**:

   ```bash
   cd backend
   node index.js


### 6. Start the Frontend

```markdown
### 5. Start the Frontend

1. Open a new terminal and **navigate to the `frontend` directory**:

   ```bash
   cd frontend
   npm run dev



### 7. Usage

```markdown
## Usage

1. Visit `http://localhost:3000` in your browser.
2. Enter a username to log in.
3. Add comments and see them appear in real-time across all connected clients.

