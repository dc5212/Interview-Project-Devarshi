import React, { useState, useEffect } from 'react';
import './BookCatalog.css';

const BookCatalog = () => {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({ title: '', author: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/books/');
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const addBook = async () => {
    if (!newBook.title || !newBook.author) {
      setError('Please enter both title and author.');
      return;
    }

    const isDuplicate = books.some(
      book => book.title.toLowerCase() === newBook.title.toLowerCase() &&
              book.author.toLowerCase() === newBook.author.toLowerCase()
    );

    if (isDuplicate) {
      setError('This book already exists in the catalog.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/books/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBook),
      });
      if (response.ok) {
        setNewBook({ title: '', author: '' });
        setError('');
        fetchBooks();
      }
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="book-catalog">
      <h1>Book Catalog</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by title or author"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="add-book-form">
        <input
          type="text"
          placeholder="Title"
          value={newBook.title}
          onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Author"
          value={newBook.author}
          onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
        />
        <button onClick={addBook}>Add Book</button>
        {error && <p className="error">{error}</p>}
      </div>
      <div className="book-list">
        {filteredBooks.map((book) => (
          <div key={book.id} className="book-item">
            <h2>{book.title}</h2>
            <p>Author: {book.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookCatalog;