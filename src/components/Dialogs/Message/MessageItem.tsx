import {FC} from 'react';
import classes from './../Dialogs.module.css'

type PropsType = {
    message: string
}

const MessageItem: FC<PropsType> = (props) => {
    return <div className={classes.message}>{props.message}</div>;
}

export default MessageItem;