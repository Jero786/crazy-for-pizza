// Resources
import './OrderPage.scss';

// Libs
import React, {memo} from 'react';
import {Query} from 'react-apollo';
import gql from 'graphql-tag';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {get} from 'lodash/object';

// Components
import OrderPageItem from './OrderPageItem';
import ListItem from '../../commons/components/list-item/ListItem';
import ListItemFooter from '../../commons/components/list-item/ListItemFooter';
import Loading from '../../commons/components/loading/Loading';

// Actions
import {
    selectTopping,
    fillInitialState,
    incrementAmount,
    decrementAmount,
    cleanOrderState
} from './actions'
import {addOrderToCart} from '../cart/actions';

const FEED_QUERY = (param) => gql`
{ 
  pizzaSizeByName(name: ${param.toUpperCase()}) {
    maxToppings,
    name,
    basePrice,
    toppings {
      defaultSelected,
      topping {
        name,
        price
      }
    }
  }
}
`;

function OrderPage({
                       // React router
                       match,
                       history,

                       // Actions
                       selectedToppings,
                       fillInitialState,
                       cleanOrderState,
                       selectTopping,
                       incrementAmount,
                       decrementAmount,
                       addOrderToCart,

                       // State
                       totalPrice,
                       amount,
                       messageError,
                   }) {

    const size = match.params.size.substring(1); // remove first `:` character

    return (
        <Query query={FEED_QUERY(size)}>
            {({loading, error, data}) => {

                if (loading) {
                    return <Loading/>
                }

                if (error) {
                    return <div>Error</div>
                }

                // response from API
                const {toppings, maxToppings, basePrice, name} = data.pizzaSizeByName;

                return (
                    <div className="order-page margin-center max-width-box card bg-white-transparent">
                        <h1 className="order-page__header card-header">
                            {name}
                        </h1>
                        <div className="order-page__body">
                            <ListItem>
                                <OrderPageItem
                                    // from API
                                    name={name}
                                    maxToppings={maxToppings}
                                    basePrice={basePrice}
                                    toppings={toppings}

                                    // State
                                    selectedToppings={selectedToppings}
                                    messageError={messageError}
                                    amount={amount}

                                    // Actions
                                    fillInitialState={fillInitialState}
                                    selectTopping={selectTopping}
                                    incrementAmount={incrementAmount}
                                    decrementAmount={decrementAmount}
                                    cleanOrderState={cleanOrderState}
                                />
                            </ListItem>
                        </div>
                        <ListItemFooter
                            price={totalPrice || basePrice}
                            buttonText="ADD TO CARD"
                            buttonIcon="shopping_cart"
                            onClickButton={() => {
                                addOrderToCart({amount, selectedToppings, name, totalPrice});
                                history.push('/home');
                            }}
                        />
                    </div>
                )
            }}
        </Query>
    );
}

OrderPage.propTypes = {};
OrderPage.defaultProps = {};

const mapStateToProps = (state) => {
    const orderReducer = state.orderReducer;
    return {
        totalPrice: get(orderReducer, 'totalPrice'),
        amount: get(orderReducer, 'amount'),
        messageError: get(orderReducer, 'messageError'),
        selectedToppings: get(orderReducer, 'selectedToppings'),
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fillInitialState: bindActionCreators(fillInitialState, dispatch),
        selectTopping: bindActionCreators(selectTopping, dispatch),
        incrementAmount: bindActionCreators(incrementAmount, dispatch),
        decrementAmount: bindActionCreators(decrementAmount, dispatch),
        addOrderToCart: bindActionCreators(addOrderToCart, dispatch),
        cleanOrderState: bindActionCreators(cleanOrderState, dispatch),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(memo(OrderPage)));
