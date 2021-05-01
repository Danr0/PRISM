import * as React from 'react';
import {TextField, Button, FormControl, Slide, IconButton} from '@material-ui/core';
import { Alert, AlertTitle,  } from '@material-ui/lab'
import CloseIcon from '@material-ui/icons/Close';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeLogin, changePassword, changeError, loginUser } from './@slice';
import {useStyles} from "../../../style";
import {SvgLogo} from "../Logo/logo";
import { Link, Redirect } from 'react-router-dom';

const LoginForm: React.FC  = () => {
    const classes = useStyles();
  const login = useAppSelector(state => state.loginForm.login);
  const password = useAppSelector(state => state.loginForm.password);
  const status = useAppSelector(state => state.loginForm.loading);
    const error = useAppSelector(state => state.loginForm.error);
    const logo_svg = {
        size: 50,
        color: 'blue'
    };

  const dispatch = useAppDispatch();

    function alertForm() {
        return (
            <div className="alert" >
                <Slide direction="up" in={error !== ''}  mountOnEnter unmountOnExit>
                    <Alert
                        severity="error"
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    dispatch(changeError(''));
                                }}
                            >
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }
                    >
                        {error}
                    </Alert>
                </Slide>
            </div>
        )
    }

  return (
    <div className={classes.login_wrapper}>
        <FormControl className={classes.login_form}>
            <div className={classes.logoswithtext}>
                <SvgLogo size={logo_svg.size} color={logo_svg.color}></SvgLogo>
                <h1 className={classes.text}>Login</h1>
            </div>

      <TextField  className={classes.input} id="username" placeholder="username" label="Username" InputLabelProps={{style: { color: 'black' }}}
                  value={login}
                  onChange={(event) => dispatch(changeLogin(event.target.value))}/>
      <TextField className={classes.input} id="password" placeholder="password" label="Password" InputLabelProps={{style: { color: 'black' }}}
                  value={password}
                  onChange={(event) => dispatch(changePassword(event.target.value))}/>
      <Button className={classes.button} onClick={
        () => dispatch(loginUser({login, password}))
      }>Login</Button>
            <Link className={classes.links} to='/register'>Don't have account?</Link>
        </FormControl>
        {error !== '' && alertForm()}
        {localStorage.getItem('token') !== null && <Redirect to='/mail' />}
    </div>
  )
}
// {localStorage.getItem('token') !== null && <Redirect to='/profile' />}
export default LoginForm;
