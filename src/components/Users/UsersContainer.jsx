import React from 'react';
import {connect} from "react-redux";
import Users from "./Users";
import {changeFollowAC, setUsersAC, setCurrentPageAC, setTotalUsersCountAC} from "../../redux/usersReducer";

let mapStateToProps = (state) => {
    // debugger;
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
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
        setCurrentPage: (currentPage) => {
            dispatch(setCurrentPageAC(currentPage))
        },
        setTotalUsersCount: (count) => {
            dispatch(setTotalUsersCountAC(count))
        },
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Users)