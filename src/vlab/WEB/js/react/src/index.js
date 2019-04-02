import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose} from 'redux';
import thunkMiddleware from 'redux-thunk';
import storeApp from './reducers';
import { AppContainer } from 'react-hot-loader';
import App from './components/App';

const middleware = [thunkMiddleware];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let store = createStore(storeApp, {}, composeEnhancers(applyMiddleware(...middleware)));

const render = Component => {
    ReactDOM.render(
        <AppContainer>
            <Provider store={store}>
                <App/>
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
else if(NODE_ENV==='production')
{
    render(App);
}