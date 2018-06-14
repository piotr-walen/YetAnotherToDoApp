import * as React from 'react';
import { connect } from 'react-redux';
import StatusBar from '../components/StatusBar';
import { IState } from '../types';
function mapStateToProps(state: IState) {
    return {
        status: state.status,
    };
}
export default connect(mapStateToProps)(({ status }) => (
    <StatusBar status={status} />
));
