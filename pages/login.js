import { auth, provider } from "../firebase";
import styled from 'styled-components';
import Head from "next/head";
import { Button } from "@material-ui/core";


function Login() {
    const signIn = () => {
        auth.signInWithPopup(provider).catch(alert);
    }

    return (
        <Container>
            <Head>
                <title>Login</title>
            </Head>
            <LoginContainer>
                <Logo src="https://media.istockphoto.com/vectors/lightning-flash-discharge-of-electricity-on-transparent-background-vector-id1127540861?k=6&m=1127540861&s=170667a&w=0&h=5T0k3Dc3pkG_ETlNqb8wA8A2hLeIKM8C53RUOWfdaTM=" />
                <Button variant="outlined" onClick={signIn} >Se connecter avec Google</Button>
            </LoginContainer>

        </Container>
    )
}

export default Login;

const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: grid;
    place-items: center;
`;

const LoginContainer = styled.div`
    height: 50%;
    width: 300px;
    background-color: whitesmoke;
    box-shadow: 0px 4px 14px 0px #00f7f3;
    display: flex;
    flex-direction: column;
    align-items: center; 
    justify-content: space-between;
    padding-top: 5%;
    padding-bottom: 5%;
`;

const Logo = styled.img`
    object-fit: contain;
    width: 100%;
    height: 50%;
`;

