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
        size: 40,
        color: 'blue'
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
        // TODO: add blacklisting deleted tokens in back
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
      <FormControl className={classes.profile_form}>
          <div className={classes.logoswithtext}>
              <SvgLogo size={logo_svg.size} color={logo_svg.color}></SvgLogo>
              <h1 className={classes.text_style}>{username}</h1>
              <Button className={classes.logout_button} onClick={logout}>Log out</Button>
          </div>
          {localStorage.getItem('token') == null && <Redirect to='/login' />}
      </FormControl>

  )
}

export default Profile;
