import "./App.css";
import { useState } from "react";
import TodoList from "./TodoView";
import Login from "./Login";
import Register from "./Register";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useLocalStorageState from 'use-local-storage-state'

function App() {
  let [user, setUser] = useLocalStorageState("user", null);
  const greetingForRandom = <p>Tere! Palun logi sisse!</p>;
  const userGreeting = <p>Tere {user?.username}!</p>;

  return (
    <div className="App">
      <header className="App-header">
        {!user && greetingForRandom}
        {user && userGreeting}

        {!user && <Login user={user} setUser={setUser} />}
        {user && <TodoList user={user} setUser={setUser} />}  

      </header>
        <ToastContainer />
    </div>
  );
}

export default App;
