import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {setUsersProfile} from "../../redux/profileReducer";
import {withRouter} from 'react-router-dom';
import {ProfileAPI} from "../../API/api";

class ProfileContainer extends React.Component {
    componentDidMount() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = 2;
        }
        ProfileAPI.getUserProfile(userId)
            .then(data => {
                this.props.setUsersProfile(data);
            })
    }

    render() {
        return (
            <div>
                <Profile {...this.props} profile={this.props.profile} />
            </div>
        )
    }
}

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
})

let WithUrlDataContainerComponent = withRouter(ProfileContainer)

export default connect(mapStateToProps, {
    setUsersProfile,
})(WithUrlDataContainerComponent);