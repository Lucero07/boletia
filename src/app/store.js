import { configureStore } from "@reduxjs/toolkit";
import bannersReducer from '../features/banners/bannersSlice';


export const store = configureStore({
    reducer: {
        banners: bannersReducer
    },
});
