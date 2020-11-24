import React from 'react'
import { withCookies } from 'react-cookie';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';


import NoteDetail from '../NoteDetail';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        margin: 30
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

//Noteデータの描画処理を行う
const PrintNoteData = (props) => {
    const year = props.noteData.updated_at.substring(0, 4);
    const month = props.noteData.updated_at.substring(5, 7);
    const day = props.noteData.updated_at.substring(8, 10);
    


    const classes = useStyles();
    return (
        <React.Fragment>
            <Card className={classes.root}>
                <CardContent>
                    <Typography variant="h5" component="h2">
                        {props.noteData.title}
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        {year}年{month}月{day}日
                   </Typography>
                    <Typography variant="body2" component="p">
                        評価:{props.noteData.like}
                        <br />
                        感想:{props.noteData.body}
                        <br /><br />
                        ユーザ:{props.noteData.user.username}
                    </Typography>
                </CardContent>
                <CardActions>
                    <NoteDetail noteData={props.noteData} setNote={props.setNote} isPublicPage={props.isPublicPage}/>
                </CardActions>
                
            </Card>
        </React.Fragment>
    )
}

export default withCookies(PrintNoteData)