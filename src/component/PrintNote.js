import React from 'react'


const PrintNote = (props) =>{
    console.log("props")
    return(
        <div>
            {console.log(props.noteData.body)}<br />a
        </div>
    )
}

export default PrintNote