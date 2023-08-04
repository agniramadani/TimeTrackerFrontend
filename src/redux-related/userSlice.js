import { createSlice } from "@reduxjs/toolkit"


export const userSlice = createSlice({
    name: 'user_id',
    initialState: {
        value: localStorage.getItem('user_id')
    },
    reducers: {
        setUserId: (state, action) => {
            state.value = action.payload
        },
    }
})

export const {setUserId} = userSlice.actions;
export default userSlice.reducer;
