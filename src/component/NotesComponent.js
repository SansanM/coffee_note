import PrintNoteData from "./PrintNoteData"
import React from 'react'
import { withCookies } from 'react-cookie';


const NotesComponent = (props) =>{
    
    return(
        <div>
            {props.notesData.map(
                (data)=>{
                    return(
                        <PrintNoteData noteData={data}/>
                        
                    )
                }
            )}
          
        </div>
    )
}

export default withCookies(NotesComponent);