import React, { Component } from "react";
import { GET_AUTHORS, ADD_AUTHOR } from "./queries";
import { graphql } from "react-apollo";

class AddAuthor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authorName: "",
      authorAge: ""
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const { mutate } = this.props;
    mutate({
      variables: {
        name: this.state.authorName,
        age: Number(this.state.authorAge)
      },
      refetchQueries: [{ query: GET_AUTHORS }]
    }).then(res => console.log(res));
    this.setState({
      authorName: "",
      authorAge: ""
    });
  };

  render() {
    return (
      <div>
        <form id="add-author" onSubmit={this.onSubmit}>
          <div className="field">
            <label htmlFor="authorName">Author Name:</label>
            <input
              type="text"
              name="authorName"
              onChange={this.onChange}
              value={this.state.authorName}
              placeholder="Author Name"
            />
          </div>
          <div className="field">
            <label htmlFor="authorAge">Age:</label>
            <input
              type="text"
              name="authorAge"
              onChange={this.onChange}
              value={this.state.authorAge}
              placeholder="Age"
            />
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

export default graphql(ADD_AUTHOR)(AddAuthor);
