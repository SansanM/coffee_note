import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import { withCookies } from 'react-cookie';
import DateTimePrint from "./component/DateTimePrtint";
import {apiBaseUrl} from "./config";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@material-ui/core';
import DetailDaialogActions from "./component/DetailDaialogActions"

const NoteDetail = (props) => {
    
    const uuid = props.uuid;
    const [data, setData] = useState([]);
    const url = `${apiBaseUrl}/note/note/${uuid}`;
    const baseUrl = `${apiBaseUrl}/note/note/`;
    const token = props.cookies.get('coffeeNote-token');
    let isPublic = false;
    if(data.public=="true"){
        isPublic = true;
    }
    else{
        isPublic = false;
    }
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const GetList = (props) =>{
        Axios.get(url, {
            headers: {
                "Authorization": "jwt " + token
            },
            mode: 'cors', 
            credentials: 'include'
        })
            .then(res => {
                props.setNote(res.data);
            })
            .catch(error => {
                console.log(error);
            });
    }
    const handlePublicChange = (props) => {
        let form_data = new FormData();
        form_data.append('title', data.title);
        if(data.note){
            form_data.append('body', data.note);
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
    const handleDelete = (props) => {
        Axios.delete(url, {
            headers: {
                "Authorization": "jwt " + token
            },
            mode: 'cors', 
            credentials: 'include'
        })
            .then(res => {
                setOpen(false);
                GetList(props);
            })
            .catch(error => {
                console.log(error)
            });
    }
    useEffect((props) => {
        Axios.get(url, {
            headers: {
                "Authorization": "jwt " + token
            },
            mode: 'cors', 
            credentials: 'include'
        })
            .then(res => {
                setData(res.data[0]);
            })
            .catch(error => {
                console.log(error);
            });
    }, [])

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
                        メモ:{data.body}<br />
                        <br />
                        <DateTimePrint data={data} /><br />
                        作成者:{data.user?data.user.username:null}<br />
                        公開状況:{isPublic?"公開中":"未公開"}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <DetailDaialogActions 
                        props={props}
                        isPublicPage={props.isPublicPage}
                        handlePublicChange={handlePublicChange}
                        handleDelete={handleDelete}
                        handleClose={handleClose}
                        isPublic={isPublic}
                    />
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}

export default withCookies(NoteDetail);