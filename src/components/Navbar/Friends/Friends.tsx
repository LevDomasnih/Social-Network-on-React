import {FC} from 'react';
import classes from './Friends.module.css';
import {friend} from "../../../redux/sidebarReducer";

type PropsType = {
    friends: Array<friend>
}

const Friends: FC<PropsType> = (props) => {

    const friends = props.friends.map((e) => (
        <div key={e.id} className={classes.friendItem}>
            <img src={e.avatar} alt="" />
            <div>
                {e.name}
            </div>
        </div>));

    return (
        <div className={classes.friends}>
            <h3>Friends</h3>
            {friends}
        </div>
    )
};

export default Friends;