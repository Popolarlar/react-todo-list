import React, { useState } from "react";
import { connect } from "react-redux";
import { addTodoRequest } from "../../actions/todoThunk";
import { getTodos } from "../../selectors/selectors";
import { TextField } from "@material-ui/core";

// Styled-components
// const NewTodoFormConatiner = styled.div`
//   border-radius: 8px;
//   padding: 16px;
//   text-align: center;
//   box-shadow: 0 4px 8px grey;
// `;

// const NewTodoInput = styled.input`
//   font-size: 16px;
//   padding: 8px;
//   border: none;
//   border-bottom: 2px solid #ddd;
//   border-radius: 8px;
//   width: 70%;
//   outline: none;
// `;

// const NewTodoButton = styled.button`
//   font-size: 16px;
//   padding: 8px;
//   border: none;
//   border-radius: 8px;
//   outline: none;
//   cursor: pointer;
//   margin-left: 8px;
//   width: 20%;
//   background-color: lightskyblue;
//   color: white;
// `;

const NewTodoForm = ({ todos, onCreatePressed }) => {
  const [inputValue, setInputValue] = useState("");

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        // Check if the text is existed in the current state:todos
        const isDuplicateText = todos.some((todo) => todo.text === inputValue);

        if (!isDuplicateText) {
          onCreatePressed(inputValue);
          setInputValue("");
        }
      }}
    >
      <TextField
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
        placeholder="exciting new todo!"
        variant="outlined"
        margin="normal"
        fullWidth
      ></TextField>
    </form>
  );
};

// export default NewTodoForm;

// Pass in the object that represents the entire Redux state: todos
const mapStateToProps = (state) => ({
  // todos: state.todos,
  todos: getTodos(state),
});

// dispatch(action) -> to store which will change the state
const mapDispatchToProps = (dispatch) => ({
  // onCreatePressed: (text) => dispatch(createTodo(text)),
  onCreatePressed: (text) => dispatch(addTodoRequest(text)),
});

// connect()(): higher order function that we call it with two different sets of arguments
// connect()(the component we want to connect to the redux store: NewTodoForm)

export default connect(mapStateToProps, mapDispatchToProps)(NewTodoForm);
