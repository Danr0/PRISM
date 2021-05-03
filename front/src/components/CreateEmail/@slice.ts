import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {fetchDataAuth} from '../../utils/API';
import RichTextEditor, {EditorValue} from 'react-rte';

export interface NewAttachment {
    filename: string;
    content: string;
    encoding: string;
}

export interface NewMail {
    from: string;
    to: string[];
    subject: string;
    body: string;
    attachments: NewAttachment[]
}

export interface ResponceEmail {
    body: string;
    attachments: string;
    subject: string;
    from: string;
    to: string;
    user_id: number;
    id: number;
}
const initialState: NewMail = {
    from: '',
    to: [],
    subject: '',
    body: '',
    attachments: []
}

export const createNewTask = createAsyncThunk(
    'mail/new',
    async (data: NewMail) => {
        const postOptions = {
            body: JSON.stringify({from: data.from,
                to: data.to,
                subject: data.subject,
                body: data.body,
                attachments: data.attachments
            }),
            method: 'POST',
        };
        const response = await fetchDataAuth('api/mails', postOptions);
        if (response !== null)
            return await (response.json()) as ResponceEmail;
    }
)

export const NewMailSlice = createSlice({
    name: 'new/task',
    initialState,
    reducers: {
        changeFrom: (state, action:PayloadAction<string>) => {
            state.from = action.payload
        },
        changeTo: (state, action:PayloadAction<string[]>) => {
            state.to = action.payload
        },
        changeSubject: (state, action:PayloadAction<string>) => {
            state.subject = action.payload
        },
        changeBody: (state, action:PayloadAction<string>) => {
            state.body = action.payload
        },
        changeNewAttachments: (state, action:PayloadAction<NewAttachment[]>) => {
            state.attachments = action.payload
        },
        addNewAttachments: (state, action:PayloadAction<NewAttachment>) => {
            state.attachments.push(action.payload)
        }
    }
})

export const {changeFrom, changeTo, changeSubject, changeBody, changeNewAttachments, addNewAttachments } = NewMailSlice.actions

export default NewMailSlice.reducer