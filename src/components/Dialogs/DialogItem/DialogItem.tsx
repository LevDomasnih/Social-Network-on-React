import React, {FC} from 'react';
import {Avatar, Menu} from "antd";

type PropsType = {
    avatar: string
    name: string
    id: number
}

const DialogItem: FC<PropsType> = (props) => {
    return (<>
        <Menu.Item
            style={{margin: "30px 15px"}} key={String(props.id)}
            icon={<Avatar src={props.avatar}/>}
            onClick={(e) => console.log(e)}
        >
            {props.name}
        </Menu.Item>
        </>
    )
}



export default DialogItem;