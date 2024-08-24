import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import store from "./redux/store.js";
import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Todo from "./pages/Todo.jsx";
import NoPage from "./pages/NoPage.jsx";
import AuthPage from "./pages/AuthPage.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <AuthPage />,
      },
      {
        path: "todo",
        element: <Todo />,
      },
      {
        path: "*",
        element: <NoPage />,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
