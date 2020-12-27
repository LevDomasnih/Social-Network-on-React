import React from 'react';
import {connect} from "react-redux";
import Users from "./Users";
import {
    setCurrentPage,
    getUsersThunkCreator,
    unfollowUsers,
    followUsers,
} from "../../redux/usersReducer";
import Preloader from "../common/Preloader/Preloader";

class UsersContainer extends React.Component {
    componentDidMount() {
        this.props.getUsersThunkCreator(this.props.currentPage, this.props.pageSize)
    }

    onPageChanged = (page) => {
        this.props.setCurrentPage(page);
        this.props.getUsersThunkCreator(page, this.props.pageSize)
    }

    render() {
        return <>
            {this.props.isFetching ? <Preloader/> : null}
            <Users totalUsersCount={this.props.totalUsersCount}
                   pageSize={this.props.pageSize}
                   currentPage={this.props.currentPage}
                   onPageChanged={this.onPageChanged}
                   users={this.props.users}
                   followingInProgress={this.props.followingInProgress}
                   unfollowUsers={this.props.unfollowUsers}
                   followUsers={this.props.followUsers}
            />
        </>
    }
}

let mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress
    }
}

export default connect(mapStateToProps, {
    setCurrentPage,
    getUsersThunkCreator,
    unfollowUsers,
    followUsers,
})(UsersContainer)