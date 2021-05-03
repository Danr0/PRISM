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
    useTheme, IconButton, TablePagination, Link
} from "@material-ui/core";
import {useEffect} from "react";
import {makeStyles} from "@material-ui/core/styles";
import LastPageIcon from '@material-ui/icons/LastPage';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import PropTypes from 'prop-types';
import { setPage, setRowsPerPage, changeCurrent } from './viewslice';
import {UpdateLogo} from '../UpdateLogo/logo';
import ErrorsList from "../ErrorList/index";


interface attachment {
    filename: string;
    content: string;
    encoding: string;
}

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

    //const [page, setPage] = React.useState(0);
    //const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const page = useAppSelector(state => state.mail_view.page);
    const rowsPerPage = useAppSelector(state => state.mail_view.rowsPerPage);
    const currentEmail = useAppSelector(state => state.mail_view.currentEmail);

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, mails.length - page * rowsPerPage);
    const handleChangePage = (event: any, newPage: any) => {
      //setPage(newPage);
        dispatch(setPage(newPage));
    };
    const handleChangeRowsPerPage = (event:any) => {
      //setRowsPerPage(parseInt(event.target.value, 10));
      //setPage(0);
        dispatch(setRowsPerPage(parseInt(event.target.value, 10)));
        dispatch(setPage(0));
    };

  return (
      <FormControl className={classes.mails_form}>
          <div className={classes.mail_menu}>
              <div className={classes.mail_menu_buttons}>
                  <Button onClick={() => {updateMails()}} className={classes.update_button}><UpdateLogo size={30} color={'white'}></UpdateLogo></Button>
                  <Link href="/new"><Button className={classes.button_new_task}>New Task</Button></Link>
              </div>
            <TableContainer className={classes.mail_menu_table}  component={Paper}>
              <Table  aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TablePagination className={classes.table_pagination}
                        rowsPerPageOptions={[5, 10, 25]}
                        colSpan={3}
                        count={mails.length}
                        labelRowsPerPage=''
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                        ActionsComponent={TablePaginationActions}
                    />
                  </TableRow>
                    <TableRow>
                        <TableCell className={classes.text_bold}>Subject</TableCell>
                        <TableCell className={classes.text_bold} align="right">From</TableCell>
                        <TableCell className={classes.text_bold} align="right">Targets</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                  {(rowsPerPage > 0
                          ? mails.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                          : mails
                  ).map((row, index) => (
                      <TableRow onClick={() => dispatch(changeCurrent(index + page * rowsPerPage))} key={row.id}>
                        <TableCell className={classes.text_d} component="th" scope="row">
                          {row.subject}
                        </TableCell>
                        <TableCell className={classes.text_d} align="right">{row.from}</TableCell>
                          <TableCell className={classes.text_d} align="right">{JSON.parse(row.to).length}</TableCell>
                      </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        <div className={classes.mail_view}>
            {currentEmail !== -1 && <div>
                <div className={classes.field}>
                    <div className={classes.text_bold}>
                        From:
                    </div>
                    <div className={classes.text_filed}>
                        {mails[currentEmail].from}
                    </div>
                </div>

                <div className={classes.field}>
                    <div className={classes.text_bold}>
                        To:
                    </div>
                    <div className={classes.text_filed}>
                        {JSON.parse(mails[currentEmail].to).join(', ')}
                    </div>
                </div>

                <div className={classes.field}>
                    <div className={classes.text_bold}>
                        Subject:
                    </div>
                    <div className={classes.text_filed}>
                        {mails[currentEmail].subject}
                    </div>
                </div>

                <div className={classes.mail_body}>
                    <div className={classes.text_bold}>
                        Body:
                    </div>
                    <div className={classes.text_filed}>
                        {mails[currentEmail].body}
                    </div>
                </div>

                <div className={classes.field}>
                    <div className={classes.text_bold}>
                        Attachments:
                    </div>
                    <div className={classes.text_filed}>
                        <div className={classes.mail_menu_attachments}>
                            {JSON.parse(mails[currentEmail].attachments).map((row: attachment) => (
                                <a className={classes.attachments_menu} download={row.filename} href={"data:image/png;base64,"+row.content}>{row.filename}</a>
                            ))}
                        </div>
                    </div>
                </div>

                <ErrorsList id={mails[currentEmail].id.toString()}></ErrorsList>
            </div>
            }
            {currentEmail === -1 &&
            <div className={classes.field}>
                <div className={classes.text_bold}>
                    Select task to view
                </div>
            </div>
            }
        </div>
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