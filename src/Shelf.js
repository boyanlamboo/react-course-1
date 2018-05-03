import React, { Component } from "react";
import Book from "./Book";

class Shelf extends Component {
  state = {
    value: ""
  };

  render() {
    const { books, shelfType, onChangeShelf } = this.props;
    const filteredBooks = books.filter(function(book) {
      return book.shelf === shelfType;
    });

    return (
      <div className="bookshelf-books">
        <ol className="books-grid">
          {filteredBooks.map(book => (
            <li key={book.id}>
              <Book book={book} onChangeShelf={onChangeShelf} />
            </li>
          ))}
        </ol>
      </div>
    );
  }
}

export default Shelf;
