import * as React from 'react';
import RegisterForm from "../../components/RegisterForm";
import {Box} from "@material-ui/core";
import {useStyles} from "../../../style";

export const Register: React.FC = () => {
    const classes = useStyles();
  return (
      <div>
          <Box className={classes.bg}>
              <Box display='flex' justifyContent="center" p={10} >
                  <RegisterForm/>
              </Box>
          </Box>
      </div>
  );

}
