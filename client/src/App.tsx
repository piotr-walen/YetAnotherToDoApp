import * as React from 'react';
import Navbar from './containers/Navbar';
import StatusBar from './containers/StatusBar';
import Routes from './routes';

class App extends React.Component {
    public render() {
        return (
            <div>
                <Navbar />
                <StatusBar />
                <Routes />
            </div>
        );
    }
}

export default App;
