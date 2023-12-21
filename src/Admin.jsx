import React, {useState} from "react";
import axios from "axios";

const Admin = () => {

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const login = () => {
        axios.post("http://localhost:5000/login", {
            username: username,
            password: password,
        }).then((response) => console.log(response))
    }

    return (
        <div>
            <input type = "text" placehodle = "Username" onChange = {(e) => setUsername(e.target.value)} />
            <input type = "text" placehodle = "Password" onChange = {(e) => setPassword(e.target.value)} />
            <button onClick = {login}> Login </button>
        </div>
    )
}

export default Admin;