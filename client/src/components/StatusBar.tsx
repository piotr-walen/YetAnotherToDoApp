import * as React from 'react';
import styled from 'styled-components';
import { IStatus } from '../types';

const Bar = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 50px;
    background-color: rgba(0, 0, 0, 0);
    border-radius: 8px;
`;

const ErrorBar = styled(Bar)`
    background-color: rgba(240, 0, 0, 0.3);
`;

const InfoBar = styled(Bar)`
    background-color: rgba(0, 240, 0, 0.3);
`;

const StatusBar = ({ status }: { status: IStatus }) => {
    let component = <Bar />;
    if (status.severity === 'error') {
        component = <ErrorBar> {status.message} </ErrorBar>;
    } else if (status.severity === 'info') {
        component = <InfoBar> {status.message} </InfoBar>;
    }
    return component;
};

export default StatusBar;
