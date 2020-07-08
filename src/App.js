import React, { Component } from "react";
import httpService from "./services/httpService";
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import "./App.css";

const apiEndpoint = 'https://jsonplaceholder.typicode.com/posts';

class App extends Component {
  state = {
    posts: []
  };

  async componentDidMount() {
    const { data: posts } = await httpService.get(apiEndpoint);
    this.setState({ posts })
  }

  handleAdd = async () => {
    const data = {
      body: "Body of the new post.",
      title: "New Post",
    }
    const { data: post } = await httpService.post(apiEndpoint, data)
    this.setState({ posts: [post, ...this.state.posts] })
    toast("New post added!");
  };

  handleUpdate = async (post) => {
    const posts = [...this.state.posts];
    const index = posts.indexOf(post);
    post.title = 'Updated post';

    const { data: updatedPost } = await httpService.put(`${apiEndpoint}/${post.id}`, post);
    posts[index] = updatedPost;
    this.setState({ posts });
    toast("Post updated!");
  };

  handleDelete = async (post) => {
    const originalPosts = this.state.posts;

    const posts = [...this.state.posts].filter((p) => p.id !== post.id);
    this.setState({ posts });
    toast("Post deleted!");

    try {
      await httpService.delete(`${apiEndpoint}/${post.id}ss`);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast('Post has already been deleted.')
      }
      this.setState({ posts: originalPosts })
    }
  };

  render() {
    return (
      <React.Fragment>
        <ToastContainer />

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
