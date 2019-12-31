import React, { Component } from 'react';
import { sendNotification } from '../util';

class Todo extends Component {
  constructor() {
    super();
    this.state = {
      tasks: [],
      fetchTasksSuccess: false,
      fetchTasksAttempts: 0
    };
  }

  componentDidMount() {
    this.pollForTasks();
  }

  componentDidUpdate() {
    this.pollForTasks();
  }

  pollForTasks() {
    if (
      this.state.fetchTasksSuccess ||
      this.state.fetchTasksAttempts > 3 ||
      this.props.sessionKey == null
    ) {
      return;
    }
    fetch('/api/v1/tasks/list', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ sessionKey: this.props.sessionKey })
    })
      .then(result => result.json())
      .then(response => {
        if (!response.success) {
          sendNotification('error', response.message);
          this.setState({
            fetchTasksAttempts: this.state.fetchTasksAttempts + 1
          });
        } else {
          this.setState({ tasks: response.data, fetchTasksSuccess: true });
        }
      });
  }

  render() {
    return (
      <div className='container'>
        <h1 className='my-5 text-center'>My TODO List</h1>
        <div className='row justify-content-center'>
          <div className='col-8'>
            <ul className='list-group'>
              {this.state.tasks.map(task => {
                return (
                  <button
                    key={task._id}
                    className='list-group-item list-group-item-action border mb-3'
                  >
                    <h4>
                      {task.title}
                      <br></br>

                      {task.description !== null ? (
                        <small>{task.description}</small>
                      ) : (
                        <small>&nbsp;</small>
                      )}
                    </h4>
                  </button>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Todo;
