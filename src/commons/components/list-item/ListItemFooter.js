// Resources
import './ListItemFooter.scss';

// Libs
import React, {memo} from 'react';
import PropTypes from 'prop-types';

function ListItemFooter({price, buttonText, buttonIcon, onClickButton}) {
    return (
        <div className="list-item-footer bg-gray">
            <div className="list-item-footer__offset">
            </div>
            <div className="list-item-footer__content">
                <div className="cart-item__price">
                    <div className="cart-item__price-label">
                        Total:
                    </div>
                    <div className="cart-item__price-value">{`${'U$S'} ${price}`}
                    </div>
                </div>

                <div className="cart-item__order">
                    <button
                        className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent"
                        onClick={onClickButton}
                    >
                        {buttonText}<i className="material-icons">{buttonIcon}</i>
                    </button>
                </div>
            </div>
        </div>
    );
}

ListItemFooter.propTypes = {};
ListItemFooter.defaultProps = {};

export default memo(ListItemFooter);
