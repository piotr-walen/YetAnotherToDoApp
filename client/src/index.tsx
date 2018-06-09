import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createStore } from 'redux';
import App from './App';
import './index.css';
import { loadState, saveState } from './localStorage';
import rootReducer from './reducers';
import registerServiceWorker from './registerServiceWorker';

const persistedState = loadState();
const store = createStore(
    rootReducer,
    persistedState,
);

store.subscribe(() => {
    saveState(store.getState());
});

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
