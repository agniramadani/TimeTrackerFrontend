
# Time Tracker UI
A simple and easy-to-use interface that makes time tracking a smooth and efficient process.

The application has been developed using Vite with React.js.

## Roadmap
- Installation
- API
- User and Admin Account Management System
- Author




## API
To interact with the backend and manage data, use the [TimeTrackerBackend](https://github.com/agniramadani/TimeTrackerBackend).

## Installation

Installing npm and Dependencies for a Vite React App:

- Install [Node.js](https://nodejs.org/en): Before using npm, ensure that Node.js is installed on your system.

What is Vite in React.js:
- Vite is a build tool and development server designed primarily for modern JavaScript frameworks like React, Vue.js, and others. It aims to provide a faster and more efficient development experience by leveraging native ES modules in modern browsers. Unlike traditional bundlers like Webpack, Vite performs "on-demand" transpilation and builds, which means it only compiles the specific parts of the code that are needed during development, leading to quicker reload times and improved performance.

After Node.js installation, we can proceed by navigating to the app directory:
```bash
cd frontend
```


Install Dependencies:
```bash
npm install
```

Start the Development Server:
```bash
npm run dev
```



## User and Admin Account Management System

### Account Creation and Login
- To use our platform, users need to create a new account.
- Once logged in, the system will remember the user's username for future visits.

### Admin Privileges
- An admin user has special privileges to manage the list of names through Create, Read, Update, and Delete (CRUD) operations.

### Project Management
- Only admin users can create projects, perform CRUD and have full control over managing them.

### Time Tracking
- Regular users can choose a project they've worked on from a list and enter the date. Today's date is automatically preselected.
- Users can enter project hours and/or minutes in an input field. As they type, the time is automatically formatted as hh:mm. For example, 2 becomes 02:00, 8.5 becomes 08:30, 15 becomes 00:15, and 150 becomes 02:30. The system assumes that numbers greater than 10 represent minutes, while numbers less than or equal to 10 represent hours.
- Users can effortlessly switch between different input fields to enter their project details.
- An optional comment field is available for users to add additional information.

### Saving and Viewing Entries
- Users can save their input by clicking a dedicated button.
- The system provides a list of time entries created by the user, as well as contributions from other users on various projects.
- Users have the ability to delete only the individual entries they created. Admin users (superusers) have full control and can manage all entries.
### Account
- Users can manage their own account, can perform CRUD operations.
- On the account page, logged-in users can view the total number of hours they have contributed.


## Author

- [Agni Ramadani](https://github.com/agniramadani)
