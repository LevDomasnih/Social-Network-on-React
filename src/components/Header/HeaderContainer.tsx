import React from 'react';
import Header, {DispatchPropsTypeHeader, MapPropsTypeHeader} from "./Header";
import {connect} from "react-redux";
import {logout} from "../../redux/authReducer";
import {AppStateType} from "../../redux/reduxStore";

class HeaderContainer extends React.Component<MapPropsTypeHeader & DispatchPropsTypeHeader> {
    render() {
        return <Header {...this.props} />
    }
}

const mapStateToProps = (state: AppStateType) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
});

export default connect<MapPropsTypeHeader, DispatchPropsTypeHeader, {}, AppStateType>(mapStateToProps, {
    logout,
})(HeaderContainer);