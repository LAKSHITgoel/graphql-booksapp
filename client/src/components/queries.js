import { gql } from "apollo-boost";

export const GET_AUTHORS = gql`
  {
    authors {
      name
      id
    }
  }
`;

export const ADD_BOOK = gql`
  mutation($name: String!, $genre: String!, $authorId: ID!) {
    addBook(name: $name, genre: $genre, authorId: $authorId) {
      name
      id
    }
  }
`;

export const GET_BOOKS = gql`
  {
    books {
      id
      name
      genre
      author {
        name
        age
      }
    }
  }
`;

export const GET_BOOK = gql`
  query($id: ID) {
    book(id: $id) {
      name
      genre
      id
      author {
        name
        id
        books {
          name
          id
        }
      }
    }
  }
`;

export const ADD_AUTHOR = gql`
  mutation($name: String!, $age: Number!) {
    addAuthor(name: $name, age: $age) {
      name
      age
      id
    }
  }
`;
