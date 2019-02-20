// Libs
import {combineReducers} from 'redux';

// Reducers
import {orderReducer} from '../../entries/order/reducer';
import {cartReducer} from '../../entries/cart/reducer';

export default combineReducers({
    orderReducer,
    cartReducer,
})
