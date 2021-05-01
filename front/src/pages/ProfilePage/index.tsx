import React, { useEffect } from 'react';
import Profile from "../../components/Profile";
import NavBar from '../../components/NavBar';
import {Box} from "@material-ui/core";
import {useStyles} from "../../../style";

const ProfilePage: React.FC = () => {

  useEffect(() => {
    //getNewsList();
  },[]);

  return(
      <div>
          <Box className={useStyles().bg}>
                  <Profile/>
          </Box>
      </div>
  )
}

export default ProfilePage;
