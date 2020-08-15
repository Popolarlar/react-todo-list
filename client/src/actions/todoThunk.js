import {
  createTodo,
  removeTodo,
  completeTodo,
  loadTodosInProgress,
  loadTodosFailure,
  loadTodosSuccess,
} from "./todoAction";

// This is a function as middleware to dispatch different actions with async ability
// GET http://localhost:5000/api/todos
export const loadTodos = () => async (dispatch, getState) => {
  try {
    dispatch(loadTodosInProgress());

    const response = await fetch("/api/todos");
    const responseBody = await response.json();
    dispatch(loadTodosSuccess(responseBody));
  } catch (error) {
    dispatch(loadTodosFailure());
    // dispatch(displayAlert(error));
    displayAlert(error);
  }
};

// POST http://localhost:5000/api/todos with body{text:"..."}
export const addTodoRequest = (text) => async (dispatch, getState) => {
  try {
    const requestBody = JSON.stringify({ text });
    const response = await fetch("/api/todos", {
      headers: { "Content-Type": "application/json" },
      method: "post",
      body: requestBody,
    });
    const responseBody = await response.json();

    if (response.ok) {
      dispatch(createTodo(responseBody));
    } else {
      throw Error(`${responseBody.message}`);
    }
  } catch (error) {
    // dispatch(displayAlert(error));
    displayAlert(error);
  }
};

// DELETE http://localhost:5000/api/todos/:id
export const deleteTodoRequest = (id) => async (dispatch, getState) => {
  try {
    const response = await fetch(`/api/todos/${id}`, {
      method: "delete",
    });
    const responseBody = await response.json();

    if (response.ok) {
      dispatch(removeTodo(responseBody));
    } else {
      throw Error(`${responseBody.message}`);
    }
  } catch (error) {
    // dispatch(displayAlert(error));
    displayAlert(error);
  }
};

// POST http://localhost:5000/api/todos/:id/completed
export const updateTodoRequest = (id) => async (dispatch, getState) => {
  try {
    const response = await fetch(`/api/todos/${id}/completed`, {
      method: "post",
    });
    const responseBody = await response.json();

    if (response.ok) {
      dispatch(completeTodo(responseBody));
    } else {
      throw Error(`${responseBody.message}`);
    }
  } catch (error) {
    // dispatch(displayAlert(error));
    displayAlert(error);
  }
};

export const displayAlert = (text) => {
  alert(text);
};
