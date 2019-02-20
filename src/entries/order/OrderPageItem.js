// Resources
import './OrderPageItem.scss';

// Libs
import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {get} from 'lodash/object';
import {find} from 'lodash/collection';

import {isSelectedTopping} from './reducer';

function OrderPageItem({
                           // API
                           name,
                           maxToppings,
                           basePrice,
                           toppings = [],

                           // State
                           selectedToppings,
                           messageError,
                           amount,

                           // Actions
                           fillInitialState,
                           cleanOrderState,
                           selectTopping,
                           incrementAmount,
                           decrementAmount,
                       }) {

    // load local state with API date
    useEffect(() => {
        fillInitialState({
                name,
                maxToppings,
                basePrice,
                toppings,
                defaultSelected: getDefaultTopping(toppings)
            }
        );
        return cleanOrderState
    }, []); // only once

    return (
        <div className="order-page-item">
            <div className="order-page-item__content">

                {getToppingSectionEl(toppings, selectedToppings, selectTopping)}

                <div className="order-page-item__content-amount flex">

                    <button onClick={() => incrementAmount()}
                            className="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-button--colored mdl-js-ripple-effect">
                        <i className="material-icons">add</i>
                    </button>

                    {textAmountEl(amount)}

                    <button onClick={() => decrementAmount()}
                            className="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-button--colored mdl-js-ripple-effect">
                        <i className="material-icons">remove</i>
                    </button>
                </div>
            </div>

            {messageError ? <div className="cp-message-error">{messageError}</div> : ''}
        </div>
    );
}

function getToppingSectionEl(toppings, selectedToppings, selectTopping) {

    if (!toppings || toppings.length === 0) {
        return 'There is not topping to select';
    }

    return (
        <div className="order-page-item__content-toppings padding-section">
            <h2 className="order-page-item__sub-title">Toppings</h2>
            {
                toppings.map((topping, index) => {

                    const toppingName = topping.topping.name;
                    const isChecked = isSelectedTopping(toppingName, selectedToppings);

                    return (
                        <label key={toppingName}
                               className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect"
                               htmlFor={`checkbox-${index}`}>

                            <input
                                data-topping-name={toppingName}
                                type="checkbox"
                                id={`checkbox-${index}`}
                                className="mdl-checkbox__input"
                                checked={isChecked}
                                onChange={() => selectTopping(topping)}

                            />
                            <span className="mdl-checkbox__label">{topping.topping.name}</span>
                        </label>
                    );
                })
            }
        </div>
    )
}

function textAmountEl(amount) {
    return (
        <div className="textfield-amount">
            <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                <input className="mdl-textfield__input"
                       type="text"
                       pattern="-?[0-9]*(\.[0-9]+)?"
                       id="amount-target-id"
                       onChange={() => {
                       }}
                       value={amount}/>
                <label className="mdl-textfield__label" htmlFor="sample4"></label>
                <span className="mdl-textfield__error">Only number</span>
            </div>
        </div>
    )
}

function getDefaultTopping(toppings) {
    const defaultSelected = find(toppings, topping => topping.defaultSelected);
    if (defaultSelected && get(defaultSelected, 'topping')) {
        return get(defaultSelected, 'topping');
    }
}

OrderPageItem.propTypes = {
    toppings: PropTypes.array,
    amount: PropTypes.number,
    maxToppings: PropTypes.number,
    basePrice: PropTypes.number
};

OrderPageItem.defaultProps = {};

export default OrderPageItem;
