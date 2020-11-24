import Axios from 'axios';
import React, { useState } from 'react';
import { withCookies } from 'react-cookie';
import { Button, TextField ,Switch , FormControlLabel} from '@material-ui/core/';
import {apiBaseUrl} from "./config";
import Formstyle from "./css/AddNoteForm.module.css"
import MainContentsHead from "./component/mainContentsHead";
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
    console.log(props.isPublic)
    const [title, setTitle] = useState("");
    const [note, setNote] = useState("");
    const [sanmi, setSanmi] = useState(3);
    const [nigami, setNigami] = useState(3);
    //遷移元のページによってデフォルトが変わる
    //MyNoteからはfalse　みんなのNoteからはtrueがデフォルト
    const [isPublic, setIsPublic] = useState(props.isPublic);
    const [like, setLike] = useState(3);
    const classes = useStyles();
    
    const [ErrorMessage, setErrorMessage] = useState("");

    //投稿の非同期通信の処理
    const NotePost = () =>{

        const token = props.cookies.get('coffeeNote-token');
        const url = `${apiBaseUrl}/note/note/`;

        let form_data = new FormData();
        form_data.append('title', title);
        form_data.append('body', note);
        form_data.append('sanmi', sanmi);
        form_data.append('nigami', nigami);
        form_data.append('like', like);
        if(isPublic){
            form_data.append('public',"true")
        }
        else{
            form_data.append('public',"false");
        }
        Axios.post(url,form_data, {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "jwt " + token,
            },
            mode: 'cors', 
            credentials: 'include'
        })
        .then( res => {
            console.log(res)
            if(props.isPublic){
                window.location.href = "/Public";
            }
            else{
                window.location.href = "/";
            }
        })
        .catch( error =>{
            console.log(error.response.data);
            setErrorMessage(error.response.data);
        })
    } 
    //入力フォーム
    return (
        <div>
            <MainContentsHead pageTitle="Add Note" toUrl={props.isPublic?"/Public":"/"} buttonName={props.isPublic?"みんなのNote":"My Note"}/>
            <div className={Formstyle.root +" "+ classes.root}>
                <TextField
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    label="タイトル"
                    variant="outlined"
                    helperText={ErrorMessage.title}
                /><br />
                <TextField
                    onChange={(e) => setSanmi(e.target.value)}
                    value={sanmi}
                    type="number"
                    inputProps={{min: 1 , max:5}} 
                    label="酸味"
                    variant="outlined"
                    helperText={ErrorMessage.sanmi}
                /><br />
                <TextField
                    onChange={(e) => setNigami(e.target.value)}
                    value={nigami}
                    type="number"
                    inputProps={{min: 1 , max:5}} 
                    label="苦味"
                    variant="outlined"
                    helperText={ErrorMessage.nigami}
                /><br />
                <TextField
                    onChange={(e) => setLike(e.target.value)}
                    value={like}
                    type="number"
                    inputProps={{min: 1 , max:5}} 
                    label="評価"
                    variant="outlined"
                    helperText={ErrorMessage.like}
                /><br />
                <TextField
                    onChange={(e) => setNote(e.target.value)}
                    value={note}
                    multiline
                    label="メモ"
                    variant="outlined"
                    helperText={ErrorMessage.note}
                /><br />
            
                <FormControlLabel
                    control={ <Switch
                        onChange={(e) => setIsPublic(e.target.checked)}
                        checked={isPublic}
                    />}
                    label="公開する"
                />
                
               <br />
                <Button onClick ={NotePost}>
                    投稿する
                </Button>
            </div>
        </div>
    )
}

export default withCookies(AddNote);