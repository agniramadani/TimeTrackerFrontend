import { configureStore } from '@reduxjs/toolkit'
import userReducer from "./userSlice.js";


export default configureStore({
    reducer: {
       user_id: userReducer
    }
})
