import PrintNote from "./printNote"
import React from 'react'
import { withCookies } from 'react-cookie';

const NotesComponent = (props) =>{

    return(
        <div>
            {props.notesData.forEach(
                (data)=>{
                    <PrintNote noteData={data}/>
                }
            )}
          
        </div>
    )
}

export default withCookies(NotesComponent);