import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledLink = styled(Link)`
    text-decoration: none;
    color: white;
    font-size: 20px;
`;

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    padding: 0 20px;
`;

const Authentication = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    display: flex;
    padding: 0 20px;
`;

const Navigation = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    display: flex;
    padding: 0 20px;
`;

const Box = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 60px;
    background-color: rgba(0, 50, 200, 1);
`;

const Navbar = ({ authenticated, user }) => {
    const authComponents = authenticated ? (
        <Authentication>
            <Wrapper>
                <StyledLink to="/logout">Logout</StyledLink>
            </Wrapper>
        </Authentication>
    ) : (
        <Authentication>
            <Wrapper>
                <StyledLink to="/login">Login</StyledLink>
            </Wrapper>
            <Wrapper>
                <StyledLink to="/register">Register</StyledLink>
            </Wrapper>
        </Authentication>
    );

    const navigationComponents = authenticated ? (
        <Navigation>
            <Wrapper>
                <StyledLink to="/">Home</StyledLink>
            </Wrapper>
            <Wrapper>
                <StyledLink to="/todos">Todos</StyledLink>
            </Wrapper>
        </Navigation>
    ) : (
        <Navigation>
            <Wrapper>
                <StyledLink to="/">Home</StyledLink>
            </Wrapper>
        </Navigation>
    );

    return (
        <Box>
            {navigationComponents}
            {authComponents}
        </Box>
    );
};

export default Navbar;
