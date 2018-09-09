import React, { Component } from "react";
import { Query } from "react-apollo";
import { GET_BOOKS } from "./queries";
import BookDetails from "./BookDetails";

class BookList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null
    };
  }

  onClick = e => {
    this.setState({ selected: e.target.id });
  };

  render() {
    return (
      <div>
        <ul id="book-list">
          <Query query={GET_BOOKS}>
            {({ loading, error, data }) => {
              if (loading) return "Loading...";
              if (error) return "Error";
              return data.books.map(book => (
                <li key={book.id} id={book.id} onClick={this.onClick} >{`${book.name} - ${
                  book.author.name
                }`}</li>
              ));
            }}
          </Query>
        </ul>
        <BookDetails bookId={this.state.selected} />
      </div>
    );
  }
}

export default BookList;
