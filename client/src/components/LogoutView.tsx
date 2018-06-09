import * as React from 'react';

interface ILogoutViewProps {
    handlers: any;
}

class LogoutView extends React.Component<ILogoutViewProps, any> {
    public componentDidMount() {
        this.props.handlers.logout();
    }
    public render() {
        return <div>Logging out...</div>;
    }
}

export default LogoutView;
