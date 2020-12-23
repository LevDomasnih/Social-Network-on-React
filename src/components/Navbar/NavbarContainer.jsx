import React from 'react';
import {connect} from "react-redux";
import Navbar from "./Navbar";

const mapStateToProps = (state) => ({
    friends: state.sidebar.friends,
})

export default connect(mapStateToProps, { })(Navbar);