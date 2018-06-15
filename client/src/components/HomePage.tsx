import * as React from 'react';
import styled from 'styled-components';

const HomePage = () => (
    <Page>
        <Box>
            <h1>Yet Another To-Do App</h1>
            <h2>Created with TypeScript</h2>
            <h3>
                Client technologies: react, redux, react-router,
                styled-components
            </h3>
            <h3>Server technologies: nodeJS, express, postgreSQL </h3>
            <h3>Authentication using: jsonwebtoken, bcrypt </h3>
            <h3>Routes testing using: mocha, chai, supertest</h3>
            <h3>Client routes:</h3>
            <Table>
                <Tr>
                    <Th>URL</Th>
                    <Th>Description</Th>
                    <Th>Auth?</Th>
                </Tr>
                <Tr>
                    <Th>/</Th> <Th>home page</Th>
                    <Th>false</Th>
                </Tr>
                <Tr>
                    <Th>/register</Th> <Th> register page </Th>
                    <Th>false</Th>
                </Tr>
                <Tr>
                    <Th>/login</Th>
                    <Th>login page</Th>
                    <Th>false</Th>
                </Tr>
                <Tr>
                    <Th>/logout</Th>
                    <Th>logout page</Th>
                    <Th>false</Th>
                </Tr>
                <Tr>
                    <Th>/todos</Th> <Th>current user todos</Th>
                    <Th>true</Th>
                </Tr>
            </Table>
            <h3>Server routes:</h3>
            <Table>
                <Tr>
                    <Th>Request type</Th>
                    <Th>URL</Th>
                    <Th>Description</Th>
                    <Th>Auth?</Th>
                </Tr>
                <Tr>
                    <Th>GET</Th>
                    <Th>/</Th>
                    <Th>serves static client </Th>
                    <Th>false</Th>
                </Tr>
                <Tr>
                    <Th>POST</Th>
                    <Th>/api/auth/register </Th>
                    <Th>register page </Th>
                    <Th>false</Th>
                </Tr>
                <Tr>
                    <Th>POST</Th>
                    <Th>/api/auth/login</Th>
                    <Th> login page </Th>
                    <Th>false</Th>
                </Tr>
                <Tr>
                    <Th>POST</Th>
                    <Th>/api/user/:userId/todos</Th>
                    <Th> create todo </Th>
                    <Th>true</Th>
                </Tr>
                <Tr>
                    <Th>GET</Th>
                    <Th>/api/user/:userId/todos </Th>
                    <Th> read todos </Th>
                    <Th>true</Th>
                </Tr>
                <Tr>
                    <Th>PUT</Th>
                    <Th>/api/user/:userId/todos:id </Th>
                    <Th>update todo</Th>
                    <Th>true</Th>
                </Tr>
                <Tr>
                    <Th>DELETE</Th>
                    <Th>/api/user/:userId/todos:id'</Th>
                    <Th>delete todo</Th>
                    <Th>true</Th>
                </Tr>
            </Table>
        </Box>
    </Page>
);

const Tr = styled.tr`
    border: 1px solid black;
`;
const Table = styled.table`
    border-collapse: collapse;
    border: 1px solid black;
`;

const Th = styled.th`
    padding: 5px;
    border: 1px solid black;
`;

const Page = styled.div`
    display: flex;
    justify-content: center;
`;

const Box = styled.div`
    width: 1000px;
    padding: 20px;
`;

export default HomePage;
