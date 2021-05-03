import * as React from 'react';
import {Redirect} from "react-router-dom";

export const Root: React.FC = () => (
  <div>
      <Redirect to='/mail' />
  </div>
)
