
import { add_todo, delete_todo, update_todo } from "../redux/actions/actionCreators";
import { useSelector } from "react-redux";
import { useDispatch} from "react-redux";
import { useState ,useRef} from "react";

const TodoComponent = () => {

    const todos=useSelector((state) => state);
    const dispatch = useDispatch();
    const [update, setUpdate] = useState(null);
    const inputRef = useRef();
    const handleSubmit = (e) => {
        e.preventDefault();
        if (update == null) {
            if (inputRef.current.value.trim() != ""){
                dispatch(add_todo({
                    id: Date.now(),
                    task:inputRef.current.value
                }))
                inputRef.current.value = "";
                setUpdate(null);
            } else {
                alert("Please enter a todo");
            }
        } else {
            if (inputRef.current.value.trim() != "") {
                dispatch(update_todo(update.id, inputRef.current.value));
                setUpdate(null);
                inputRef.current.value = "";
            }
        }
    }

    return (
        <div>
            <h1>Todo List</h1>
            <h3>{update == null ? "Add Todo" : "Update Todo"}</h3>
            <form onSubmit={handleSubmit}>
                <input
                    ref={inputRef}
                    type="text"
                    placeholder={update == null ? "Enter Todo" : "Update Todo"}
                />
                <button type="submit">{update == null ? "Add Todo" : "Update Todo"}</button>
            </form>
            <ul>
                {todos && todos.map((todo) => {
                    return(
                    <li key={todo.id}>
                        {todo.task}
                        <button
                        onClick={()=>dispatch(delete_todo(todo.id))}
                        >Delete</button>
                        <button
                            onClick={() => {
                            inputRef.current.value = todo.task;
                                setUpdate(todo);
                        }}
                        >Update</button>
                        </li>
                    )
                }
                )}
            </ul>
        </div>
    )
}
export default TodoComponent;