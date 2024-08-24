# Task Managing App

This is a MERN stack task managing application that allows users to manage their tasks efficiently. The app supports adding multiple sub-tasks and includes JWT authentication for secure user login and registration.

## Features

- **User Authentication**: Secure login and registration using JWT authentication.
- **Main Tasks**: Add, edit, and delete main tasks.
- **Sub-Tasks**: Add multiple sub-tasks to each main task.
- **Responsive Design**: A user-friendly interface that works on all devices.
- **Secure**: All API routes are protected with JWT authentication.
- **MERN Stack**: Built using MongoDB, Express.js, React.js, and Node.js.

## Tech Stack

- **Frontend**:

  - React.js
  - CSS
  - Material Icons

- **Backend**:
  - Node.js
  - Express.js
  - MongoDB
  - JWT for authentication

## Installation

### Prerequisites

- Node.js
- MongoDB

### Steps

1. Clone the repository:

   \```bash
   git clone https://github.com/kalam-Mrusk/task-managing-app
   cd Mern-Stack-Todo-App
   \```

2. Install dependencies for both the client and server:

   \```bash
   cd client
   npm install

   cd ../server
   npm install
   \```

3. Create a `.env` file in the `server` directory and add the following environment variables:

   \```env
   PORT=5000
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   \```

4. Start the development server:

   \```bash

   # Start the server

   cd server
   npm run dev

   # Start the client

   cd ../client
   npm start
   \```

5. Open your browser and navigate to `http://localhost:5173`.

## Project Structure

\```plaintext
mern-todo-app/
├── client/
│ ├── public/
│ └── src/
│ ├── components/
│ ├── pages/
│ ├── redux/
│ ├── App.js
│ └── index.js
├── server/
│ ├── controllers/
│ ├── middleware/
│ ├── models/
│ ├── routes/
│ ├── app.js
│ └── server.js
└── README.md
\```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request if you would like to improve the codebase.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

- **GitHub**: [kalam-Mrusk](https://github.com/kalam-Mrusk)
- **Email**: kalamansarimrusk9898@gmail.com
