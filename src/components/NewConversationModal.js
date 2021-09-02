import React, { useRef, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useContacts } from "../contexts/ContactsProvider";
import { useConversations } from "../contexts/ConversationsProvider";

export default function NewConversationModal({ closeModal }) {
  const [selectedContactIds, setSelectedContacIds] = useState([]);
  const { contacts } = useContacts();
  const { createConversation } = useConversations();

  function handleSubmit(e) {
    e.preventDefault();

    createConversation(selectedContactIds);
    closeModal();
  }

  function handleCxboxChange(contactId) {
    setSelectedContacIds((prevSelectedContactIds) => {
      if (prevSelectedContactIds.includes(contactId)) {
        return prevSelectedContactIds.filter((prevId) => {
          return contactId !== prevId;
        });
      } else {
        return [...prevSelectedContactIds, contactId];
      }
    });
  }

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>Create Conversation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {contacts.map((contact) => (
            <Form.Group controlId={contact.id} key={contact.id}>
              <Form.Check type="checkbox" value={selectedContactIds.includes(contact.id)} label={contact.name} onChange={() => handleCxboxChange(contact.id)} />
            </Form.Group>
          ))}
        </Form>
        <Button onClick={(e) => handleSubmit(e)}>Create</Button>
      </Modal.Body>
    </>
  );
}
