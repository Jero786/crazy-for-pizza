// Resources
import './OrderSuccess.scss';

// Libs
import React from 'react';

function OrderSuccess() {
    return (
        <div className="order-success">
            <div className="order-success__bg"></div>
            <div className="order-success__header">
                <h1 className="order-success__title margin-center">Order Success</h1>

                <div className="order-success__icon margin-center">
                    <div className="material-icons">done</div>
                </div>
            </div>
        </div>
    );
}

OrderSuccess.propTypes = {};
OrderSuccess.defaultProps = {};

export default OrderSuccess;
