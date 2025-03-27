import React from "react";
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Text,
  StatusBar,
  SafeAreaView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

import { ContactsProvider, useContacts } from "./contexts/ContactsContext";
import ContactInput from "./components/ContactInput";
import ContactItem from "./components/ContactItem";

function AppContent() {
  const { contacts, deleteContact, startEditContact, toggleModal } = useContacts();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f5f7" />
      <View style={styles.appContainer}>
        <Text style={styles.header}>My Contacts</Text>

        {contacts.length === 0 ? (
          <View style={styles.emptyContainer}>
            <AntDesign name="contacts" size={60} color="#ccc" />
            <Text style={styles.emptyText}>No contacts yet</Text>
            <Text style={styles.emptySubText}>Tap + to add a new contact</Text>
          </View>
        ) : (
          <View style={styles.contactsContainer}>
            <FlatList
              data={contacts}
              renderItem={(itemData) => (
                <ContactItem
                  contact={itemData.item}
                  onDelete={deleteContact}
                  onUpdate={startEditContact}
                />
              )}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
            />
          </View>
        )}

        {/* Floating Add Button */}
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => toggleModal()}
        >
          <AntDesign name="plus" size={24} color="white" />
        </TouchableOpacity>

        <ContactInput />
      </View>
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <ContactsProvider>
      <AppContent />
    </ContactsProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f7",
  },
  appContainer: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 16,
  },
  header: {
    fontSize: 28,
    fontWeight: "600",
    color: "#333",
    marginBottom: 20,
    marginLeft: 5,
  },
  contactsContainer: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#888",
    marginTop: 15,
  },
  emptySubText: {
    fontSize: 14,
    color: "#aaa",
    marginTop: 5,
  },
  addButton: {
    backgroundColor: "#007AFF",
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 30,
    right: 30,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
});