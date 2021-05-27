import React, {FC} from 'react';
import classes from './Header.module.css';
import {NavLink} from "react-router-dom";

export type MapPropsTypeHeader = {
    login: string | null
    isAuth: boolean
}

export type DispatchPropsTypeHeader = {
    logout: () => void
}

const Header: FC<MapPropsTypeHeader & DispatchPropsTypeHeader> = (props) => {
    return (
        <header className={classes.header}>
            <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/320px-React-icon.svg.png'/>
            <div className={classes.loginBlock}>
                { props.isAuth ? <div>{props.login} - <button onClick={props.logout}>Log out</button></div>
                    : <NavLink to={'/login'}>Login</NavLink> }
            </div>
        </header>
    )
};

export default Header;