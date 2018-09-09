import React, { Component } from "react";
import { GET_AUTHORS, ADD_BOOK, GET_BOOKS } from "./queries";
import { Query, graphql } from "react-apollo";

class AddBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookName: "",
      bookGenre: "",
      authorId: ""
    };
  }

  onChange = e => {
    if (e.target.name === "authorId" && e.target.value === "Select Author") {
      this.setState({ authorId: "" });
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  };

  onSubmit = e => {
    e.preventDefault();
    const { mutate } = this.props;
    mutate({
      variables: {
        name: this.state.bookName,
        genre: this.state.bookGenre,
        authorId: this.state.authorId
      },
      refetchQueries: [{ query: GET_BOOKS }]
    }).then(res => console.log(res));
    this.setState({
      bookName: "",
      bookGenre: "",
      authorId: ""
    });
  };

  render() {
    return (
      <div>
        <form id="add-book" onSubmit={this.onSubmit}>
          <div className="field">
            <label htmlFor="bookName">Book Name:</label>
            <input
              type="text"
              name="bookName"
              onChange={this.onChange}
              value={this.state.bookName}
              placeholder="Book Name"
            />
          </div>
          <div className="field">
            <label htmlFor="bookGenre">Genre:</label>
            <input
              type="text"
              name="bookGenre"
              onChange={this.onChange}
              value={this.state.bookGenre}
              placeholder="Genre"
            />
          </div>
          <div className="field">
            <label htmlFor="author">Author</label>
            <select name="authorId" onChange={this.onChange}>
              <option>Select Author</option>
              <Query query={GET_AUTHORS}>
                {({ data, loading, error }) => {
                  if (loading) return "Loading...";
                  if (error) return "Error";
                  return data.authors.map(author => (
                    <option key={author.id} value={author.id}>
                      {author.name}
                    </option>
                  ));
                }}
              </Query>
            </select>
          </div>
          <div className="field">
            <button type="submit" onClick={this.onSubmit}>
              +
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default graphql(ADD_BOOK)(AddBook);
