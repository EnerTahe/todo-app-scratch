import './App.css';
import { useState } from 'react';

export default function Tester({user, setUser}) {

  var accesskey = {  
    method: 'get', 
   headers:{ 
     "Authorization": "Bearer tYoDiB-dX0b15glZ1QYR-JdpzhKa5K_R"
  }
  }

  const checkEvent = () => {
    fetch("http://demo2.z-bit.ee/tasks", accesskey)
      .then(res => res.json())
      .then(
        (result) => {
          setUser("Tore");
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setUser(null)
        }
      )
      console.log(user)
      }
    
      return (
        <div className="App">
          <header className="App-header">
              <button onClick={checkEvent}>Test</button>
          </header>
        </div>
      );
    }