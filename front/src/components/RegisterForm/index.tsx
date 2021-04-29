import * as React from 'react';
import {TextField, Button, FormControl, Slide, IconButton} from '@material-ui/core';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeLogin, changePassword, changeEmail, changeError, registerUser } from './@slice';
import {useStyles} from "../../../style";
import {Alert} from "@material-ui/lab";
import CloseIcon from "@material-ui/icons/Close";
import {Link} from "react-router-dom";
import {SvgLogo} from "../Logo/logo";

const RegisterForm: React.FC  = () => {
    const classes = useStyles();
  const login = useAppSelector(state => state.registerForm.login);
  const password = useAppSelector(state => state.registerForm.password);
  const email = useAppSelector(state => state.registerForm.email);
  const status = useAppSelector(state => state.registerForm.loading);
    const error = useAppSelector(state => state.loginForm.error)

    const logo_svg = {
        size: 50,
        color: 'blue'
    };

    function alertForm() {
        return (
            <div className="alert">
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

  const dispatch = useAppDispatch();

  return (
    <div>
        <FormControl className={classes.input_form}>
            <div className={classes.logoswithtext}>
                <SvgLogo size={logo_svg.size} color={logo_svg.color}></SvgLogo>
                <h1 className={classes.text}>Registration</h1>
            </div>
            <TextField  className={classes.input} id="email" placeholder="email" label="Email" InputLabelProps={{style: { color: 'black' }}}
                    value={email}
                    onChange={(event) => dispatch(changeEmail(event.target.value))}/>
            <TextField  className={classes.input} id="username" placeholder="username" label="Username" InputLabelProps={{style: { color: 'black' }}}
                  value={login}
                  onChange={(event) => dispatch(changeLogin(event.target.value))}/>
            <TextField  className={classes.input} id="password" placeholder="password" label="Password" InputLabelProps={{style: { color: 'black' }}}
                  value={password}
                  onChange={(event) => dispatch(changePassword(event.target.value))}/>
            <Button className={classes.button} onClick={
                () => dispatch(registerUser({email, login, password}))
            }>Register</Button>
            <Link className={classes.links} to='/login'>Already have account?</Link>
    </FormControl>
        {error !== '' && alertForm()}
    </div>
  )
}

export default RegisterForm;
