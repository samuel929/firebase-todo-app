import { configureStore , getDefaultMiddleware,combineReducers} from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 
import thunk from 'redux-thunk';
import userSlice  from "../slices/userSlice"


const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  // Your reducers
  user:userSlice
});
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: [...getDefaultMiddleware(), thunk],

});

export default store;