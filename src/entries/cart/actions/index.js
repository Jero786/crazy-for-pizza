import {ADD_ORDER_TO_CART, REMOVE_ORDER_TO_CART} from '../constants';

export const addOrderToCart = (payload) => ({type: ADD_ORDER_TO_CART, payload});
export const removeOrderToCart = (payload) => ({type: REMOVE_ORDER_TO_CART, payload});
