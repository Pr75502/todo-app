import { ADD_TODO, DELETE_TODO, UPDATE_TODO } from "../actions/actionTypes";

const todosFromStorage = localStorage.getItem("todos");
let initialState;
try {
    initialState = todosFromStorage ? JSON.parse(todosFromStorage) : [];
} catch {
    initialState = [];
}

const TodoReducer = (state = initialState, action) => {
    if (action.type == ADD_TODO) {
        return [...state,action.payload]
    }
    if (action.type == DELETE_TODO) {
        return (
            state.filter((task)=>task.id!=action.payload)
        )
    }
    if (action.type == UPDATE_TODO) {
        return (
            state.map((todo) => {
                if (todo.id == action.payload.id) {
                    return ({
                        ...todo,
                        task:action.payload.task
                    })
                }
                return todo
            })
        )
    }
    return state
    
}
export default TodoReducer