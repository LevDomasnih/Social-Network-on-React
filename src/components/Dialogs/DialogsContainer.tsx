import {actions} from "../../redux/dialogsReducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {AppStateType} from "../../redux/reduxStore";
import {ComponentType} from "react";

const mapStateToProps = (state: AppStateType) => {
    return {
        dialogsPage: state.dialogsPage,
    }
}

export default compose<ComponentType>(
    connect(mapStateToProps, {
        sendMessage: actions.sendMessage
    }),
    withAuthRedirect,
)(Dialogs);
