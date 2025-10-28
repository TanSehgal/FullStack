import React, { useState } from 'react';
import './LibraryApp.css';

const LibraryApp = () => {
  // Initial book data
  const [books, setBooks] = useState([
    { id: 1, title: 'To Kill a Mockingbird', author: 'Harper Lee' },
    { id: 2, title: '1984', author: 'George Orwell' },
    { id: 3, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
    { id: 4, title: 'Pride and Prejudice', author: 'Jane Austen' },
    { id: 5, title: 'The Catcher in the Rye', author: 'J.D. Salinger' },
  ]);

  // State for search query
  const [searchQuery, setSearchQuery] = useState('');

  // State for new book form
  const [newBook, setNewBook] = useState({ title: '', author: '' });

  // Filter books based on search query
  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle new book input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBook({ ...newBook, [name]: value });
  };

  // Add a new book to the list
  const addBook = (e) => {
    e.preventDefault();
    if (newBook.title.trim() && newBook.author.trim()) {
      const book = {
        id: books.length > 0 ? Math.max(...books.map(b => b.id)) + 1 : 1,
        title: newBook.title,
        author: newBook.author,
      };
      setBooks([...books, book]);
      setNewBook({ title: '', author: '' });
    }
  };

  // Remove a book from the list
  const removeBook = (id) => {
    setBooks(books.filter((book) => book.id !== id));
  };

  return (
    <div className="library-app">
      <h1>Library Management System</h1>

      {/* Search Section */}
      <div className="search-section">
        <input
          type="text"
          placeholder="Search by title or author..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>

      {/* Add Book Form */}
      <form onSubmit={addBook} className="add-book-form">
        <h2>Add New Book</h2>
        <input
          type="text"
          name="title"
          placeholder="Book Title"
          value={newBook.title}
          onChange={handleInputChange}
          className="form-input"
        />
        <input
          type="text"
          name="author"
          placeholder="Author Name"
          value={newBook.author}
          onChange={handleInputChange}
          className="form-input"
        />
        <button type="submit" className="add-button">
          Add Book
        </button>
      </form>

      {/* Book List */}
      <div className="book-list">
        <h2>Book Collection ({filteredBooks.length})</h2>
        {filteredBooks.length === 0 ? (
          <p className="no-books">No books found matching your search.</p>
        ) : (
          <ul>
            {filteredBooks.map((book) => (
              <li key={book.id} className="book-item">
                <div className="book-info">
                  <h3>{book.title}</h3>
                  <p>by {book.author}</p>
                </div>
                <button
                  onClick={() => removeBook(book.id)}
                  className="remove-button"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default LibraryApp;
