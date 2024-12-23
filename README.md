# Kurasa 📱 - Phonebook Application

Kurasa is a user-friendly and feature-rich phonebook application built using Angular and styled with Tailwind CSS. This app helps users manage their contacts in an organized way with a range of features, including contact management, search, and customizable views. The app supports both light and dark modes and allows users to perform bulk actions like deleting or editing contacts.

## Features 🌟

### Core Features:
1. **List All Contacts** 📋:
   - Display all contacts sorted alphabetically by default.
   - Toggle between grid view and list view for a flexible user interface.

2. **View a Single Contact** 👤:
   - Click on a contact to view detailed information in a modal or dedicated page.
   - Fields include First Name, Last Name, Email, Phone Number, Contact Image, Physical Address, and more.

3. **Edit and Update a Contact** ✏️:
   - Edit a contact's details, with inline form validation (e.g., email format, phone number length).
   - Save updated contact information.

4. **Delete a Contact** 🗑️:
   - Delete contacts with a confirmation dialog.
   - "Soft delete" functionality (mark contact as deleted without permanent removal).

5. **Search Contacts** 🔍:
   - Filter contacts dynamically based on the user's input (search by name, email, or phone number).

6. **Bulk Deletion of Contacts** ⚡:
   - Select multiple contacts using checkboxes and delete them in bulk.

7. **Homepage Toggle (List or Grid)** 🏠:
   - Set the default view (list or grid) for the homepage.
   - Save the user's preference in local storage for persistence.

### Enhanced Features (Optional but Recommended):
1. **Contact Grouping** 📂:
   - Group contacts into categories such as Family, Friends, Work, etc.
   - Filter contacts by group.

2. **Favorites** ⭐:
   - Mark contacts as favorites and display them in a separate "Favorites" section.
   - Toggle favorite status with a star icon.

3. **Import/Export Contacts** 💾:
   - Import contacts from a CSV file or export the contact list for backup.
   - Provides sample CSV templates for users.

4. **Dark Mode** 🌙:
   - Switch between light and dark modes using Tailwind's dark mode configuration.

5. **Recent Contacts** 🕒:
   - View recently added or viewed contacts in a dedicated section.

## Technology Stack 💻

- **Frontend**: Angular
- **Styling**: Tailwind CSS
- **Data Storage**: [Mock data / Firebase / Postgres / MySQL] (choose based on your preference)
- **Local Storage**: For saving user preferences (e.g., homepage view, dark mode).

## Setup Instructions ⚙️

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/kurasa.git
   cd kurasa
   npm install
   ng serve
