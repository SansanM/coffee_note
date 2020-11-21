import React, { useState } from 'react';
import { withCookies } from 'react-cookie';
import axios from 'axios';
import { Button, TextField } from '@material-ui/core';
import classes from "./css/LoginForm.module.css";
import {apiBaseUrl} from "./config";
const Auth = (props) => {
    //Hooks
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [isLogin, setIsLogin] = useState(props.isLogin);
    const [ErrorMessage, setErrorMessage] = useState("");

    //コンポーネント
    const IsLoginChange = () => {
        setUserName("");
        setPassword("");
        setIsLogin(!isLogin);
        setErrorMessage("");
    }

    const SubmitUserData = () => {
        let form_data = new FormData();

        form_data.append('username', userName);
        form_data.append('password', password);
       
        const url = isLogin?`${apiBaseUrl}/api/token/`:`${apiBaseUrl}/note/users/`;
        axios.post(url, form_data, {
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors', 
            credentials: 'include'
        })
        .then( res => {
            props.cookies.set('coffeeNote-token', res.data.token);
            window.location.href = "/";
        })
        .catch( error => {
        setUserName("");
        setPassword("");
        setErrorMessage(error.response.data);
          
        });
    }

    return (
        <div className={classes.loginComponent}>
            
            ユーザ名　
            <TextField 
                onChange={(e) => setUserName(e.target.value)} 
                value = {userName}    
            />
            <br />
            {ErrorMessage.username? ErrorMessage.username:null}
            <br />

            パスワード
            <TextField 
                onChange={(e) => setPassword(e.target.value)}
                value = {password}
                type="password"

            />
            <br />
            {ErrorMessage.password? ErrorMessage.password:null}
            <br />
            <Button onClick={() => SubmitUserData()}>
                {isLogin ? "ログイン" : "アカウントを作成する"}
            </Button><br />
            {ErrorMessage.non_field_errors?　"IDまたはパスワードが間違っています":null}
            <Button onClick={() => IsLoginChange()}>
                {isLogin ? "アカウントの作成はこちら" : "ログインはこちら"}
            </Button>
            
            
        </div>
    )
}

export default withCookies(Auth)