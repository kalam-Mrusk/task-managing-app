import axios from "axios";
import "./todo.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loadingEnd, loadingStart, refresh } from "../redux/loading.slice.js";
import TodoItem from "../components/TodoItem/TodoItem.jsx";
import { ToastContainer, toast } from "react-toastify";

import { ThreeDots } from "react-loader-spinner";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
const Todo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector((state) => state.loading.status);
  const userExist = useSelector((state) => state.user.value);
  const [title, setTitle] = useState("");
  const [discription, setDiscription] = useState("");
  const [allTodos, setAllTodos] = useState([]);
  const [handler, setHandler] = useState(false);
  const [disp, setDisp] = useState(false);
  const [moreTodo, setMoreTodo] = useState(3);
  const userLogOut = async () => {
    try {
      const res = await axios.get(
        // "http://localhost:8080/api/todo-app/user/auth/logout",
        "https://mern-stack-todo-server.onrender.com/api/todo-app/user/auth/logout",

        {
          withCredentials: true,
        }
      );
      dispatch(refresh());
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  const addTodo = async () => {
    const incompleteDetails = [title, discription].some((ele) => {
      return ele.trim() === "";
    });
    console.log(incompleteDetails);
    if (incompleteDetails) {
      return toast("incomplete details.");
    }

    try {
      // dispatch(loadingStart());
      setHandler(true);
      const res = await axios.post(
        // "http://localhost:8080/api/todo-app/todo/create",
        "https://mern-stack-todo-server.onrender.com/api/todo-app/todo/create",
        {
          todoTitle: title,
          todoDiscription: discription,
        },
        { withCredentials: true }
      );
      if (res) {
        notify("todo added.");
        setTitle("");
        setDiscription("");
        getAllTodo();
      }
      // dispatch(loadingEnd());
      setTimeout(() => {
        setHandler(false);
      }, 1000);
    } catch (error) {
      console.log(error);
      // dispatch(loadingEnd());
      setHandler(false);
    }
  };

  const getAllTodo = async () => {
    try {
      const res = await axios.get(
        // "http://localhost:8080/api/todo-app/todo/get",
        "https://mern-stack-todo-server.onrender.com/api/todo-app/todo/get",
        { withCredentials: true }
      );
      if (res) {
        setAllTodos(res.data?.data.reverse());
      }
    } catch (error) {
      console.log(error);
    }
  };

  const notify = (alert) => toast(alert);
  useEffect(() => {
    if (!userExist) {
      navigate("/");
    }
    getAllTodo();
  }, [userExist]);
  return (
    <div className="todoPageContainer">
      <div className="todoHeader" style={{ position: "relative" }}>
        <h3 className="fullname">Todo App</h3>
        <div
          className="userLog"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <AccountCircleIcon
            style={{
              fontSize: "35px",
              color: "#ccc",
              marginRight: "5px",
              cursor: "pointer",
            }}
            onClick={() => setDisp(!disp)}
          />
          <button onClick={userLogOut}>logout</button>
        </div>
        <div className={disp ? "userProfile" : "userProfile2"}>
          <h3>Profile</h3>
          <span
            style={{
              width: "20px",
              height: "20px",
              border: "1px solid #000",
              borderRadius: "50%",
              padding: "6px",
              backgroundColor: "#ccc",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "8px auto",
            }}
          >
            {userExist?.user.fullname.trim().charAt(0).toUpperCase()}
          </span>
          <p className="name">
            {userExist?.user.fullname.trim().charAt(0).toUpperCase() +
              userExist?.user.fullname.trim().slice(1)}
          </p>
          <p>{userExist?.user.email.trim()}</p>
        </div>
      </div>
      <img
        src="https://cdn-icons-png.flaticon.com/128/1355/1355663.png"
        className="writeTodoImg"
      />
      <div className="todoPageInputSection">
        <input
          type="text"
          placeholder="todo title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          name=""
          id=""
          placeholder="todo discription..."
          value={discription}
          onChange={(e) => setDiscription(e.target.value)}
        ></textarea>
        {handler ? (
          <div style={{ margin: "auto" }}>
            <ThreeDots
              visible={true}
              height="59"
              width="80"
              color="#4fa94d"
              radius="9"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </div>
        ) : (
          <button onClick={addTodo}>add todo</button>
        )}
      </div>
      <h2>Todo List</h2>
      <div className="todoPageItemContainer">
        {allTodos.slice(0, moreTodo).map((todo) => (
          <TodoItem
            key={todo._id}
            todoId={todo._id}
            subTodoData={todo.subTodos}
            todoTitle={todo.todoTitle}
            todoDiscription={todo.todoDiscription}
            getAllTodo={getAllTodo}
            createdAt={todo.createdAt}
            updatedAt={todo.updatedAt}
            notify={notify}
          />
        ))}
      </div>
      {allTodos.length > 3 && (
        <div
          className="moreTodo"
          style={{
            borderBottom: "2px solid #ccc",
            width: "100%",
            margin: "2.5rem auto",
            position: "relative",
          }}
        >
          {allTodos.length <= moreTodo ? (
            <span
              style={{
                position: "absolute",
                backgroundColor: "#3bb13b",
                padding: "5px 8px",
                borderRadius: "10px",
                zIndex: "1",
                left: "50%",
                top: "50%",
                transform: "translate(-50%,-50%)",
                cursor: "pointer",
                color: "eee",
              }}
              onClick={() => setMoreTodo(3)}
            >
              Less todo
            </span>
          ) : (
            <span
              style={{
                position: "absolute",
                backgroundColor: "#3bb13b",
                padding: "5px 8px",
                borderRadius: "10px",
                zIndex: "1",
                left: "50%",
                top: "50%",
                transform: "translate(-50%,-50%)",
                cursor: "pointer",
                color: "#eee",
              }}
              onClick={() => setMoreTodo(moreTodo + 2)}
            >
              More todo
            </span>
          )}
        </div>
      )}
      <footer className="footer">
        <p>
          &copy; {new Date().getFullYear()} Your Company Name. All rights
          reserved.
        </p>
      </footer>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition:Bounce
      />
    </div>
  );
};

export default Todo;
