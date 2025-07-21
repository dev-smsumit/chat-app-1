import { configureStore } from '@reduxjs/toolkit'
import FriendSlice from './Features/FriendSlice'

export default configureStore({
  reducer: {
    Friend : FriendSlice,
  }
})