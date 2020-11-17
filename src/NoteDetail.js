import Axios from 'axios'
import React, { useState, useEffect } from 'react'
import { withCookies } from 'react-cookie';
import DateTimePrint from "./component/DateTimePrtint"

import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@material-ui/core';


const NoteDetail = (props) => {
    const uuid = props.uuid
    const [data, setData] = useState([])
    const url = "http://127.0.0.1:8000/note/note/" + uuid
    const token = props.cookies.get('coffeeNote-token');

    const getList = (props) => {
        const url = "http://127.0.0.1:8000/note/note";
        const token = props.cookies.get('coffeeNote-token');
        Axios.get(url, {
            headers: {
                "Authorization": "jwt " + token
            }
        })
            .then(res => {
                props.setNote(res.data)
                console.log("success")
            })
            .catch(error => {
                console.log(error.response.data)
            });
    }

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = () => {
        Axios.delete(url, {
            headers: {
                "Authorization": "jwt " + token
            }
        })
            .then(res => {
                setOpen(false);
                getList(props)
            })
            .catch(error => {
                console.log(error.response.data)
            });
    }
    useEffect(() => {
        Axios.get(url, {
            headers: {
                "Authorization": "jwt " + token
            }
        })
            .then(res => {
                setData(res.data[0])
            })
            .catch(error => {
                console.log(error.response.data)
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
                        <DateTimePrint data={data} />
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDelete} color="primary">
                        削除する
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        閉じる
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}

export default withCookies(NoteDetail);