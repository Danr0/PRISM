import React, {useEffect} from 'react';
import {useStyles} from "../../../style";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {changeErrors, getErrors, ErorMsg} from "./@slice";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";

interface ErrorsListProps {
    id: string
}

const ErrorsList: React.FC<ErrorsListProps> = props => {
    const classes = useStyles();
    const errors = useAppSelector(state => state.errors.errors);
    const dispatch = useAppDispatch();

    async function updateErrors(id: string) {
        const resp = await dispatch(getErrors(id));
        const data = resp.payload as ErorMsg[];
        console.log(data);
        dispatch(changeErrors(data));
    }

    // update profile then load page
    useEffect(() => {
        if (localStorage.getItem('token') !== null)
            updateErrors(props.id);
    }, [props]);
    return(
        <div>
            <div className={classes.field}>
                <div className={classes.text_bold}>
                    Total errors:
                </div>
                <div className={classes.text_filed}>
                    {errors.length}
                </div>
            </div>
            <div className={classes.error_table_div}>
                { errors.length > 0 &&
                    <TableContainer className={classes.error_table} component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>To</TableCell>
                                    <TableCell align="right">Error</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {errors.map((row) => (
                                    <TableRow key={row.id}>
                                        <TableCell component="th" scope="row">
                                            {row.to}
                                        </TableCell>
                                        <TableCell align="right">{row.err_msg}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                }
            </div>
        </div>
    )
}

export default ErrorsList;
