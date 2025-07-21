import { createSlice } from '@reduxjs/toolkit'

export const FriendSlice = createSlice({
  name: 'friends',
  initialState: {
    friendsInfo: {

    }
  },
  reducers: {
    friendsAction: (state, action) => {
      state.friendsInfo = action.payload;
    },
  }
})

export const {friendsAction} = FriendSlice.actions

export default FriendSlice.reducer