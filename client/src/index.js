import React from "react";
import ReactDOM from "react-dom";
import App from "./views/containers/App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import { configureStore } from "./store/store";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/lib/integration/react";

const store = configureStore();
const persistor = persistStore(store);

// PERMACRASH!!!!! when the state is screwed up makes the app keep crashing.
// Solution : DELETE the persist data from local storage
// Chrome browser -> Inspect -> Application -> Storage -> LoaclStorage -> delete the persist:root

ReactDOM.render(
  // <Provider store={configureStore()}>

  <Provider store={store}>
    <PersistGate persistor={persistor} loading={<div>Loading...</div>}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
