import React, {useState} from 'react';
import LoginForm from './LoginForm'
import axios from 'axios'
import {LOGIN_URL} from "../../api/url-const";


const LoginContainer = ({history}) => {


    const initialState = {
        username: "",
    }
    const [user, setUser] = useState(initialState);

    const handleLogin = (formData) => {

        const successLogin = (response) => {
            if (response.data) {
                sessionStorage.setItem("user", JSON.stringify(response.data));
                history.push("/voucher-monitoring");
            }
        };

        //api call
        axios.post(LOGIN_URL, null,{params:{username: formData.username}})
            .then((response) => successLogin(response))
            .catch(error => console.log("error:" + error))
    };

    return (
        <div className="content-section implementation">
            <LoginForm record={user} setUser={setUser} handleSave={handleLogin}/>
        </div>
    )
};

export default LoginContainer;