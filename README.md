# Notebook Web Application

This is a web-based notebook application where users can register, log in, and manage their notes. The backend is built on the Node.js framework, and the frontend is created with React.

## Features

- User registration and authentication
- Add, edit, and delete notes
- Responsive design for desktop and mobile usage

## User Stories

- As a new user, I want to for an account so that I can securely store and manage my notes.
- As a returning user, I want to sign in to my account to access my notes.
- As a user, I want to add new notes with a title and body so that I can keep track of my thoughts and tasks.
- As a user, I want to edit my notes in order to update the content or correct mistakes.
- As a user, I want to delete notes that are no longer needed to keep my notebook organized.

## Getting Started

These instructions will help you set up and run the project locally on your machine for development and testing purposes.

### Prerequisites

What you need to install the software:

- Node.js
- npm (Node Package Manager)

### Installing

A step-by-step series of examples that tell you how to get a development environment running:

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/sandratjushka/Notes_web

2. Navigate to the project directory: 
   ```bash
   cd Notes_web

3. Install the required packages:
   ```bash
   cd backend
   npm install
   cd ../frontend
   npm install

## Running the Application

To run the backend and frontend services, you will need to start each one separately as they will run on different ports:

1. **Starting the Backend:**
Navigate to the backend directory and start the server:
   ```bash
   cd backend
   node server.js

The backend service should now be running on http://localhost:3000.

2. **Starting the Frontend:**
In a new terminal window, navigate to the frontend directory and start the React application:
   ```bash
   cd frontend
   npm start

The frontend service will automatically find an available port, usually http://localhost:3001, if 3000 is already in use.

## Built With

- [React](https://reactjs.org/) - The web framework used
- [Node.js](https://nodejs.org/) - The backend framework
- [Express.js](...) - The web application framework used on the backend
- [MySQL](https://www.mysql.com/) - Database platform
