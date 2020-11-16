import React from 'react'
import { withCookies } from 'react-cookie';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        margin:30
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

const PrintNoteData = (props) => {
    const year = props.noteData.updated_at.substring(0, 4);
    const month = props.noteData.updated_at.substring(5, 7);
    const day = props.noteData.updated_at.substring(8, 10);
    const hour = props.noteData.updated_at.substring(11, 13);
    const min = props.noteData.updated_at.substring(14, 16);
    const sec = props.noteData.updated_at.substring(17, 19);

    const classes = useStyles();
    return (
        <div>
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
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">詳しく見る</Button>
                </CardActions>
            </Card>
        </div>
    )
}

export default withCookies(PrintNoteData)