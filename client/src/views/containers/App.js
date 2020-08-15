import React from "react";
import TodoList from "../components/TodoList";
import ScrollTop from "../components/ScrollTop";
import {
  Container,
  Typography,
  Toolbar,
  CssBaseline,
  Fab,
} from "@material-ui/core";
import MenuAppBar from "../components/MenuAppBar";
import { makeStyles } from "@material-ui/core/styles";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../../theme";
// const theme = {};

const useStyles = makeStyles((theme) => ({
  offset: theme.mixins.toolbar,
}));

function App() {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MenuAppBar />

      <div className={classes.offset} />

      <Toolbar id="back-to-top-anchor" />
      <Container maxWidth="sm">
        <Typography variant="h1" color="primary">
          What's next?
        </Typography>
        <TodoList />
      </Container>

      <ScrollTop>
        <Fab color="primary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </ThemeProvider>
  );
}

export default App;
