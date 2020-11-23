import { withCookies } from 'react-cookie';
import {Button } from '@material-ui/core';
import React from 'react';
const DetailDaialogActions = (props) => {
    if(props.isPublicPage){
        return (
            <React.Fragment>
                <Button onClick={props.handleClose} color="primary">
                    閉じる
                </Button>
            </React.Fragment>
        )
    }
    else{
        return (
            <React.Fragment>
                
                <Button onClick={props.handleDelete(props)} color="primary">
                    削除する
                </Button>
                <Button onClick={props.handleClose(props)} color="primary">
                    閉じる
                </Button>
            </React.Fragment>
        )
    }
}

export default withCookies(DetailDaialogActions);