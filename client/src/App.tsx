import * as React from 'react';
import Routes from './routes';

import Navbar from './containers/Navbar';

class App extends React.Component {
    public render() {
        return (
            <div>
                <Navbar />
                <Routes />
            </div>
        );
    }
}

export default App;
