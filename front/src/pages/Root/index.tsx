import * as React from 'react';
import NavBar from "../../components/NavBar";
import {Box} from "@material-ui/core";
import {useStyles} from "../../../style";

export const Root: React.FC = () => (
  <div>
      <Box className={useStyles().bg}>
          <Box display="flex" p={1} >
              <NavBar name={'Авторизация'}/>
          </Box>
          <Box display='flex' justifyContent="center" p={10} >
              <h1> Hey </h1>
          </Box>
      </Box>
  </div>
)
