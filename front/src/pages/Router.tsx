import * as React from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Routes from "./routes";

import {Root} from "./Root";
import {Login} from "./Login";
import {Register} from "./Register";
import {Mail} from './Mail';
import NewTask from './NewTask';
import ProfilePage from './ProfilePage'

export const Router: React.FC = () => {
  return(
    <BrowserRouter>
      <React.Suspense fallback={<div/>}>
        <Switch>
          <Route exact path={Routes.ROOT} component={Root}/>
          <Route exact path={Routes.LOGIN} component={Login}/>
          <Route exact path={Routes.MAIL} component={Mail}/>
          <Route exact path={Routes.NEW_TASK} component={NewTask}/>
          <Route exact path={Routes.REGISTER} component={Register}/>
          <Route exact path={Routes.PROFILE} component={ProfilePage}/>
        </Switch>
      </React.Suspense>
    </BrowserRouter>
  )
}
