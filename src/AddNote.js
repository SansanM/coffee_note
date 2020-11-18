import Axios from 'axios'
import React, { useState } from 'react';
import { withCookies } from 'react-cookie';
import { Link } from "react-router-dom";
import { Button, TextField } from '@material-ui/core/';

import Formstyle from "./css/AddNoteForm.module.css"
import style from "./css/pageTitle.module.css"

import { makeStyles } from '@material-ui/core/styles';

//フォーム同士の隙間の設定
const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));
//新規noteの投稿
const AddNote = (props) => {
    const [title, setTitle] = useState("");
    const [note, setNote] = useState("");
    const [sanmi, setSanmi] = useState(3);
    const [nigami, setNigami] = useState(3);
    const [like, setLike] = useState(3);
    const classes = useStyles();


    //投稿の非同期通信の処理
    const NotePost = () =>{

        const token = props.cookies.get('coffeeNote-token');
        const url = "http://127.0.0.1:8000/note/note/";

        let form_data = new FormData();
        form_data.append('title', title);
        form_data.append('body', note);
        form_data.append('sanmi', sanmi);
        form_data.append('nigami', nigami);
        form_data.append('like', like);

        Axios.post(url,form_data, {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "jwt " + token,
            },
        })
        .then( res => {
            console.log(res)
            window.location.href = "/";
        })
        .catch( e =>{console.log(e)})
    } 

    return (
        <div>
            <div className={style.titlearea}>
                <h2 className={style.title}>Add Note</h2>
                <Link className={style.newNote} to={"/home"}>
                    <Button>
                        My Note
                    </Button>
                </Link>
            </div>
            <div className={Formstyle.root +" "+ classes.root}>
                <TextField
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    label="タイトル"
                    variant="outlined"
                /><br />
                <TextField
                    onChange={(e) => setSanmi(e.target.value)}
                    value={sanmi}
                    type="number"
                    inputProps={{min: 0 , max:5}} 
                    label="酸味"
                    variant="outlined"
                /><br />
                 <TextField
                    onChange={(e) => setNigami(e.target.value)}
                    value={nigami}
                    type="number"
                    inputProps={{min: 0 , max:5}} 
                    label="苦味"
                    variant="outlined"
                /><br />
                 <TextField
                    onChange={(e) => setLike(e.target.value)}
                    value={like}
                    type="number"
                    inputProps={{min: 0 , max:5}} 
                    label="評価"
                    variant="outlined"
                /><br />
                 <TextField
                    onChange={(e) => setNote(e.target.value)}
                    value={note}
                    label="メモ"
                    variant="outlined"
                /><br />
                <Button onClick ={NotePost}>
                    投稿する
                </Button>
            </div>
        </div>
    )
}

export default withCookies(AddNote);