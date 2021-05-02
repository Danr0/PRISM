import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface viewMails {
    page: number;
    rowsPerPage: number;
    currentEmail: number;
}

const initialState: viewMails = {
    page: 0,
    rowsPerPage: 5,
    currentEmail: -1
}

export const mailViewSlice = createSlice({
    name: 'mail_view',
    initialState,
    reducers: {
        setPage: (state, action:PayloadAction<number>) => {
            state.page = action.payload
        },
        setRowsPerPage: (state, action:PayloadAction<number>) => {
            state.rowsPerPage = action.payload
        },
        changeCurrent: (state, action:PayloadAction<number>) => {
            state.currentEmail = action.payload
        },
    }
})

export const { setPage, setRowsPerPage, changeCurrent} = mailViewSlice.actions;

export default mailViewSlice.reducer;