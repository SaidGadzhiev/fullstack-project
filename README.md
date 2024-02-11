# Antventory

Antventory is an easy-to-use web app built with the MERN stack, making inventory management and equipment borrowing an easy task. Whether you're tracking items or borrowing equipment, Antventory simplifies the process. With a simple interface and the power of MongoDB, Express.js, React, and Node.js, it's a straightforward solution for organizations looking to manage their resources seamlessly.

## Technologies Used

- MongoDB
- Express.js
- React
- Node.js

## Additional Libraries Used

- [Auth0](https://auth0.com/?utm_content=canbranded-auth0-auth0homepage&utm_source=google&utm_campaign=amer_can_can_all_ciam-all_dg-ao_auth0_search_google_text_kw_utm2&utm_medium=cpc&utm_term=auth0%20com-c&utm_id=aNK4z0000004GnQGAU&gad_source=1&gclid=CjwKCAiA2pyuBhBKEiwApLaIO1SOjlu2epo3QI_ywkHDFcFizOGmNIZtuH0Q1cU1zSmlqWRP-RFKzxoCw7MQAvD_BwE)
- [Lodash](https://lodash.com/)
- [React Icons](https://react-icons.github.io/react-icons/)
- [Papaparse](https://www.npmjs.com/package/react-papaparse)
- [Bycrypt](https://www.npmjs.com/package/bcryptjs-react)
- [React](https://www.npmjs.com/package/react-router-dom)

## Getting started

Follow these steps to get the MERN stack project up and running on your local machine.

### Prerequisites:

- Node.js installed
- MongoDB installed and running
- Auth0 account (for user authentication)

### Installation:

**Clone the Repository:**

```bash
git clone https://github.com/SaidGadzhiev/fullstack-project
```

### Configuration

MongoDB SetUp

- Ensure MongoDB is installed and running.
- Update the MongoDB connection string in the server/.env file.

Libraries

- When launching the app, make sure all the listed libraries have been installed

### Navigate to the Project

open terminal

`cd fullstack-project `

### Install Dependecies for Server and run it

1.  `cd server && npm install `
2.  `yarn start`

### Install Dependecies for Fronted

Open new terminal and

1.  `cd client && npm install`
2.  `yarn start`

## Frontend

The frontend of our MERN stack project, powered by React, is designed for efficient inventory management and equipment borrowing. Divided into two parts — admin and user platforms — it provides a tailored experience based on roles. The intuitive and responsive user interface simplifies tracking items and borrowing equipment, ensuring a seamless experience. Leveraging the latest React features, it delivers a dynamic and interactive platform. Developers can follow the installation steps below to get started, contributing to the project or enhancing the user interface. Explore the features and functionalities crafted to elevate inventory management workflows for both administrators and users.

### Admin

- **Authentication:**

  - Users can log in with existing accounts or create a new admin account for access.

- **Inventory Management:**

  - Admins have full visibility into the inventory, allowing them to view, modify, or delete items.

- **Equipment Requests:**

  - View and manage user requests for equipment, ensuring efficient handling of borrowing requests.

- **Modify/Delete Inventory Items:**

  - Admins can easily make changes to the inventory, adding, modifying, or removing items as needed.

- **Handle Requests:**
  - Admins can review and process equipment requests, facilitating smooth equipment borrowing processes.

### User

- **Authentication with Auth0:**

  - Users can log in securely using Auth0 authentication.

- **Borrowing Requests:**

  - Users can easily request specific items they want to borrow.

- **Inventory Access:**
  - Explore the available inventory and check item details before making borrowing requests.

The backend of our MERN stack project serves as the powerhouse, managing data and facilitating communication between the frontend and the database. Built with Node.js and Express.js, it follows RESTful principles to offer a robust and scalable architecture.

## Backend

The backend of the MERN stack project serves as the powerhouse, managing data and facilitating communication between the frontend and the database. Built with Node.js and Express.js, it follows RESTful principles to offer a robust and scalable architecture.

1. **RESTful APIs:**

   - The backend exposes RESTful APIs to interact with the database and handle various operations such as retrieving inventory data, processing equipment requests, and managing user authentication.

2. **Database Interaction:**

   - MongoDB, a NoSQL database, is employed to store and organize data. The backend communicates directly with MongoDB using the official MongoDB Node.js driver, without the use of Mongoose.

3. **User Authentication:**

   - A custom authentication system has been implemented for user account creation and login. User credentials are securely stored and verified against the database using the bycrypt library.

4. **Routing and Controllers:**
   - Express.js is used for routing, and controllers handle the logic for each route, ensuring separation of concerns and maintainability.
