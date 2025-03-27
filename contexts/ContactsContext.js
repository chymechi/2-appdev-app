import React, { createContext, useState, useContext } from 'react';

// Create the context
const ContactsContext = createContext();

// Create a provider component
export function ContactsProvider({ children }) {
  const [contacts, setContacts] = useState([]);
  const [editingContact, setEditingContact] = useState(null);
  const [modalIsVisible, setModalIsVisible] = useState(false);

  // Add Contact Handler
  const addContact = (name, phone) => {
    if (!phone.startsWith("+63") || phone.length !== 16) {
      alert("Invalid Phone Number. Please enter a valid Philippine number.");
      return;
    }

    if (editingContact) {
      // Update existing contact
      setContacts((currentContacts) =>
        currentContacts.map((contact) =>
          contact.id === editingContact.id
            ? { id: contact.id, name, phone }
            : contact
        )
      );
      setEditingContact(null);
    } else {
      // Add new contact
      setContacts((currentContacts) => [
        ...currentContacts,
        { id: Math.random().toString(), name, phone },
      ]);
    }
    setModalIsVisible(false);
  };

  // Delete Contact Handler
  const deleteContact = (id) => {
    setContacts((currentContacts) =>
      currentContacts.filter((contact) => contact.id !== id)
    );
  };

  // Start Edit Contact Handler
  const startEditContact = (contact) => {
    setEditingContact(contact);
    setModalIsVisible(true);
  };

  // Toggle Modal Visibility
  const toggleModal = (visible = true) => {
    setModalIsVisible(visible);
    if (!visible) {
      setEditingContact(null);
    }
  };

  // Provide context value
  const contextValue = {
    contacts,
    editingContact,
    modalIsVisible,
    addContact,
    deleteContact,
    startEditContact,
    toggleModal,
  };

  return (
    <ContactsContext.Provider value={contextValue}>
      {children}
    </ContactsContext.Provider>
  );
}

export function useContacts() {
  const context = useContext(ContactsContext);
  if (!context) {
    throw new Error('useContacts must be used within a ContactsProvider');
  }
  return context;
}