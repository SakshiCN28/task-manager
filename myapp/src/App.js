import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const API = "http://localhost:5000";

  const fetchTasks = async () => {
    const res = await axios.get(API + "/tasks");
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async () => {
    if (!title) return;
    await axios.post(API + "/tasks", { title });
    setTitle("");
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(API + "/tasks/" + id);
    fetchTasks();
  };

  const completeTask = async (id) => {
    await axios.put(API + "/tasks/" + id);
    fetchTasks();
  };

  return (
    <div style={{
      textAlign: "center",
      marginTop: "50px",
      maxWidth: "400px",
      margin: "auto",
      border: "1px solid gray",
      padding: "20px",
      borderRadius: "10px"
    }}>
      <h2>Task Manager</h2>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter task"
      />
      <button onClick={addTask}>Add</button>

      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            {task.title} - {task.status}
            <br />
            <button onClick={() => deleteTask(task._id)}>Delete</button>
            <button onClick={() => completeTask(task._id)}>Done</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;