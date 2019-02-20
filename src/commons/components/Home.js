// Libs
import React, {Component} from 'react';
import Link from './Link';
import {Query} from 'react-apollo';
import gql from 'graphql-tag';

// Components
import Loading from '../../commons/components/loading/Loading';

const FEED_QUERY = gql`
{ 
    pizzaSizes {
        name
        basePrice
    }
}
`;

class LinkList extends Component {

    render() {
        return (
            <Query query={FEED_QUERY}>
                {({loading, error, data}) => {

                    if (loading) {
                        return <Loading/>
                    }

                    if (error) {
                        return <div>Error</div>
                    }

                    const pizzaSizes = data.pizzaSizes;

                    return (
                        <div>
                            {pizzaSizes.map(pizzaSize => <Link key={pizzaSize.name} link={pizzaSize.name}/>)}
                        </div>
                    )
                }}
            </Query>
        );
    }
}

export default LinkList;
