import "./App.css";
import { useEffect, useState } from "react";
import produce from "immer";

export default function TodoList({ user, setUser }) {
  let [todoItem, setTodoItem] = useState("");
  let [tasks, setTasks] = useState([]);


  var extraGetInfo = {
    method: "GET",
    Credential: "include",
    headers: {
      "content-type": "application/json",
      Authorization: "Bearer " + user.access_token,
    },
  };
  var sendTaskToApi = {
    method: "POST",
    Credential: "include",
    headers: {
      "content-type": "application/json",
      Authorization: "Bearer " + user.access_token,
    },
    body: JSON.stringify({
      title: todoItem,
      desc: "",
    }),
  };
  var sendDelete = {
    method: "DELETE",
    Credential: "include",
    headers: {
      "content-type": "application/json",
      Authorization: "Bearer " + user.access_token,
    },
    body: JSON.stringify({
      title: todoItem,
      desc: "",
    }),
  };

  useEffect(() => {
    fetch("http://demo2.z-bit.ee/tasks", extraGetInfo)
      .then((res) => res.json())
      .then((result) => {
        setTasks(result);
        console.log("first", result)
      });
  }, []);

  const eventHandler = (event) => {
    setTodoItem(event.target.value);
  };
  const updateStatus = (task, index) => {
    const newState = produce(tasks, (draft) => {
      draft[index].marked_as_done = !draft[index].marked_as_done;
    });
    setTasks(newState);
    console.log("newState",newState)
    let id = task.id;
    fetch("http://demo2.z-bit.ee/tasks/" + id, {
      method: "PUT",
      Credential: "include",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + user.access_token,
      },
      body: JSON.stringify(newState[index]),
    })
    .then(res => res.json())
      .then((response) => {
        console.log("tasks", newState);
        console.log("response", response)
        //setTasks(newState);
      });
  };

  const addTask = () => {
    console.log(todoItem);
    fetch("http://demo2.z-bit.ee/tasks", sendTaskToApi)
      .then((res) => res.json())
      .then((result) => {
        let copy = [...tasks, result];
        console.log("copy", copy);
        setTasks(copy);
      });
  };

  const deleteTask = (task) => {
    let id = task.id;
    console.log("id", id)
    fetch("http://demo2.z-bit.ee/tasks/" + id, sendDelete)
      .then((result) => {
        window.location.reload(false);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <input onChange={eventHandler} />
        <button onClick={addTask}> Add task</button>
        <br />
        Sul on vaja teha veel asjad:
        <ul>
          {tasks.map((task, index) => (
            <li>
              <input
                type="checkbox"
                checked={task.marked_as_done}
                onChange={() => updateStatus(task, index)}
              />{" "}
              {index}. {task.title}{" "}
              <button onClick={() => deleteTask(task)}>Delete</button>
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
}
