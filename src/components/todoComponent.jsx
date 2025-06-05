import React from 'react'
import { add_todo, delete_todo, update_todo } from "../redux/actions/actionCreators";
import { useSelector } from "react-redux";
import { useDispatch} from "react-redux";
import { useState ,useRef,useEffect} from "react";

const TodoComponent = () => {


    const todos = useSelector((state) => state);
    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos])

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
                        className='italic text-4xl mb-20 font-bold bg-gray-500 text-white p-2 rounded-md'
                >{update == null ? "Add Todo" : "Update Todo"}</h1>
            <form onSubmit={handleSubmit}>
                    <input
                            className="bg-gray-100 border-solid rounded-sm border-2 border-gray-300 hover:bg-gray-200 p-2 w-2/3"

                    autoFocus
                    ref={inputRef}
                    type="text"
                    placeholder={update == null ? "Enter Todo" : "Update Todo"}
                />
                <button
                            className="bg-sky-300 border-solid rounded-md border-sky-500 hover:bg-sky-500 hover:border-sky-600 ml-10 p-1"
                    type="submit">{update == null ? "Add Todo" : "Update Todo"}</button>
                    </form>
                    <p className="text-center text-lg text-gray-700 mt-4 px-4">
                        Organize your day with this simple Todo App. Add, update, or delete tasks as you go — and don’t worry, your data is saved even if you close the browser!
                    </p>


            </div>
            <div className='mt-10 bg-gray-300 p-4 rounded-md'
            >
                    <h1 className='italic text-4xl mb-20 font-bold bg-gray-500 text-white p-2 rounded-md'>Todo List</h1>
                <ul >
                {todos && todos.map((todo) => {
                    return(
                        <li className='text-2xl text-center p-2 m-2 bg-gray-100 rounded-md flex justify-between items-center'
                            key={todo.id}>
                        {todo.task}
                            <button
                                className="bg-red-400 border-solid rounded-md border-sky-300 hover:bg-sky-500 hover:border-sky-600 ml-auto"
                        onClick={()=>dispatch(delete_todo(todo.id))}
                        >Delete</button>
                            <button
                                className="bg-green-400 border-solid rounded-md  border-sky-500 hover:bg-sky-500 hover:border-sky-600"
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