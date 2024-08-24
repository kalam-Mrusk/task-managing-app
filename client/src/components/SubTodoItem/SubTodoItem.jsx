import axios from "axios";
import React, { useState } from "react";

import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditNoteIcon from "@mui/icons-material/EditNote";
import SaveIcon from "@mui/icons-material/Save";
const SubTodoItem = ({
  subTodoTitle,
  todoId,
  subTodoDiscription,
  subTodoId,
  getAllTodo,
  notify,
}) => {
  const [editable, setEditable] = useState(false);
  const [title, setTitle] = useState(subTodoTitle);
  const [discription, setDiscription] = useState(subTodoDiscription);

  const updateSubTodo = async () => {
    const incompleteDetails = [title, discription].some((ele) => {
      return ele.trim() === "";
    });
    if (incompleteDetails) return notify("incomplete details.");
    try {
      const res = await axios.put(
        // `http://localhost:8080/api/todo-app/todo/${todoId}/subtodo/${subTodoId}/update`,
        `https://mern-stack-todo-server.onrender.com/api/todo-app/todo/${todoId}/subtodo/${subTodoId}/update`,
        {
          subTodoTitle: title,
          subTodoDiscription: discription,
        }
      );
      if (res) {
        setEditable(false);
        notify("sub todo updated.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeSubTodo = async () => {
    try {
      const res = await axios.delete(
        // `http://localhost:8080/api/todo-app/todo/${todoId}/subtodo/${subTodoId}/delete`
        `https://mern-stack-todo-server.onrender.com/api/todo-app/todo/${todoId}/subtodo/${subTodoId}/delete`
      );
      if (res) {
        notify("sub todo removed.");
        getAllTodo();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="subTodoContainer">
      <div className="subTodoItemInputSection">
        {editable ? (
          <>
            <input
              type="text"
              placeholder="title..."
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
            <input type="text" placeholder="title..." value={title} readOnly />
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
      <div className="subTodoItemButtonSection">
        <button style={{}} onClick={removeSubTodo}>
          <DeleteForeverIcon style={{ fontSize: "16px" }} />
        </button>
        {editable ? (
          <button
            style={{ backgroundColor: "" }}
            onClick={() => {
              updateSubTodo();
            }}
          >
            <SaveIcon style={{ fontSize: "16px" }} />
          </button>
        ) : (
          <button
            style={{ backgroundColor: "" }}
            onClick={() => setEditable(true)}
          >
            <EditNoteIcon style={{ fontSize: "16px" }} />
          </button>
        )}
      </div>
    </div>
  );
};

export default SubTodoItem;
