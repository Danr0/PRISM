import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {fetchDataAuth} from '../../utils/API'

export interface UserData {
    username: string;
    email: string;
    avatar: string | null;
}

const initialState: UserData = {
    username: '',
    email: '',
    avatar: null
}

export const getProfile = createAsyncThunk(
    'user/profile',
    async () => {
        const response = await fetchDataAuth('/api/users');
        if (response !== null)
            return await (response.json()) as UserData;
    }
)

export const getUserProfileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        changeEmail: (state, action:PayloadAction<string>) => {
            state.email = action.payload
        },
        changeUsername: (state, action:PayloadAction<string>) => {
            state.username = action.payload
        },
        changeAvatar: (state, action:PayloadAction<string | null>) => {
            state.avatar = action.payload
        }
    }
})

export const {changeEmail, changeUsername, changeAvatar} = getUserProfileSlice.actions;

export default getUserProfileSlice.reducer