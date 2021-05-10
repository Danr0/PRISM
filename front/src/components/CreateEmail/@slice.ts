import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {fetchDataAuth} from '../../utils/API';
import RichTextEditor, {EditorValue} from 'react-rte';
import {TransporterObject, createCustomConfig} from "./transporters";

export type mails_types = 'yandex' | 'mail.ru'| 'campus.mephi.ru' | 'google.com' | 'custom';

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
    attachments: NewAttachment[];
    ok: boolean;
    trans_conf: TransporterObject;
    type: mails_types
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
    attachments: [],
    ok: false,
    trans_conf: createCustomConfig('',465,true,'',''),
    type: "custom",
}

export const createNewTask = createAsyncThunk(
    'mail/new',
    async (data: NewMail) => {
        const postOptions = {
            body: JSON.stringify({from: data.from,
                to: data.to,
                subject: data.subject,
                body: data.body,
                attachments: data.attachments,
                transporter: data.trans_conf
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
        },
        changeOk: (state, action:PayloadAction<boolean>) => {
            state.ok = action.payload
        },
        changeType: (state, action:PayloadAction<string>) => {
            state.type = action.payload as mails_types;
        },
        changeTrans_conf: (state, action:PayloadAction<TransporterObject>) => {
            state.trans_conf = action.payload
        },
        changeTransUser: (state, action:PayloadAction<string>) => {
            state.trans_conf.auth.user = action.payload
        },
        changeTransPassword: (state, action:PayloadAction<string>) => {
            state.trans_conf.auth.pass = action.payload
        },
        changeTransHost: (state, action:PayloadAction<string>) => {
            state.trans_conf.host = action.payload
        },
        changeTransPort: (state, action:PayloadAction<number>) => {
            state.trans_conf.port = action.payload
        },
        changeTransSecure: (state, action:PayloadAction<boolean>) => {
            state.trans_conf.secure = action.payload
        },
    }
})

export const {changeFrom, changeTo, changeSubject, changeBody,
    changeNewAttachments, addNewAttachments, changeOk, changeType,
    changeTrans_conf, changeTransPassword, changeTransUser,
    changeTransHost, changeTransPort,changeTransSecure } = NewMailSlice.actions

export default NewMailSlice.reducer