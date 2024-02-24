import { createSlice } from "@reduxjs/toolkit";

export const homeSlice = createSlice({
    name: 'home',
    initialState:{
        url: {},
        genres: {}
    },
    reducers: {
        getApiConfiguration: (state,action) =>{
            state.url = action.payload
        },
        getGenre: (state,action) => {
            state.url = action.payload
        },
    },
});

export const {getApiConfiguration,getGenre} = homeSlice.actions;

export default homeSlice.reducer
