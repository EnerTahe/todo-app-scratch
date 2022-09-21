import './App.css';
import { useState } from 'react';
import { toast } from 'react-toastify';

export default function Login({user, setUser}) {
    let [username, setUsername] = useState("");
    let [password, setPassword] = useState("");
    
    
      const userEvent = userNick => {
        setUsername(userNick.target.value)
      }

      const passwordEvent = pw => {
        setPassword(pw.target.value)
      }
      var extraInfo = {  
        method: 'POST',
        Credential: "include",
        headers: {
          "content-type": "application/json"
        }, 
       body: JSON.stringify({ 
         "username": username,
         "password": password
      })
      }

      const checkEvent = () => {
      fetch("http://demo2.z-bit.ee/users/get-token", extraInfo)
      .then(res => res.json())
      .then(
        (result) => {
          if (result.message) {
            toast ("Wrong username or password!")
          } else {
            console.log("result", result)
          setUser(result)
          }
        },
        (error) => {
          console.log("Eu! Mingi error!")
        }
      
      )
      }
    
      return (
        <div className="App">
          <header className="App-header">
              <input onChange={userEvent} placeholder="Kasutajanimi" />
              <input onChange={passwordEvent} type="password" placeholder="Parool" />
              <button onClick={checkEvent}> Logi sisse</button>
          </header>
        </div>
      );
    }