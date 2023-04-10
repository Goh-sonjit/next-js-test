import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import {
  IconFilterReducer,
  SearchReducer,
  UserReducer,
  CartReducer,
} from "./adminReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import { cartitems } from "./adminAction";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const reducer = combineReducers({
  user: UserReducer,
  search: SearchReducer,
  iconfilter: IconFilterReducer,
  cart: CartReducer,
  userItems: cartitems,
});

const persistConfig = {
    key: 'root',
    storage
  }
  
const persistedReducer = persistReducer(persistConfig, reducer);

const middleware = [thunk];

export let store = createStore(
persistedReducer,
composeWithDevTools(applyMiddleware(...middleware))  
    )


export let persistor = persistStore(store);
  
