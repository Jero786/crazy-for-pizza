import {
    INCREMENT_AMOUNT,
    DECREMENT_AMOUNT,
    FILL_INITIAL_STATE_ORDER,
    CLEAN_STATE_ORDER,
    SELECT_TOPPING,
} from "../constants";

export const incrementAmount = () => ({type: INCREMENT_AMOUNT});
export const decrementAmount = () => ({type: DECREMENT_AMOUNT});
export const fillInitialState = (payload) => ({type: FILL_INITIAL_STATE_ORDER, payload});
export const selectTopping = (payload) => ({type: SELECT_TOPPING, payload});
export const cleanOrderState = () => ({type: CLEAN_STATE_ORDER});
