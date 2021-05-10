import React  from 'react';
import CreateEmail from '../../components/CreateEmail';
import {useStyles} from "../../../style";
import {Box} from "@material-ui/core";
import Profile from "../../components/Profile";


const NewTask: React.FC = () => {

  return(
      <div>
          <Box className={useStyles().bg}>
              <Box display="flex" p={0} >

              </Box>
              <Box display='flex' justifyContent="center" p={10} >
                  <CreateEmail/>
              </Box>
          </Box>
      </div>
  )
}

export default NewTask;

// <Profile/>
