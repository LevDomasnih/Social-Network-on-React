import {connect} from "react-redux";
import Navbar from "./Navbar";
import {AppStateType} from "../../redux/reduxStore";

const mapStateToProps = (state: AppStateType) => ({
    friends: state.sidebar.friends,
})

export default connect(mapStateToProps, { })(Navbar);