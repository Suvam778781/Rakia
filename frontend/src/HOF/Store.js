
import { applyMiddleware, combineReducers, compose, legacy_createStore } from "redux";
import thunk from "redux-thunk"
import { ProductsReducer } from "./Productreducer/product.reducer";
import { CartReducer } from "./Cartreducer/cart.reducer";
import { UserAndAdminReducer } from "./User&AdminReducer/UA.reducer";
const rootReducer=combineReducers({
    ProductsReducer:ProductsReducer,
    CartReducer:CartReducer,
    useradminReducer:UserAndAdminReducer
    })
const composer=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||compose
export const store = legacy_createStore(rootReducer,composer(applyMiddleware(thunk)))