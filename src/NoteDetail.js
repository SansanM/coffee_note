import Axios from 'axios';
import React from 'react';
import { withCookies } from 'react-cookie';
import DateTimePrint from "./component/DateTimePrtint";
import {apiBaseUrl} from "./config";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@material-ui/core';

//詳細ダイアログ内部の動作　公開状況の変更　削除ができる
const NoteDetail = (props) => {
    let url ="";
    if(props.noteData.uuid){
        url = `${apiBaseUrl}/note/note/${props.noteData.uuid}`;
    }
    const data = props.noteData
    const [open, setOpen] = React.useState(false);
    
    const baseUrl = `${apiBaseUrl}/note/note/`;
    const token = props.cookies.get('coffeeNote-token');
    let isPublic = false;
    if(data.public==="true"){
        isPublic = true;
    }
    else{
        isPublic = false;
    }


    
    const getList = (props) => {
        const url = `${apiBaseUrl}/note/note/`;
        const token = props.cookies.get('coffeeNote-token');
        Axios.get(url, {
            headers: {
                "Authorization": "jwt " + token
            },
            mode: 'cors', 
            credentials: 'include'
        })
            .then(res => {
                //全体のNoteデータをリロード　削除と変更を反映
                props.setNote(res.data);
            })
            .catch(error => {
                console.log(error.response.data);
            });
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    //公開と非公開の切り替えを行う
    const handlePublicChange = (props) => {
        let form_data = new FormData();
        form_data.append('title', data.title);
        //
        if(data.body){
            form_data.append('body', data.body);
        }
        else{
            form_data.append('body',"");
        }
        form_data.append('sanmi', data.sanmi);
        form_data.append('nigami', data.nigami);
        form_data.append('like', data.like);
        form_data.append('user', data.user.username);
        console.log(data.user.username)
        if(isPublic){
            form_data.append('public',"false")
        }
        else{
            form_data.append('public',"true");
        }
        
        Axios.post(baseUrl,form_data,{
            
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "jwt " + token
            },
            mode: 'cors', 
            credentials: 'include'
        })
            .then(res => {
                handleDelete(props);
                setOpen(false);
            })
            .catch(error => {
                console.log(error.response.data)
            });
    }
    const handleDelete = () => {
        Axios.delete(url, {
            headers: {
                "Authorization": "jwt " + token
            },
            mode: 'cors', 
            credentials: 'include'
        })
            .then(res => {
                setOpen(false);
                getList(props);
            })
            .catch(error => {
                console.log(error.response.data)
            });
    }
    //自分のNoteに対して行える操作
    const PrintMyNoteDetail = () =>{
        return(
            <React.Fragment>
                <Button onClick={handlePublicChange} color="primary">
                        {isPublic?"公開をやめる":"公開する"}
                </Button>
                <Button onClick={handleDelete} color="primary">
                    削除する
                </Button>
                <Button onClick={handleClose} color="primary">
                    閉じる
                </Button>
            </React.Fragment>
        )
    }
    //他人のNoteに対して行える操作
    const PrintPublicNoteDetail = () =>{
        return(
            <Button onClick={handleClose} color="primary">
                    閉じる
            </Button>
        )
    }

    return (
        <React.Fragment>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                詳細を見る
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-dialog-title"
                aria-describedby="simple-dialog-description"
            >
                <DialogTitle id="simple-dialog-title">{data.title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="simple-dialog-description">
                        酸味:{data.sanmi}<br />
                        苦味:{data.nigami}<br />
                        評価:{data.like}<br />
                        感想:{data.body}<br />
                        公開状況:{isPublic?"公開中":"未公開"}<br />
                        作成者:{data.user?data.user.username:null}<br />
                        <DateTimePrint data={data} /><br />
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    {props.isPublicPage?<PrintPublicNoteDetail />:<PrintMyNoteDetail />}
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}

export default withCookies(NoteDetail);