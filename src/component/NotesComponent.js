import React from 'react';
import { withCookies } from 'react-cookie';
import MainContentsHead from "./mainContentsHead";
import PrintNoteData from "./PrintNoteData";

//Notesを取り出し繰り返し処理で描画
const NotesComponent = (props) => {
    return (
        <div>
            <MainContentsHead pageTitle={props.isPublicPage?"みんなのNote":"My Note"} toUrl={props.isPublicPage?"/AddNotePublic":"/AddNoteMyNote"} buttonName="ADD NOTE"/>
            {props.notesData.map(
                (data) => {
                    return (
                        <PrintNoteData noteData={data} key={data.uuid} setNote={props.setNote} isPublicPage={props.isPublicPage}/>
                    )
                }
            )}

        </div>
    )
}

export default withCookies(NotesComponent);