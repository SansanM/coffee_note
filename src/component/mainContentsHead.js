import React from 'react'
import {Link} from "react-router-dom";
import { withCookies } from 'react-cookie';
import style from "../css/pageTitle.module.css"
import { Button } from '@material-ui/core/';

const MainContentsHead = (props) => {
    
    return(
        <div className={style.titlearea}>
            <h2 className={style.title}>{props.pageTitle}</h2>
            <Link className={style.newNote} to={props.toUrl}>
                <Button>
                    {props.buttonName}
                </Button>
            </Link>
        </div>
    )
}

export default MainContentsHead