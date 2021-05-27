import React, {FC} from 'react';
import classes from './../Dialogs.module.css'
import {NavLink} from "react-router-dom";

type PropsType = {
    avatar: string
    name: string
    id: number
}

const DialogItem: FC<PropsType> = (props) => {
    let path = '/dialogsElements/' + props.id;

    return (
        <div className={classes.dialog + ' ' + classes.active}>
            <img src={props.avatar}/>
            <NavLink to={path}>{props.name}</NavLink>
        </div>
    )
}



export default DialogItem;