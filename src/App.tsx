import "./App.css"
import React from "react"
import News from "./components/News/News"
import Music from "./components/Music/Music"
import Settings from "./components/Settings/Settings"
import { BrowserRouter, Link, NavLink, Redirect, Route, Switch, withRouter } from "react-router-dom"
import { connect, Provider } from "react-redux"
import { compose } from "redux"
import { initializeApp } from "./redux/appReducer"
import Preloader from "./components/common/Preloader/Preloader"
import store, { AppStateType } from "./redux/reduxStore"
import { withSuspense } from "./hoc/withSuspense"
import {Breadcrumb, Layout, Menu, Spin} from "antd"
import { LaptopOutlined, NotificationOutlined, UserOutlined } from "@ant-design/icons"
import classes from "./components/Navbar/Navbar.module.css"
import AppHeader from "./components/Header/AppHeader"
import "antd/dist/antd.css"

const { SubMenu } = Menu
const { Content, Footer, Sider } = Layout

const DialogsContainer = React.lazy(() => import("./components/Dialogs/DialogsContainer"))
const ProfileContainer = React.lazy(() => import("./components/Profile/ProfileContainer"))
const UsersPage = React.lazy(() => import("./components/Users/UsersPage"))
const Login = React.lazy(() => import("./components/Login/Login"))
const ChatPage = React.lazy(() => import("./pages/Chat/ChatPage"))

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
    initializeApp: () => void
}

class App extends React.Component<MapPropsType & DispatchPropsType> {
    componentDidMount() {
        this.props.initializeApp()
    }

    render() {
        // if (!this.props.initialized) {
        //     return <Preloader/>
        // }

        return (
            <Spin style={{position: "fixed", maxHeight: "none"}} spinning={!this.props.initialized}>
            <Layout style={{ minHeight: "100vh" }}>
                <AppHeader/>
                <Content style={{ padding: "0 50px" }}>
                    <Breadcrumb style={{ margin: "16px 0" }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    <Layout className="site-layout-background">
                        <Sider className="site-layout-background" width={200} style={{ alignSelf: 'flex-start'}}>
                            <Menu
                                mode="inline"
                                defaultSelectedKeys={["1"]}
                                defaultOpenKeys={["sub1"]}
                            >
                                <SubMenu key="sub1" icon={<UserOutlined/>} title="Profile">
                                    <Menu.Item key="1">
                                        <Link to="/profile">Profile</Link>
                                    </Menu.Item>
                                    <Menu.Item key="2">
                                        <Link to="/dialogs">Messages</Link>
                                    </Menu.Item>
                                    <Menu.Item key="3">
                                        <Link to="/users">DEVELOPERS</Link>
                                    </Menu.Item>
                                </SubMenu>
                                <SubMenu key="sub2" icon={<LaptopOutlined/>} title="Other">
                                    <Menu.Item key="5">
                                        <Link to="/news">News</Link>
                                    </Menu.Item>
                                    <Menu.Item key="6">
                                        <Link to="/chat">Chat</Link>
                                    </Menu.Item>
                                    <Menu.Item key="7">
                                        <Link to="/music">Music</Link>
                                    </Menu.Item>
                                </SubMenu>
                                <SubMenu key="sub3" icon={<NotificationOutlined/>} title="Settings">
                                    <Menu.Item key="9">
                                        <NavLink to="/settings" activeClassName={classes.activeLink}>Settings</NavLink>
                                    </Menu.Item>
                                </SubMenu>
                            </Menu>
                        </Sider>
                        <Content style={{ padding: "0 24px", minHeight: 280 }}>
                            <Switch>
                                <Route path="/" exact><Redirect to="/profile"/></Route>
                                <Route path="/profile/:userId?">
                                    {withSuspense(ProfileContainer)}
                                </Route>
                                <Route path="/dialogs">
                                    {withSuspense(DialogsContainer)}
                                </Route>
                                <Route path="/users">
                                    {withSuspense(UsersPage)}
                                </Route>
                                <Route path="/news" render={() => <News/>}/>
                                <Route path="/music" render={() => <Music/>}/>
                                <Route path="/settings" render={() => <Settings/>}/>
                                <Route path="/login">
                                    {withSuspense(Login)}
                                </Route>
                                <Route path="/chat">
                                    {withSuspense(ChatPage)}
                                </Route>
                                <Route path="*" render={() => <div>404 NOT FOUND</div>}/>
                            </Switch>
                        </Content>
                    </Layout>
                </Content>
                <Footer style={{ textAlign: "center" }}>Social network on React</Footer>
            </Layout>
            </Spin>
        )
    }
}

const mapStateToProps = (state: AppStateType) => ({
    initialized: state.app.initialized,
})

let AppContainer = compose<React.ComponentType>(
    withRouter,
    connect(mapStateToProps, { initializeApp }))(App)

const SocialNetworkApp: React.FC = () => {
    return <BrowserRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </BrowserRouter>
}

export default SocialNetworkApp