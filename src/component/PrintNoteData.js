import React from 'react'
import { withCookies } from 'react-cookie';

const PrintNoteData = (props) =>{
    const year = props.noteData.updated_at.substring(0,4);
    const month = props.noteData.updated_at.substring(5,7);
    const day = props.noteData.updated_at.substring(8,10);
    const hour = props.noteData.updated_at.substring(11,13);
    const min = props.noteData.updated_at.substring(14,16);
    const sec = props.noteData.updated_at.substring(17,19);
    return(
        <div>
            タイトル  {props.noteData.title}<br/>
            苦味  {props.noteData.nigami}<br/>
            酸味  {props.noteData.sanmi}<br/>
            好み  {props.noteData.like}<br/>
            一言メモ  {props.noteData.body}<br/>
            作成日  {year}年{month}月{day}日{hour}時{min}分{sec}秒<br/><br />
        </div>
    )
}

export default withCookies(PrintNoteData)