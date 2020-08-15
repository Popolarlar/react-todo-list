import React, { useEffect } from "react";
import { connect } from "react-redux";
import TodoListItem from "./TodoListItem";
import NewTodoForm from "./NewTodoForm";
import {
  loadTodos,
  deleteTodoRequest,
  updateTodoRequest,
} from "../../actions/todoThunk";
import {
  getTodosLoading,
  getIncompleteTodos,
  getCompletedTodos,
} from "../../selectors/selectors";

import { List, ListSubheader } from "@material-ui/core";

const TodoList = ({
  completedTodos,
  incompleteTodos,
  isLoading,
  onRemovePressed,
  onCompletePressed,
  startLoadingTodos,
}) => {
  useEffect(() => {
    startLoadingTodos();
  }, []);

  const loadingMessage = <div>Loading todos...</div>;

  const todoContent = (
    <>
      <ListSubheader>Incomplete:</ListSubheader>
      {/* <Typography varient="h2">Incomplete:</Typography> */}

      {incompleteTodos.map((todo) => (
        <TodoListItem
          key={todo.id}
          todo={todo}
          onRemovePressed={onRemovePressed}
          onCompletePressed={onCompletePressed}
        />
      ))}
    </>
  );

  const doneContent = (
    <>
      <ListSubheader>Complete:</ListSubheader>
      {completedTodos.map((todo) => (
        <TodoListItem
          key={todo.id}
          todo={todo}
          onRemovePressed={onRemovePressed}
          onCompletePressed={onCompletePressed}
        />
      ))}
    </>
  );

  const content = (
    <>
      <NewTodoForm />
      <List>
        {todoContent}
        {doneContent}
      </List>
    </>
  );

  return isLoading ? loadingMessage : content;
};

const mapStateToProps = (state) => ({
  isLoading: getTodosLoading(state),
  completedTodos: getCompletedTodos(state),
  incompleteTodos: getIncompleteTodos(state),
});

const mapDispatchToProps = (dispatch) => ({
  onRemovePressed: (id) => dispatch(deleteTodoRequest(id)),
  onCompletePressed: (id) => dispatch(updateTodoRequest(id)),
  startLoadingTodos: () => dispatch(loadTodos()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
