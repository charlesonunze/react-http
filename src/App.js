import React, { Component } from "react";
import axios from 'axios'
import "./App.css";

const apiEndpoint = 'https://jsonplaceholder.typicode.com/posts';

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

  handleUpdate = async (post) => {
    const posts = [...this.state.posts];
    const index = posts.indexOf(post);
    post.title = 'Updated post';

    const { data: updatedPost } = await axios.put(`${apiEndpoint}/${post.id}`, post)
    posts[index] = updatedPost
    this.setState({ posts })
  };

  handleDelete = async (post) => {
    const originalPosts = this.state.posts;

    const posts = [...this.state.posts].filter((p) => p.id !== post.id);
    this.setState({ posts })

    try {
      await axios.delete(`${apiEndpoint}/${post.id}`);
      // Simulate an error
      throw new Error('ENTER THE SIMULATION');
    } catch (error) {
      if (error.response && error.response.status === 404) {
        alert('Post has already been deleted.')
      } else {
        console.log('Error log:', error);
        alert('Something bad happened. Post could not be deleted.')
      }

      this.setState({ posts: originalPosts })
    }
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
