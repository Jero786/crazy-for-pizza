// Resources
import './Header.scss';
import '../../styles/style.scss';
import logoSrc from '../../../assets/images/logo.png';

// Libs
import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router';

function Header({
                    amountOrders = 0,
                    totalPrice = 0.00,
                    history
                }) {
    return (
        <div className="cp-header">
            <div className="cp-header__icon cp-header__icon-arrow-back xs-visible">
                <button onClick={() => history.goBack()} className="mdl-button mdl-js-button mdl-js-ripple-effect">
                    <i className="material-icons">arrow_back_ios</i>
                </button>
            </div>
            <div className="cp-header__icon cp-header__icon-logo flex-row-space-between">
                <img src={logoSrc} alt="Logo"/>
                <h1>Crazy for Pizza</h1>
            </div>
            <div className="cp-header__icon cp-header__icon-cart">
                <div className="cp-header__icon cp-header__icon-cp-price">
                    <span className="cp-header__icon cp-header__icon-cp-price-currency">Total U$S</span>
                    <span className="cp-header__icon cp-header__icon-cp-price-value">{totalPrice}</span>
                </div>
                <button onClick={() => history.push('/cart')} className="mdl-button mdl-js-button mdl-js-ripple-effect">
                    <div className="material-icons mdl-badge mdl-badge--overlap"
                         data-badge={amountOrders}>shopping_cart
                    </div>
                </button>
            </div>
        </div>
    )
}

Header.propTypes = {
    amountOrders: PropTypes.number,
    totalPrice: PropTypes.number,
    history: PropTypes.object
};

export default withRouter(Header);
