import React from 'react';
import {connect} from "react-redux";
import Users from "./Users";
import {changeFollowAC, setUsersAC} from "../../redux/usersReducer";

let mapStateToProps = (state) => {
    return {
        users: state.userPage.users
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        changeFollow: (userId) => {
            dispatch(changeFollowAC(userId))
        },
        setUsers: (users) => {
            dispatch(setUsersAC(users))
        },
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Users)