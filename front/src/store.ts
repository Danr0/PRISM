import {createBrowserHistory} from "history";
import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import {connectRouter} from "connected-react-router";
import mailsReducer from './components/EmailList/@slice';
import loginFormReducer from './components/LoginForm/@slice';
import registerFormReducer from './components/RegisterForm/@slice';
import getUserProfileReducer from "./components/Profile/@slice";
import mailViewReducer from './components/EmailList/viewslice';
import ErrorMsgReducer from './components/ErrorList/@slice';
import NewMailReducer from "./components/CreateEmail/@slice";

export const history = createBrowserHistory();

const middleware = getDefaultMiddleware({thunk: true})

const reducer = {
  router: connectRouter(history),
  mails: mailsReducer,
  loginForm: loginFormReducer,
  registerForm: registerFormReducer,
  profile: getUserProfileReducer,
  mail_view: mailViewReducer,
  errors: ErrorMsgReducer,
  new_task: NewMailReducer
}

export const store = configureStore({
  reducer,
  middleware
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
