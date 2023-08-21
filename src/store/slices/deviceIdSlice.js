import {createSlice} from '@reduxjs/toolkit';

export const deviceIdSlice = createSlice({
  name: 'deviceId',
  initialState: {
    value: '',
  },
  reducers: {
    setDeviceId: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const {setDeviceId} = deviceIdSlice.actions;

export default deviceIdSlice.reducer;
