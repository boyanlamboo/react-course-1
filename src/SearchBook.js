import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import Book from "./Book";

class SearchBook extends Component {
  state = {
    query: "",
    booksFound: []
  };

  updateQuery = query => {
    this.setState(() => ({
      query
    }));
  };

  runQuery = state => {
    if (state.query.trim() === "") {
      this.setState(() => ({
        booksFound: []
      }));
    } else {
      BooksAPI.search(state.query.trim()).then(searchResults => {
        if (searchResults.error) {
          return;
        }
        BooksAPI.getAll().then(allBooks => {
          console.log(searchResults, allBooks);
          const matchedBooks = searchResults.map(
            search => allBooks.find(item => item.id === search.id) || search
          );
          this.setState(state => ({
            booksFound: allBooks.error ? state.booksFound : matchedBooks
          }));
        });
      });
    }
  };

  componentWillUpdate(nextProps, nextState) {
    if (this.state.query !== nextState.query) {
      this.runQuery(nextState);
    }
  }

  render() {
    const { onChangeShelf } = this.props;
    const { booksFound } = this.state;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            {/*
                                          NOTES: The search from BooksAPI is limited to a particular set of search terms.
                                          You can find these search terms here:
                                          https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                                          However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                                          you don't find a specific author or title. Every search is limited by search terms.
                   */}
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={event => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {booksFound.map(book => (
              <li key={book.id}>
                <Book book={book} onChangeShelf={onChangeShelf} />
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchBook;
