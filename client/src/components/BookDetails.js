import React, { Component } from "react";
import { graphql } from "react-apollo";
import { GET_BOOK } from "./queries";

class BookDetails extends Component {
  displayBookDetails = () => {
    const { book } = this.props.data;
    if (book) {
      return (
        <div key={book.id}>
          <h6>{`Name: ${book.name}`}</h6>
          <p>{`Genre: ${book.genre}`}</p>
          <p>{`Author: ${book.author.name}`}</p>
          <br />
          <br />
          <p>Other books by this author:</p>
          <ul>
            {book.author.books.map(obj => (
              <li key={obj.id}>{obj.name}</li>
            ))}
          </ul>
        </div>
      );
    } else {
      return <p>No Book Selected</p>;
    }
  };

  render() {
    //const { data } = this.props;
    console.log(this.props);
    return <div id="book-details">{this.displayBookDetails()}</div>;
  }
}

export default graphql(GET_BOOK, {
  options: props => {
    return {
      variables: {
        id: props.bookId
      }
    };
  }
})(BookDetails);
