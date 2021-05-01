import * as React from 'react';
import {changeMails, getMails, listMails, mail} from './@slice'
import { useAppDispatch, useAppSelector } from '../../hooks';
import {useStyles} from "../../../style";
import {FormControl, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button} from "@material-ui/core";
import {useEffect} from "react";

const MailList: React.FC  = () => {
  const mails = useAppSelector(state => state.mails.mails);
  const dispatch = useAppDispatch();
    const classes = useStyles();

    async function updateMails() {
      const resp = await dispatch(getMails());
      const data = resp.payload as mail[];
      console.log(data);
      dispatch(changeMails(data));
    }

  useEffect(() => {
    // firstly update emails oncreate
    if (localStorage.getItem('token') !== null)
      updateMails();

    // after, update emails every 10 sec
    const interval = setInterval(() => {
      if (localStorage.getItem('token') !== null)
        updateMails();
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
      <FormControl className={classes.mails_form}>
          <div className={classes.mail_menu}>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableBody>
                  {mails.map((row) => (
                      <TableRow onClick={() => alert(row.id)} key={row.id}>
                        <TableCell  component="th" scope="row">
                          {row.subject}
                        </TableCell>
                        <TableCell align="right">{row.from}</TableCell>
                      </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        <div className={classes.mail_view}>{(mails.length).toString()}</div>
    </FormControl>
  )
}

export default MailList;

/*
<TableHead>
                  <TableRow>
                    <TableCell>Subject</TableCell>
                    <TableCell align="right">from</TableCell>
                  </TableRow>
                </TableHead>
 */