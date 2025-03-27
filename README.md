# Contact App

### Features

  Add new contacts with name and phone number.
  
  Edit existing contacts.
  
  Delete contacts using a swipe gesture.
  
  Persistent modal for adding and editing contacts.
  
  Phone number validation for Philippine numbers.

### Project Structure

    components
    
        ContactInput.js  # Modal for adding/editing contacts
        
        ContactItem.js   # Individual contact item with swipe delete
        
    contexts
    
        ContactsContext.js # Context provider for managing contacts
        
    App.js   # Main app file containing the UI layout
