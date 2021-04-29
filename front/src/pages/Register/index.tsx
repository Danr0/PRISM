import * as React from 'react';
import NavBar from "../../components/NavBar";
import RegisterForm from "../../components/RegisterForm";
import {Box} from "@material-ui/core";
import {useStyles} from "../../../style";

export const Register: React.FC = () => {
    const classes = useStyles();
  return (
      <div>
          <Box className={classes.bg}>
              <Box display="flex" p={1} >
                  <NavBar name={'Авторизация'}/>
              </Box>
              <Box display='flex' justifyContent="center" p={10} >
                  <RegisterForm/>
              </Box>
          </Box>
      </div>
  );

}
