import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {fetchDataAuth} from '../../utils/API'


export interface ErorMsg {
    id: number;
    mail_id: string;
    err_msg: string;
    to: string;
}

export interface ErrorsList {
    errors: ErorMsg[];
}

const initialState: ErrorsList = {
    errors: []
}

export const getErrors = createAsyncThunk(
    'errors/get',
    async  (id: string) =>{
        const response = await fetchDataAuth('/api/errors/'+id);
        if (response !== null)
            return await (response.json()) as ErrorsList;
    }
)

export const ErrorMsgSlice = createSlice({
        name: 'errors',
        initialState,
        reducers: {
            changeErrors: (state, action:PayloadAction<ErorMsg[]>) => {
                state.errors = action.payload
            }
        }
})

export const { changeErrors } = ErrorMsgSlice.actions

export default ErrorMsgSlice.reducer