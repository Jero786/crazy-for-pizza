// Resources
import './HomePageItem.scss';

// Libs
import React, {memo} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

function HomePageItem({title, description, basePrice, size}) {
    return (
        <div className="home-page-item">
            <div className="list-item__content-title">
                {title}
            </div>

            <div className="list-item__content-description">
                {description}
            </div>
            <div className="list-item__content-order">
                <div className="list-item__content-order-price">
                    <span className="list-item__content-order-price-label">From: U$S</span>
                    <span className="list-item__content-order-price-value">{` ${basePrice}`}</span>
                </div>
                <Link to={`/order/:${size}`}>
                    <button
                        className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">
                        order
                    </button>
                </Link>
            </div>
        </div>
    );
}

HomePageItem.propTypes = {};
HomePageItem.defaultProps = {};

export default memo(HomePageItem);
