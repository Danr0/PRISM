import * as React from 'react';
import NavBar from "../../components/NavBar";
import Counter from '../../components/EmailList';
import {useStyles} from "../../../style";
import {Box} from "@material-ui/core";

export const Mail: React.FC = () => {
  return (
    <div>
        <Box className={useStyles().bg}>
            <Box display="flex" p={1} >
                <NavBar name={'Авторизация'}/>
            </Box>
            <Box display='flex' justifyContent="center" p={10} >
                <Counter/>
            </Box>
        </Box>
    </div>
  );
}
