import React from "react";
import { useConversations } from "../contexts/ConversationsProvider";
import OpenConversation from "./OpenConversation";
import Sidebar from "./Sidebar";

export default function Dashboard({ id }) {
  const { selectedConversation } = useConversations();

  return (
    <>
      <div className="green-belt"></div>
      <div className="messenger fixed  d-flex" style={{ height: "95vh" }}>
        <Sidebar id={id} />
        {selectedConversation && <OpenConversation />}
      </div>
    </>
  );
}
