import React, { useContext, useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { useContacts } from "./ContactsProvider";

const ConversationsContext = React.createContext();

export function useConversations() {
  return useContext(ConversationsContext);
}

export function ConversationsProvider({ id, children }) {
  //list of conversations
  const [conversations, setConversations] = useLocalStorage("conversations", []);
  const [selectedConversationIndex, setSelectedConversationIndex] = useState(0);
  const { contacts } = useContacts();
  // console.log("conversations", conversations);

  //to create new conversations as global state
  function createConversation(recipients) {
    setConversations((prevConversations) => {
      // console.log("recip 21", recipients);
      return [...prevConversations, { recipients, messages: [] }];
    });
  }

  function addMessageToConversation({ recipients, text, sender }) {
    setConversations((prevConversations) => {
      let madeChange = false;
      const newMessage = { sender, text };
      const newConversation = prevConversations.map((conversation) => {
        console.log("convo", conversation);
        if (arrayEquality(conversation.recipients, recipients)) {
          madeChange = true;
          console.log("if pertama");
          return {
            ...conversation,
            messages: [...conversation.messages, newMessage],
          };
        }
        return conversation;
      });
      if (madeChange) {
        console.log("if kedua");
        return newConversation;
      } else {
        console.log("else");
        return [...prevConversations, { recipients, messages: [newMessage] }];
      }
    });
  }

  function sendMessage(recipients, text) {
    addMessageToConversation({ recipients, text, sender: id });
  }

  const formattedConversations = conversations.map((conversation, index) => {
    const recipients = conversation.recipients.map((recipient) => {
      const contact = contacts.find((contact) => {
        return contact.id === recipient;
      });
      const name = (contact && contact.name) || recipient;
      return { id: recipient, name };
    });
    const selected = index === selectedConversationIndex;
    return { ...conversation, recipients, selected };
  });

  const value = {
    conversations: formattedConversations,
    selectedConversation: formattedConversations[selectedConversationIndex],
    sendMessage,
    selectConversationIndex: setSelectedConversationIndex,
    createConversation,
  };

  //giving access to children those use this context
  return <ConversationsContext.Provider value={value}>{children}</ConversationsContext.Provider>;
}

//PR Pahami tenanan !
function arrayEquality(a, b) {
  if (a.length !== b.length) return false;

  a.sort();
  b.sort();

  return a.every((element, index) => {
    return element === b[index];
  });
}
