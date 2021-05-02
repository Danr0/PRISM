import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import { RootState } from '../../store'
import {fetchDataAuth} from "../../utils/API";

export interface mail {
  id: string;
  user_id: string;
  from: string;
  to: string;
  subject: string;
  body: string;
  attachments: string;
}

export interface listMails {
  mails: mail[];
}

export const getMails = createAsyncThunk(
    'mails/all',
    async () => {
      const response = await fetchDataAuth('/api/mails');
      if (response !== null)
        return await (response.json()) as listMails;
    }
)

const initialState: listMails = {
  mails: []
}

export const mailsSlice = createSlice({
  name: 'mails',
  initialState,
  reducers: {
    changeMails: (state, action:PayloadAction<mail[]>) => {
      state.mails = action.payload
    }
  }
})




export const { changeMails } = mailsSlice.actions

export default mailsSlice.reducer
