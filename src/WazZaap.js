import React from "react";
import { connect } from "react-redux";
import "./css/App.scss";

//Pages / Screens
import Splash from "./pages/Splash";

function WazZaap(props) {
  const { loaded } = props;

  return loaded ? <h1>App is Loaded</h1> : <Splash />;
}

const mapStateToProps = (state) => {
  return {
    loaded: state.App.loaded,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setState: (loaded) => dispatch({ type: "APP_STATE", state: { loaded: loaded } }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WazZaap);
