import React, { Component } from "react";
import { graphql } from "react-apollo";
import { GET_BOOK } from "./queries";

class BookDetails extends Component {
  displayBookDetails = () => {
    const { book, loading } = this.props.data;
    if (loading) return <p>Loading...</p>;
    if (book) {
      return (
        <div key={book.id}>
          <p>{`Name: ${book.name}`}</p>
          <p>{`Genre: ${book.genre}`}</p>
          <p>{`Author: ${book.author.name}`}</p>
          <p>{`Age: ${book.author.age}`}</p>
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
