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

// Define a type for the slice state
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

// Define the initial state using that type
const initialState: listMails = {
  mails: []
}

export const mailsSlice = createSlice({
  name: 'mails',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    changeMails: (state, action:PayloadAction<mail[]>) => {
      state.mails = action.payload
    }
  }
})

export const { changeMails } = mailsSlice.actions

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value

export default mailsSlice.reducer
