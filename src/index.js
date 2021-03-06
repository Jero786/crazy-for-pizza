// Libs
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

// Libs - Apollo
import {ApolloProvider} from 'react-apollo';
import {ApolloClient} from 'apollo-client';
import {createHttpLink} from 'apollo-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';

// Libs - Redux
import {Provider} from 'react-redux';
import configureStore from './store';


const httpLink = createHttpLink({uri: 'http://core-graphql.dev.waldo.photos/pizza'});
const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache()
});

ReactDOM.render(
    <Provider store={configureStore()}>
        <ApolloProvider client={client}>
            <App/>
        </ApolloProvider>
    </Provider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
