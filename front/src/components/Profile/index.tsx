import React, {useEffect} from 'react';
import {useStyles} from "../../../style";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {getProfile, changeEmail, changeUsername, changeAvatar, UserData} from "./@slice";
import {Button, FormControl} from "@material-ui/core";
import {SvgLogo} from "../Logo/logo";
import {Redirect} from "react-router-dom";


const Profile: React.FC  = () => {
    const classes = useStyles();
    const email = useAppSelector(state => state.profile.email);
    const username = useAppSelector(state => state.profile.username);
    const avatar = useAppSelector(state => state.profile.avatar);
    const dispatch = useAppDispatch();

    const logo_svg = {
        size: 80,
        color: 'white'
    };

    async function updateProfile(){
        const resp = await dispatch(getProfile());
        console.log(resp.payload);
        const data = resp.payload as UserData;
        dispatch(changeUsername(data.username));
        dispatch(changeAvatar(data.avatar));
        dispatch(changeEmail(data.email));
    }

    function logout(){
        // TODO: add blacklisting deleted tokens on back
        localStorage.removeItem('token');
        dispatch(changeUsername(''));
        dispatch(changeAvatar(null));
        dispatch(changeEmail(''));
    }

    // update profile then load page
    useEffect(() => {
        if (localStorage.getItem('token') !== null)
            updateProfile();
    }, []);
  return(
      <div className={classes.profile}>
          <div className={classes.logo_profile}>
          <SvgLogo  size={logo_svg.size} color={logo_svg.color}></SvgLogo>
          </div>
          <FormControl className={classes.profile_form}>
              <div className={classes.logoswithtext}>

                  <h1 className={classes.text_style}>{username}</h1>
                  <Button className={classes.logout_button} onClick={logout}>Log out</Button>
              </div>
              {localStorage.getItem('token') == null && <Redirect to='/login' />}
          </FormControl>
      </div>
  )
}

export default Profile;
