import React, { useState } from "react";
import SubTodoItem from "../SubTodoItem/SubTodoItem.jsx";
import "./todoItem.css";
import "../SubTodoItem/subtodoItem.css";
import axios from "axios";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditNoteIcon from "@mui/icons-material/EditNote";
import SaveIcon from "@mui/icons-material/Save";
import AddIcon from "@mui/icons-material/Add";
import CancelIcon from "@mui/icons-material/Cancel";
const TodoItem = ({
  todoTitle,
  todoDiscription,
  subTodoData,
  todoId,
  getAllTodo,
  createdAt,
  updatedAt,
  notify,
}) => {
  const [displaySubTodo, setDisplaySubTodo] = useState(false);
  const [editable, setEditable] = useState(false);
  const [subTodoAddable, setSubTodoAddable] = useState(false);
  const [title, setTitle] = useState(todoTitle);
  const [discription, setDiscription] = useState(todoDiscription);
  const [subTodoTitle, setSubTodoTitle] = useState("");
  const [subTodoDiscription, setSubTodoDiscription] = useState("");
  const [handle, setHandle] = useState(false);

  const updateTodo = async () => {
    const incompleteDetails = [title, discription].some((ele) => {
      return ele.trim() === "";
    });
    if (incompleteDetails) return notify("incomplete details.");
    try {
      const res = await axios.put(
        `http://localhost:8080/api/todo-app/todo/${todoId}/update`,
        // `https://mern-stack-todo-server.onrender.com/api/todo-app/todo/${todoId}/update`,
        {
          todoTitle: title,
          todoDiscription: discription,
        }
      );
      if (res) {
        setEditable(false);
        notify("todo updated.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeTodo = async () => {
    if (handle === true) return;

    try {
      const res = await axios.delete(
        `http://localhost:8080/api/todo-app/todo/${todoId}/delete`
        // `https://mern-stack-todo-server.onrender.com/api/todo-app/todo/${todoId}/delete`
      );
      if (res) {
        notify("todo removed.");
        getAllTodo();
      }
      setTimeout(() => {
        setHandle(false);
      }, 2000);
    } catch (error) {
      console.log(error);
      setHandle(false);
    }
  };

  const addSubTodo = async () => {
    const incompleteDetails = [subTodoTitle, subTodoDiscription].some((ele) => {
      return ele.trim() === "";
    });
    if (incompleteDetails) return notify("incomplete details.");
    if (handle === true) return;
    try {
      const res = await axios.post(
        `http://localhost:8080/api/todo-app/todo/${todoId}/subtodo`,
        // `https://mern-stack-todo-server.onrender.com/api/todo-app/todo/${todoId}/subtodo`,
        {
          subTodoTitle,
          subTodoDiscription,
        }
      );
      if (res) {
        notify("sub todo added.");
        setSubTodoTitle("");
        setSubTodoDiscription("");
        getAllTodo();
        setSubTodoAddable(false);
      }
      setTimeout(() => {
        setHandle(false);
      }, 2000);
    } catch (error) {
      console.log(error);
      setHandle(false);
    }
  };
  let ca = createdAt.toLocaleString().split("T");
  return (
    <div className="todoMainContainer">
      <div className="todoContainer">
        <div className="todoItemInputSection">
          <p style={{ fontSize: "10px", color: "rgb(88, 88, 88)" }}>
            {ca[0]} ,{ca[1].slice(0, 8)}
          </p>
          <p style={{ fontSize: "10px", color: "rgb(88, 88, 88)" }}>
            <span style={{ color: "#a81c1c" }}>Latest update </span>
            {updatedAt.toLocaleString().slice(0, 10)},
            {updatedAt.toLocaleString().slice(11, 19)}
          </p>
          {editable ? (
            <>
              <input
                type="text"
                placeholder="todos title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <textarea
                name="discription"
                id=""
                placeholder="discription..."
                value={discription}
                onChange={(e) => setDiscription(e.target.value)}
              ></textarea>
            </>
          ) : (
            <>
              <input
                type="text"
                placeholder="todos title..."
                value={title}
                readOnly
              />
              <textarea
                name="discription"
                id=""
                placeholder="discription..."
                value={discription}
                readOnly
              ></textarea>
            </>
          )}
        </div>
        <div className="todoItemButtonSection">
          <button
            onClick={() => {
              removeTodo();
              setHandle(true);
            }}
          >
            <DeleteForeverIcon />
          </button>
          {editable ? (
            <button
              onClick={() => {
                updateTodo();
              }}
            >
              <SaveIcon />
            </button>
          ) : (
            <button onClick={() => setEditable(true)}>
              <EditNoteIcon />
            </button>
          )}
        </div>
      </div>

      <button
        style={{
          border: "none",
          backgroundColor: "transparent",
          padding: "3px",
          margin: "15px 0px",
          fontSize: "0.9rem",
          fontWeight: "600",
          borderRadius: "8px",
          color: "#504f4fc2",
        }}
        onClick={() => {
          setDisplaySubTodo(!displaySubTodo);
          setSubTodoAddable(false);
        }}
      >
        SubTodo
      </button>
      {displaySubTodo ? (
        <button
          style={{
            backgroundColor: "rgb(100, 188, 100)",
            padding: "2px 4px",
            border: "none",
            borderRadius: "10px",
            marginLeft: "5px",
          }}
          onClick={() => setSubTodoAddable(true)}
        >
          add +
        </button>
      ) : (
        ""
      )}
      <div
        className="subTodoItemList"
        style={displaySubTodo ? {} : { display: "none" }}
      >
        {subTodoAddable ? (
          <div className="subTodoContainer">
            <div className="subTodoItemInputSection">
              <input
                type="text"
                placeholder="title..."
                value={subTodoTitle}
                onChange={(e) => setSubTodoTitle(e.target.value)}
              />
              <textarea
                name="discription"
                id=""
                placeholder="discription..."
                value={subTodoDiscription}
                onChange={(e) => setSubTodoDiscription(e.target.value)}
              ></textarea>
            </div>
            <div className="subTodoItemButtonSection">
              <button onClick={() => setSubTodoAddable(false)}>
                <CancelIcon style={{ fontSize: "16px" }} />
              </button>
              <button
                onClick={() => {
                  addSubTodo();
                  setHandle(true);
                }}
              >
                <AddIcon style={{ fontSize: "16px" }} />
              </button>
            </div>
          </div>
        ) : (
          subTodoData?.map((data) => (
            <SubTodoItem
              key={data._id}
              subTodoId={data._id}
              todoId={todoId}
              subTodoTitle={data.subTodoTitle}
              subTodoDiscription={data.subTodoDiscription}
              getAllTodo={getAllTodo}
              notify={notify}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TodoItem;
