import PrintNoteData from "./PrintNoteData"
import React from 'react'
import { withCookies } from 'react-cookie';


const NotesComponent = (props) =>{
    
    return(
        <div>
            <h2>My Note</h2>
            {props.notesData.map(
                (data)=>{
                    return(
                        <React.Fragment>
                            
                            <PrintNoteData noteData={data}/>
                        </React.Fragment>
                    )
                }
            )}
          
        </div>
    )
}

export default withCookies(NotesComponent);