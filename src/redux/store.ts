import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import * as ReduxThunk from 'redux-thunk';
import {ProductReducer} from "./reducer";
import { useDispatch } from 'react-redux';

const store = configureStore({
  reducer: combineReducers({
    products: ProductReducer,
  }),
})

export default store