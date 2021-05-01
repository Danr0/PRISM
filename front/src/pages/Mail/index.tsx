import * as React from 'react';
import MailList from '../../components/EmailList';
import {useStyles} from "../../../style";
import {Box} from "@material-ui/core";
import Profile from "../../components/Profile";

export const Mail: React.FC = () => {
  return (
    <div>
        <Box className={useStyles().bg}>
            <Box display="flex" p={0} >
                <Profile/>
            </Box>
            <Box display='flex' justifyContent="center"  p={10} >
                <MailList/>
            </Box>
        </Box>
    </div>
  );
}
