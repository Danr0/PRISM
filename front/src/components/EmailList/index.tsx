import * as React from 'react';
import {changeMails, getMails, listMails, mail} from './@slice'
import { useAppDispatch, useAppSelector } from '../../hooks';
import {useStyles} from "../../../style";
import {
  FormControl,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  useTheme, IconButton, TablePagination
} from "@material-ui/core";
import {useEffect} from "react";
import {makeStyles} from "@material-ui/core/styles";
import LastPageIcon from '@material-ui/icons/LastPage';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import PropTypes from 'prop-types';

function TablePaginationActions(props: any) {
  const classes = useStyles();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event: any) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event: any) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event: any) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event: any) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
      <div className={classes.table_style}>
        <IconButton
            onClick={handleFirstPageButtonClick}
            disabled={page === 0}
            aria-label="first page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
            onClick={handleNextButtonClick}
            disabled={page >= Math.ceil(count / rowsPerPage) - 1}
            aria-label="next page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
            onClick={handleLastPageButtonClick}
            disabled={page >= Math.ceil(count / rowsPerPage) - 1}
            aria-label="last page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

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

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, mails.length - page * rowsPerPage);

    const handleChangePage = (event: any, newPage: any) => {
      setPage(newPage);
    };

    const handleChangeRowsPerPage = (event:any) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };

  return (
      <FormControl className={classes.mails_form}>
          <div className={classes.mail_menu}>
            <Button>asd</Button>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TablePagination
                        rowsPerPageOptions={[]}
                        colSpan={3}
                        count={mails.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        SelectProps={{
                          inputProps: { 'aria-label': 'Rows' },
                          native: true,
                        }}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                        ActionsComponent={TablePaginationActions}
                    />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(rowsPerPage > 0
                          ? mails.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                          : mails
                  ).map((row, index) => (
                      <TableRow onClick={() => alert(index + page * rowsPerPage)} key={row.id}>
                        <TableCell className={classes.text_d} component="th" scope="row">
                          {row.subject}
                        </TableCell>
                        <TableCell className={classes.text_d} align="right">{row.from}</TableCell>
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