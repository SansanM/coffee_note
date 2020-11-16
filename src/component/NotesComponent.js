import React from 'react'
import {Link} from "react-router-dom";
import { withCookies } from 'react-cookie';
import { Button } from '@material-ui/core/';
import style from "../css/pageTitle.module.css"

import PrintNoteData from "./PrintNoteData"

const NotesComponent = (props) => {
    return (
        <div>
            <div className={style.titlearea}>
                <h2 className={style.title}>My Note</h2>
                <Link className={style.newNote} to={"/AddNote"}>
                    <Button>
                        Add Note
                    </Button>
                </Link>

            </div>
            {props.notesData.map(
                (data) => {
                    return (
                        <PrintNoteData noteData={data} key={data.uuid} />
                    )
                }
            )}

        </div>
    )
}

export default withCookies(NotesComponent);