import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import Shelf from "./Shelf";
import SearchBook from "./SearchBook";
import { Route } from "react-router-dom";
import { Link } from "react-router-dom";

class BooksApp extends React.Component {
  state = {
    books: [],
    bookShelves: [
      {
        title: "Currently Reading",
        type: "currentlyReading"
      },
      {
        title: "Want To Read",
        type: "wantToRead"
      },
      {
        title: "Read",
        type: "read"
      }
    ],
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false
  };
  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState(() => ({
        books
      }));
    });
  }

  changeShelf = (book, shelf) => {
    BooksAPI.update(book, shelf)
      .then(BooksAPI.getAll)
      .then(books => {
        this.setState(() => ({
          books
        }));
      });
  };

  render() {
    const bookShelves = this.state.bookShelves;

    return (
      <div className="app">
        {/* Shelves */}
        <Route
          exact
          path="/"
          render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  {bookShelves.map(shelf => (
                    <div key={shelf.title} className="bookshelf">
                      <h2 className="bookshelf-title">{shelf.title}</h2>
                      <Shelf
                        books={this.state.books}
                        shelfType={shelf.type}
                        onChangeShelf={this.changeShelf}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="open-search">
                <Link to="/search">Add a book</Link>
              </div>
            </div>
          )}
        />

        {/* Search */}
        <Route
          path="/search"
          render={() => (
            <SearchBook
              books={this.state.books}
              onChangeShelf={this.changeShelf}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
