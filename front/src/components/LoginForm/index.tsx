import * as React from 'react';
import {TextField, Button, FormControl, Slide, IconButton} from '@material-ui/core';
import { Alert, AlertTitle,  } from '@material-ui/lab'
import CloseIcon from '@material-ui/icons/Close';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeLogin, changePassword, changeError, loginUser } from './@slice';
import {useStyles} from "../../../style";

const LoginForm: React.FC  = () => {
    const classes = useStyles();
  const login = useAppSelector(state => state.loginForm.login);
  const password = useAppSelector(state => state.loginForm.password);
  const status = useAppSelector(state => state.loginForm.loading)
    const error = useAppSelector(state => state.loginForm.error)

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
    <div>
        <FormControl className={classes.input_form}>
            <h1 className={classes.text}>Login</h1>
      <TextField  className={classes.input} id="username" placeholder="username" label="Username" InputLabelProps={{style: { color: 'black' }}}
                  value={login}
                  onChange={(event) => dispatch(changeLogin(event.target.value))}/>
      <TextField className={classes.input} id="password" placeholder="password" label="Password" InputLabelProps={{style: { color: 'black' }}}
                  value={password}
                  onChange={(event) => dispatch(changePassword(event.target.value))}/>
      <Button className={classes.button} onClick={
        () => dispatch(loginUser({login, password}))
      }>Login</Button>
        </FormControl>
        {error !== '' && alertForm()}
    </div>
  )
}

export default LoginForm;
