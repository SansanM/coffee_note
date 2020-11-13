import React,{useEffect, useCallback} from "react";
import ReactDOM from "react-dom";
import {Link} from "react-router-dom";
import {HashRouter as Router, Route } from 'react-router-dom';
import {Button, TextField} from '@material-ui/core';
import {useState} from "react";
//import { withRouter } from 'react-router';

const EnterButton = () =>{
    return(
        <Button >
                    入室する
        </Button>
    );
}
const LeaveButton = () =>{
    return(
        <Button >
                    退室する
        </Button>
    );
}
const GoToCgatRoom = (props) =>{
    const numberFlag = Number.isInteger(props.id);
    if (props.id < 0 || 100 < props.id || !numberFlag){
        return(
            <EnterButton />
        );

    }
    return(
        <Link to={"/chatRoom/"+String(props.id)}>
            <EnterButton />
        </Link>
    );
}

const LeaveChatRoom =() =>{
    return(
        <Link to="/">
            <LeaveButton />
        </Link>
    )
}

const Home = (props) =>{
    return(
        <div>
        入室したい部屋番号を0~100の間で入力してください<br/>
            <TextField 
                value={props.id}
                onChange={props.onChange}
                label="Number"
                type="number"
                InputLabelProps={{
                shrink: true,
                }}
            />
            <GoToCgatRoom id={props.id} />
        </div>
    )
}


const DeleateComment =(props) =>{
    const url = `https://sankawa.site/api/chatdata/`+String(props.Data.comment_id)+"/"
    fetch(url,{
        method:"DELETE",
    })
    .then( res => res.text() )
    .then( res => {
        console.log("deleate sucseess");
        props.GetChatRoomData(props.Data.room_id,props.setChatDatas)
    })
    .catch((error) =>{
        console.error("Error",error)
    })
}

const PrintChatData = (props) =>{
    if(props.Data.public ===0){
        return
    }
    const year = props.Data.create_at.substring(0,4);
    const month = props.Data.create_at.substring(5,7);
    const day = props.Data.create_at.substring(8,10);
    const hour = props.Data.create_at.substring(11,13);
    const min = props.Data.create_at.substring(14,16);
    const sec = props.Data.create_at.substring(17,19);
    return(
        <div className ="commentPrint">
            Author:{props.Data.author}<br />
            Text :{props.Data.text} <br />
            create : {year}年{month}月{day}日{hour}時{min}分{sec}秒
            <Button onClick={() =>DeleateComment(props)}>
                削除する
            </Button>
            <br/><br/>
        </div>
    )
}

const PrintChatDatas = (props) =>{
    return(
        <div>
            {props.Datas.map(
                (Data) =>
                <PrintChatData 
                    key={Data.comment_id}
                    Data={Data}
                    setChatDatas={props.setChatDatas}
                    GetChatRoomData={props.GetChatRoomData}
                />
            )}

        </div>
    )
}

const Add =(props) =>{
    
    
    if(props.AddTextData ===""){
        return;
    }
    let authorData=props.AddAuthorData;
    if(authorData ===""){
        authorData = "名無し"
    }
    const data = {
        text:props.AddTextData,
        public:1,
        author:authorData,
        room_id:props.roomId
    }

    const url = `https://sankawa.site/api/chatdata/?room_id=`
    fetch(url+String(props.roomId),{
        method:"POST",
        headers:{
            'Content-Type': 'application/json',
        },
        body:JSON.stringify(data)
    })
    .then( res => res.json() )
    .then( res => {
        console.log("sucseess");
        props.reloadData(props.roomId,props.setChatDatas)
        props.setAddAuthor("")
        props.setAddChat("")

    })
    .catch((error) =>{
        console.error("Error",error)
    })
}

const AddText =(props)=>{
    
    return(
        <div>
            <TextField
                value={props.AddAuthorData}
                label="Author"
                fullWidth
                onChange={props.onAuthorChange}
            />
            <TextField
                value={props.AddTextData}
                label="Text"
                fullWidth
                onChange={props.onChange}
            />
            <br />
            <br />
            <Button variant="contained" type="submit" onClick={() =>Add(props)}>
                投稿する
            </Button>
        </div>
    )
}



const ChatRoom =(props) =>{
    const [chatDatas,setChatDatas] = useState([])
    const [AddTextData,setAddChat] =useState("")
    const [AddAuthorData,setAddAuthor] =useState("")

    const handleAddTextChange =(e) =>{
        const newText = e.target.value;
        setAddChat(newText)
    
    }
    const handleAuthorChange =(e) =>{
        const newAuthor = e.target.value;
        setAddAuthor(newAuthor)
    }

    const GetChatRoomData = useCallback((id,setChatDatas) =>{
        const url = `https://sankawa.site/api/chatdata/?room_id=`
        fetch(url+String(id),{
            headers:{
                'Content-Type': 'application/json',
            },
            mode: 'cors', 
            credentials: 'include'

        })
            .then( res => res.json() )
            .then( res => {
            setChatDatas(res);})
    },[]);


    useEffect(()=>{
        GetChatRoomData(props.match.params.id,setChatDatas)
      },[GetChatRoomData,props.match.params.id])


    return(
        <div>
            chat room {props.match.params.id}です
            <br />
            <LeaveChatRoom />
            <PrintChatDatas 
                Datas={chatDatas} 
                setChatDatas={setChatDatas}
                GetChatRoomData={GetChatRoomData}
            />
            <AddText 
                roomId={props.match.params.id}
                AddAuthorData={AddAuthorData}
                AddTextData={AddTextData} 
                onChange={handleAddTextChange}
                onAuthorChange={handleAuthorChange}
                reloadData={GetChatRoomData}
                setChatDatas={setChatDatas}
                setAddAuthor={setAddAuthor}
                setAddChat={setAddChat}
            />
            
        </div>
        
        )
}

const APP = () =>{
    const [roomId,setRoomId] =useState(0)
    
    

    const handleRoomChange = (e) =>{
        if(e.target.value ===""){
            setRoomId("");
            return 
        }
        const newRoomId = Number(e.target.value);
        setRoomId(newRoomId);

    }

    return(
        <div>
            <Router basename={process.env.PUBLIC_URL}>
                <Route exact path ="/" render={() =>
                    <Home 
                        id = {roomId}
                        onChange={handleRoomChange}
                    />}
                />
                <Route path ="/chatRoom/:id" component={ChatRoom}/>
            </Router>
            
        </div>
    )
}

ReactDOM.render(
    <APP />,
    document.getElementById("root")
);