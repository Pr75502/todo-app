import React from 'react'
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
            <p className='italic text-6xl text-center bg-gray-800 text-white'>TODO APP</p>
        <div className="grid grid-cols-2 gap-2 text-center bg-gray-200 min-h-lvh  " >
            <div className='mt-10 bg-gray-300 p-4 rounded-md'>
                <h1
                    className='italic text-4xl mb-20 '
                >{update == null ? "Add Todo" : "Update Todo"}</h1>
            <form onSubmit={handleSubmit}>
                    <input
                        className='"grid grid-cols-3 grid-rows-3 gap-4" bg-gray-100 border-solid rounded-sm border-2 border-gray-300 hover:bg-gray-200'
                    autoFocus
                    ref={inputRef}
                    type="text"
                    placeholder={update == null ? "Enter Todo" : "Update Todo"}
                />
                <button
                        className="bg-sky-600 border-solid rounded-md border-2 border-sky-500 hover:bg-sky-500 hover:border-sky-600 ml-10"
                    type="submit">{update == null ? "Add Todo" : "Update Todo"}</button>
                </form>
            </div>
            <div className='mt-10 bg-gray-300 p-4 rounded-md'
            >
                <h1 className='italic text-4xl '>Todo List</h1>
                <ul >
                {todos && todos.map((todo) => {
                    return(
                        <li className='text-2xl text-center p-2 m-2 bg-gray-500 rounded-md flex justify-between items-center'
                            key={todo.id}>
                        {todo.task}
                            <button
                                className="bg-red-400 border-solid rounded-md border-2 border-sky-700 hover:bg-sky-500 hover:border-sky-600 ml-auto"
                        onClick={()=>dispatch(delete_todo(todo.id))}
                        >Delete</button>
                            <button
                                className="bg-green-400 border-solid rounded-md border-2 border-sky-500 hover:bg-sky-500 hover:border-sky-600"
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
            </div>
        </div>
    )
}
export default TodoComponent;