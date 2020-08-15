import React from "react";
// import styled from "styled-components";
import {
  ListItem,
  Checkbox,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Typography,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

const TodoListItem = ({ todo, onRemovePressed, onCompletePressed }) => {
  return (
    <ListItem key={todo.key} dense button>
      <Checkbox
        tabIndex={-1}
        disableRipple
        onClick={() => onCompletePressed(todo.id)}
        checked={todo.isCompleted ? true : false}
      />

      <ListItemText
        primary={todo.text}
        secondary={
          <Typography component="span" variant="body2" color="textPrimary">
            {new Date(todo.createdAt).toLocaleDateString()}
          </Typography>
        }
      />

      <ListItemSecondaryAction>
        <IconButton
          aria-label="Delete"
          onClick={() => onRemovePressed(todo.id)}
        >
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default TodoListItem;
