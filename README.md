# Book Catalog Project

This project is a simple book catalog web application with a React frontend and Django backend.

## Frontend

The frontend is built with React . It provides a user interface for viewing the list of books and adding new books  to the catalog and also searching them based on Author Title or Book Name.

### Features
- Display list of books
- Form to add new books
- Search Books based on Author Name or Book Title

## Backend

The backend is built with Django and provides two API endpoints:

1. GET /api/books/: Retrieves the list of all books
2. POST /api/books/: Adds a new book to the catalog

### Models
- Book: Represents a book with title and author fields

## Setup and Running

1. Clone the repository
2. Set up the Django backend:
   ```
   cd backend
   pip install -r requirements.txt
   python manage.py migrate
   python manage.py runserver
   ```
3. Set up the React frontend:
   ```
   cd frontend
   npm install
   npm start
   ```

The application should now be running on `http://localhost:3000` for the frontend and `http://localhost:8000` for the backend.
