import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import store from "./Redux/store";
import { Provider } from "react-redux";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { BrowserRouter } from "react-router-dom";
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
    < GoogleOAuthProvider
                    clientId="338803464375-n2h6tvo0svapakc335g6mqar5u4a90ru.apps.googleusercontent.com">
      <App />
      </GoogleOAuthProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
