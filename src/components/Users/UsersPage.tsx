import React from 'react';
import Users from "./Users";
import {useSelector} from "react-redux";
import {getIsFetching} from "../../redux/usersSelectors";
import {Spin} from "antd";

const UsersPage = () => {
    const isFetching = useSelector(getIsFetching)

    return (
        <Spin style={{position: "fixed", maxHeight: "none"}} spinning={isFetching}>
            <Users/>
        </Spin>
    )
}

export default UsersPage