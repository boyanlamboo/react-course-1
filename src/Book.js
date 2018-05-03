import React, { Component } from "react";

class Book extends Component {
  state = {
    value: "none"
  };

  handleChange = event => {
    this.setState({ value: event.currentTarget.value }, () =>
      this.props.onChangeShelf(this.props.book, this.state.value)
    );
  };

  render() {
    const { book } = this.props;
    const image =
      book.imageLinks && book.imageLinks.thumbnail
        ? book.imageLinks.thumbnail
        : "";
    const currentShelf = book.shelf ? book.shelf : this.state.value;

    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: "url(" + image + ")"
            }}
          />
          <div className="book-shelf-changer">
            <select value={currentShelf} onChange={this.handleChange}>
              <option value="default" disabled>
                Move to...
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors}</div>
      </div>
    );
  }
}

export default Book;
