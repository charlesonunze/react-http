import React, { Component } from "react";
import axios from 'axios'
import "./App.css";

const apiEndpoint = 'https://jsonplaceholder.typicode.com/posts?userId=1';

class App extends Component {
  state = {
    posts: []
  };

  async componentDidMount() {
    const { data: posts } = await axios.get(apiEndpoint);
    this.setState({ posts })
  }

  handleAdd = async () => {
    const data = {
      body: "Body of the new post.",
      title: "New Post",
    }
    const { data: post } = await axios.post(apiEndpoint, data)

    this.setState({ posts: [post, ...this.state.posts] })
  };

  handleUpdate = post => {
    const posts = [...this.state.posts];
    const index = posts.indexOf(post)
    posts[index] = { ...post, title: 'Updated post' }

    this.setState({ posts })
  };

  handleDelete = post => {
    console.log("Delete", post);
  };

  render() {
    return (
      <React.Fragment>
        <button className="btn btn-primary" onClick={ this.handleAdd }>
          Add
        </button>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            { this.state.posts.map((post, index) => (
              <tr key={ index }>
                <td>{ post.title }</td>
                <td>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={ () => this.handleUpdate(post) }
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={ () => this.handleDelete(post) }
                  >
                    Delete
                  </button>
                </td>
              </tr>
            )) }
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default App;
