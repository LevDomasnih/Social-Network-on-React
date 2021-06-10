import React, { FC } from "react"
import { Link } from "react-router-dom"
import { Avatar, Button, Col, Menu, Row } from "antd"
import { UserOutlined } from "@ant-design/icons"

import { useDispatch, useSelector } from "react-redux"
import { AppStateType } from "../../redux/reduxStore"
import { logout } from "../../redux/authReducer"
import { Header } from "antd/lib/layout/layout"

type PropsType = {}

const AppHeader: FC<PropsType> = () => {

    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)
    const login = useSelector((state: AppStateType) => state.auth.login)
    const photo = useSelector((state: AppStateType) => state.profilePage.ownProfile?.photos.small)

    const dispatch = useDispatch()

    const logoutCb = () => {
        dispatch(logout())
    }

    return (
        <Header className="header">
            <div className="logo"/>
            <Row>
                <Col span={18}>
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
                        <Menu.Item key="1">nav 1</Menu.Item>
                    </Menu>
                </Col>
                {isAuth ?
                    <>
                        <Col span={1}>
                            <Avatar alt={login || ""}
                                    icon={<UserOutlined/>}
                                    src={photo}
                            />
                        </Col>
                        <Col span={5}>
                            <Button onClick={logoutCb}>Log out</Button>
                        </Col>
                    </>
                    : (
                        <Col span={1}>
                            <Button>
                                <Link to={"/login"}>Login</Link>
                            </Button>
                        </Col>
                    )}
            </Row>
        </Header>
    )
}

export default AppHeader