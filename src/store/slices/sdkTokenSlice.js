import {createSlice} from '@reduxjs/toolkit';

export const sdkTokenSlice = createSlice({
  name: 'sdkToken',
  initialState: {
    value: '',
  },
  reducers: {
    setSDKToken: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const {setSDKToken} = sdkTokenSlice.actions;

export default sdkTokenSlice.reducer;
