import { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import Header from '../../components/Header/Header'

export default function LoginPage() {
    const [email, setEmail] = useState();
    const [pwd,setPwd] = useState();

    return (
        <div className="p-login">
            <Header></Header>
            <h1>Please Login</h1>
            <Form>
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