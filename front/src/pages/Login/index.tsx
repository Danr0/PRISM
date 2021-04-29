import * as React from 'react';
import NavBar from "../../components/NavBar";
import LoginForm from '../../components/LoginForm';
import {Box} from "@material-ui/core";
import {useStyles} from "../../../style";


export const Login: React.FC = () => {

  return (
    <div>
        <Box className={useStyles().bg}>
            <Box display='flex' justifyContent="center" p={10} >
                <LoginForm/>
            </Box>
        </Box>
    </div>

  );

}
/*
            <Box display="flex" p={1} >
                <NavBar name={'Авторизация'}/>
            </Box>

 */
