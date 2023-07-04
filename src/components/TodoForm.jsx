import { useState } from "react";
import { v4 as uuid } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

function TodoForm() {
  const [value, setValue] = useState("");
  const [list, setList] = useState([{ id: uuid(), name: "ADD Your LIST NOW" }]);
  const [editId, setEditId] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    if (value !== "") {
      if (editId) {
        // Update existing item
        const updatedList = list.map((item) =>
          item.id === editId ? { ...item, name: value } : item
        );
        setList(updatedList);
        setEditId(null);
      } else {
        // Add new item
        setList([...list, { id: uuid(), name: value }]);
      }
      setValue("");
    } else {
      alert("Please enter a value");
    }
  }

  function handleEdit(id) {
    const itemToEdit = list.find((item) => item.id === id);
    if (itemToEdit) {
      setValue(itemToEdit.name);
      setEditId(id);
    }
  }

  function handleDelete(id) {
    const updatedList = list.filter((item) => item.id !== id);
    setList(updatedList);
  }

  return (
    <>
      <div className="TodoWrapper">
        <h1>Todo List</h1>
        <form className="TodoForm" onSubmit={handleSubmit}>
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="todo-input"
            placeholder="What is the task today"
          />

          <button type="submit" className="todo-btn">
            {editId ? "Update task" : "Add task"}
          </button>
        </form>
        {list.length > 0 && (
          <div className="Todo">
            {list.map((item) => (
              <li key={item.id}>
                {editId === item.id ? (
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                  />
                ) : (
                  item.name
                )}
                <FontAwesomeIcon
                  icon={faPenToSquare}
                  className="icon"
                  onClick={() => handleEdit(item.id)}
                />
                <FontAwesomeIcon
                  icon={faTrash}
                  className="icon"
                  onClick={() => handleDelete(item.id)}
                />
              </li>
            ))}
          </div>
        )}
        {list.length === 0 && <p>No items in the list.</p>}
      </div>
    </>
  );
}

export default TodoForm;
