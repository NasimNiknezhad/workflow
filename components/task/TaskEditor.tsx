import React, { useState } from 'react';

// Define an interface for Task
interface Task {
  id: number;
  projectName: string;
  name: string;
  description: string;
  creatorName: string;
  assignedUser: string;
  comments: Array<{
    user: string;
    text: string;
  }>;
}

interface SaveTaskResponse {
  success: boolean;
  message?: string;
}

const users = [
  { id: 1, name: 'User 1' },
  { id: 2, name: 'User 2' },
  { id: 3, name: 'User 3' },
];

const saveTask = async (taskData: Task): Promise<SaveTaskResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Task saved:', taskData);
      resolve({ success: true });
    }, 1000);
  });
};

const TaskEditor = ({ task, onCancel }: { task: Task; onCancel: () => void }) => {
  const [taskName, setTaskName] = useState(task.name);
  const [taskDescription, setTaskDescription] = useState(task.description);
  const [assignedUser, setAssignedUser] = useState(task.assignedUser || '');
  const [comments, setComments] = useState(task.comments || []);

  const handleSave = async () => {
    const updatedTask = {
      ...task,
      name: taskName,
      description: taskDescription,
      assignedUser,
    };

    try {
      const response: SaveTaskResponse = await saveTask(updatedTask);
      if (response.success) {
        alert('Task saved successfully');
      } else {
        alert(`Failed to save task: ${response.message}`);
      }
    } catch (error) {
      console.error('Error saving task:', error);
      alert('An error occurred while saving the task.');
    }
  };

  return (
    <div className="task-editor">
      <div>
        <label htmlFor='projectName'>Project Name</label>
        <input id='projectName' type="text" value={task.projectName} disabled />
      </div>

      <div>
        <label htmlFor='taskName'>Task Name</label>
        <input
        id='taskName'
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor='creator' >Creator</label>
        <input id='creator' type="text" value={task.creatorName} disabled />
      </div>

      <div>
        <label htmlFor='assigendTo'>Assigned User</label>
        <select
        id='assignedTo'
          value={assignedUser}
          onChange={(e) => setAssignedUser(e.target.value)}
        >
          <option value="">Select a user</option>
          {users.map((user) => (
            <option key={user.id} value={user.name}>
              {user.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor='description'>Task Description</label>
        <textarea id='description'
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
        />
      </div>

      <div className="comments-section">
        <label htmlFor='comment'>Comments</label>
        {comments.map((comment, index) => (
          <div key={index} className="comment">
            <strong>{comment.user}</strong>
            <p>{comment.text}</p>
          </div>
        ))}
      </div>

      <div className="button-group">
        <button onClick={handleSave}>Save</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};

const App = () => {
  const task: Task = {
    id: 1,
    projectName: 'Project A',
    name: 'Task 1',
    description: 'This is the task description',
    creatorName: 'Creator User',
    assignedUser: 'User 1',
    comments: [
      { user: 'User A', text: 'This is a comment.' },
      { user: 'User B', text: 'Another comment.' },
    ],
  };

  const handleCancel = () => {
    alert('Edit cancelled');
  };

  return (
    <div>
      <TaskEditor task={task} onCancel={handleCancel} />
    </div>
  );
};

export default App;
