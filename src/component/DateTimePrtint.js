import React from 'react'
import { withCookies } from 'react-cookie';

//日時の表示関数（非同期通信が終わるまで空データを返す）
const DateTimePrint = (props) => {
    if(props.data.updated_at){
        const year = props.data.updated_at.substring(0, 4);
        const month = props.data.updated_at.substring(5, 7);
        const day = props.data.updated_at.substring(8, 10);
        const hour = props.data.updated_at.substring(11, 13);
        const min = props.data.updated_at.substring(14, 16);
        return(
            <React.Fragment>
                作成日時:{year}年{month}月{day}日{hour}時{min}分
            </React.Fragment>
        )
    }
    return(
        <React.Fragment>
        </React.Fragment>
    )
}
export default withCookies(DateTimePrint)