import logo from './logo.svg';
import './App.css';
import Book from './code/Book';
import './code/Book.css';
import booksData from './code/bookData';

function App() {
  return (
    <div className="App">
      <h1>Book List</h1>
      <div className="book-list">
  {booksData.map(book => <Book key={book.id}  book={book} name="sami"/>)} 
      </div>
    </div>
  );
}

export default App;
