import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap';
import UserModel from '../../model/UserModel';

export default function LoginPage({activeUser, onLogin}) {
    const [email, setEmail] = useState();
    const [pwd,setPwd] = useState();
    const [showInvalidLogin, setShowInvalidLogin] = useState(false);

    async function login(e){
        e.preventDefault();
        try{
            const activeUser = await UserModel.login(email, pwd);
            onLogin(activeUser);
            console.log(activeUser);
        }
        catch(error){
            console.error('Error while logging in user', error);
            setShowInvalidLogin(true);
        }
    }

    return (
        <div className="p-login">
            
            <h1>Please Login</h1>
            {/* <p>or <Link to="/signup">create an account</Link></p> */}
            {showInvalidLogin ? <Alert variant="danger">Invalid Credentials!</Alert> : null}
            <Form onSubmit={login}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email"
                        value={email} onChange={e => setEmail(e.target.value)} />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password"
                        value={pwd} onChange={e => setPwd(e.target.value)} />
                </Form.Group>
                <Button variant="success" type="submit" block>
                    Login
                </Button>
            </Form>
        </div>
    )
}