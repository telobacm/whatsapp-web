import React from "react";
import { Provider } from "react-redux";
import appstore from "./redux/Store";
import WazZaap from "./WazZaap";

function App() {
  return (
    <Provider store={appstore}>
      <WazZaap></WazZaap>
    </Provider>
  );
}

export default App;
