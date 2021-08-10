import React from "react";
import { Provider } from "react-redux";
import appstore from "./redux/Store";
import WazZaap from "./WazZaap";

function App() {
  return (
    <Provider store={appstore}>
<<<<<<< Updated upstream
=======
      <h1>Test</h1>
>>>>>>> Stashed changes
      <WazZaap></WazZaap>
    </Provider>
  );
}

export default App;
