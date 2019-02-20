// Style
import './HomePage.scss';

// Libs
import React from 'react';
import {Query} from 'react-apollo';
import gql from 'graphql-tag';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {get} from 'lodash/object';

// Components
import ListItem from '../../commons/components/list-item/ListItem';
import HomePageItem from './HomePageItem';
import Loading from '../../commons/components/loading/Loading';

const FEED_QUERY = gql`
    {
        pizzaSizes {
        maxToppings
        name
        basePrice
        toppings {
            defaultSelected
            topping {
                name
                price
            }
        }
        }
    }`;

const HomePage = ({totalPriceOrders}) => {
    return (
        <Query query={FEED_QUERY}>
            {({loading, error, data}) => {

                if (loading) {
                    return <Loading/>
                }

                if (error) {
                    return <div>Error</div>
                }

                const pizzaSizes = data.pizzaSizes || [];

                return (
                    <article className="home-page margin-center max-width-box card">
                        <h1 className="home-page__header card-header">
                            Pizzas
                        </h1>
                        <div className="home-page__body">
                            {pizzaSizes.map((pizzaItem) =>
                                <ListItem key={pizzaItem.name}>
                                    <HomePageItem
                                        title={pizzaItem.name}
                                        description={hydrateWithDescription(pizzaItem)}
                                        basePrice={pizzaItem.basePrice}
                                        size={pizzaItem.name}
                                    />
                                </ListItem>
                            )}
                        </div>
                        <LinkListFooter totalPriceOrders={totalPriceOrders}/>
                    </article>
                )
            }}
        </Query>);
};

function LinkListFooter({totalPriceOrders}) {
    return (
        <div className="home-page__footer card-footer bg-gray">
            <div className="home-page__footer-price">
                <div className="home-page__footer-price-label">
                    Total:
                </div>
                <div className="home-page__footer-price-value">U$S {totalPriceOrders}
                </div>
            </div>

            <div className="home-page__footer-button">
                <Link to="/cart">
                    <button
                        className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">
                        SHOW CART<i className="material-icons">shopping_cart</i>
                    </button>
                </Link>
            </div>
        </div>
    );
}

function hydrateWithDescription(pizzaItem) {
    return `The default max amount of toppings for this pizza is ${pizzaItem.maxToppings === null ? 'unlimited' : pizzaItem.maxToppings}`;
}

const mapStateToProps = (state) => {
    const cartReducer = state.cartReducer;
    return {
        totalPriceOrders: get(cartReducer, 'totalPriceOrders')
    }
};

export default connect(mapStateToProps)(HomePage);
