import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchData } from '../../utils/API'

// Define a type for the slice state
export interface Form {
  login: string;
  password: string;
}
export interface LoginFormState {
  login: string;
  password: string;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string
}
export interface Response {
  type: string;
  statusCode: number;
  message: string;
  accessToken: string;
  expiresIn: string;
}
// Define the initial state using that type
const initialState: LoginFormState = {
  login: '',
  password: '',
  loading: 'idle',
  error: ''
}

export const loginUser = createAsyncThunk(
  'login/auth',
  async (data: Form, thunkAPI) => {
    const postOptions = {
      body: JSON.stringify({ username: data.login, password: data.password }),
      method: 'POST',
    };
    const response = await fetchData('/api/auth/login/', postOptions);
    return await (response.json()) as Response;
  })

export const loginFormSlice = createSlice({
  name: 'login',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    changeLogin: (state, action:PayloadAction<string>) => {
      state.login = action.payload
    },
    changePassword: (state, action:PayloadAction<string>) => {
      state.password = action.payload
    },
    changeError: (state, action:PayloadAction<string>) => {
      state.error = action.payload
    },
  },
  extraReducers: builder => {
    builder.addCase(loginUser.pending, (state, action) => {
      state.loading = 'pending'
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = 'succeeded';
      state.password = '';
      state.login = '';
      console.log(action.payload.statusCode);
      if (action.payload.statusCode == 200)
        localStorage.setItem('token', action.payload.accessToken);
      else
        state.error = '' + action.payload.statusCode + ': ' + action.payload.message;
    });
  }
})

export const { changeLogin, changePassword, changeError } = loginFormSlice.actions;

// Other code such as selectors can use the imported `RootState` type
//export const selectLogin = (state: RootState) => state.loginForm.login;
//export const selectPassword = (state: RootState) => state.loginForm.password;

export default loginFormSlice.reducer
