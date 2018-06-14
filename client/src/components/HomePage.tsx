import * as React from 'react';
import styled from 'styled-components';

const HomePage = () => (
    <Box>
        <h1>Yet Another To-Do App</h1>
        <h2>Created with TypeScript</h2>
        <h3>
            Client technologies: react, redux, react-router, styled-components
        </h3>
        <h3>Server technologies: nodeJS, express, postgreSQL </h3>
        <h3>Authentication using: jsonwebtoken, bcrypt </h3>
        <h3>Routes testing using: mocha, chai, supertest</h3>
    </Box>
);

const Box = styled.div`
    padding-left: 200px;
    padding-right: 200px;
`;

export default HomePage;
