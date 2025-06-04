

import { ADD_TODO, DELETE_TODO, UPDATE_TODO } from "./actionTypes";
export const add_todo = (task) => {
    return {
        type: ADD_TODO,
       payload: task
    }
}
export const delete_todo = (task_id) => {
    return {
        type: DELETE_TODO,
        payload:task_id
    }
}
export const update_todo = (todo_id,task) => {
    return {
        type: UPDATE_TODO,
        payload: {id:todo_id,task:task}
    }
}