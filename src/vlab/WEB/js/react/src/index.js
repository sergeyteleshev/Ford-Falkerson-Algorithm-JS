import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import storeApp from './reducers';
import { AppContainer } from 'react-hot-loader';
import App from './components/App';
/*eslint no-unused-vars:0*/
import {Redirect, Route, Router} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';



const history = createHistory();
const middleware = [thunkMiddleware];

let store = createStore(storeApp, applyMiddleware(...middleware));

const render = Component => {
    ReactDOM.render(
        <AppContainer>
            <Provider store={store}>
                <Router history={history}>
                    <Route patch='/' component={App}/>
                </Router>
            </Provider>
        </AppContainer>,
        document.getElementById('root'),
    )
};

if(NODE_ENV==='development') {

    //LOGGER


    console.log(NODE_ENV);

    store.subscribe(()=>console.log(store.getState()));

    //HOT MODULE

    render(App);
    if (module.hot) {
        module.hot.accept('./components/App', () => { render(App) })
    }
}