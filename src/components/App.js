import React from "react";
// import { Provider } from "react-redux";
// import appstore from "../redux/Store";
import useLocalStorage from "../hooks/useLocalStorage";
import Login from "./Login";
import "../css/App.scss";
import Dashboard from "./Dashboard";
import { ContactsProvider } from "../contexts/ContactsProvider";
import { ConversationsProvider } from "../contexts/ConversationsProvider";
// import WazZaap from "../WazZaap-unused";

function App() {
  const [id, setId] = useLocalStorage("id");

  const dashboard = (
    <ContactsProvider>
      <ConversationsProvider id={id}>
        <Dashboard id={id} />
      </ConversationsProvider>
    </ContactsProvider>
  );

  return id ? dashboard : <Login onIdSubmit={setId} />;

  // using Redux
  // return <Provider store={appstore}>{id ? <Dashboard id={id} /> : <Login onIdSubmit={setId} />}</Provider>;
}

export default App;
