import React, { useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const ContactsContext = React.createContext();

export function useContacts() {
  return useContext(ContactsContext);
}

export function ContactsProvider({ children }) {
  //list of contacts
  const [contacts, setContacts] = useLocalStorage("contacts", []);

  //to create new contact as global state
  function createContact(id, name) {
    setContacts((prevContacts) => {
      return [...prevContacts, { id, name }];
    });
  }

  //giving access to children those use this context
  return <ContactsContext.Provider value={{ contacts, createContact }}>{children}</ContactsContext.Provider>;
}
