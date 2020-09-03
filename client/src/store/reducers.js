import {
  CREATE_TODO,
  REMOVE_TODO,
  COMPLETE_TODO,
  LOAD_TODOS_IN_PROGRESS,
  LOAD_TODOS_SUCCESS,
  LOAD_TODOS_FAILURE,
} from "../actions/todoAction";

/*
 * Reducers specify how the application's state changes in response to actions sent to the store.
 * The reducer is a pure function that takes the previous state and an action, and returns the next state.
 * Given the same arguments, it should calculate the next state and return it.
 * No surprises. No side effects. No API calls. No mutations. Just a calculation.
 */

/* State overview
 * {
 *    todos: {
 *       data: [...],
 *       isLoading: false,
 *    },
 * }
 */
const todosInitialState = { data: [], isLoading: false };

export const todos = (state = todosInitialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case CREATE_TODO: {
      const { todo } = payload;
      return { ...state, data: state.data.concat(todo) };
    }
    case REMOVE_TODO: {
      const { deletedTodo } = payload;
      return {
        ...state,
        data: state.data.filter((todo) => todo.text !== deletedTodo.text),
      };
    }
    case COMPLETE_TODO: {
      const { updatedTodo } = payload;
      return {
        ...state,
        data: state.data.map((todo) => {
          if (todo.text === updatedTodo.text) {
            return updatedTodo;
          }
          return todo;
        }),
      };
    }
    case LOAD_TODOS_SUCCESS: {
      const { todos } = payload;
      return {
        ...state,
        data: todos,
        isLoading: false,
      };
    }
    case LOAD_TODOS_IN_PROGRESS: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case LOAD_TODOS_FAILURE: {
      return {
        ...state,
        isLoading: false,
      };
    }

    default: {
      return state;
    }
  }
};
