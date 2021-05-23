import { useState } from 'react';
import { Redirect } from 'react-router';
import { Form, Button, Alert } from 'react-bootstrap';
import UserModel from '../../model/UserModel';
import './LoginPage.css';

export default function LoginPage({activeUser, onLogin}) {
    const [email, setEmail] = useState();
    const [pwd,setPwd] = useState();
    const [showInvalidLogin, setShowInvalidLogin] = useState(false);

    if (activeUser) {
        return <Redirect to="/dashBoard"/>
    }

    async function login(e){
        e.preventDefault();
        try{
            const activeUser = await UserModel.login(email, pwd);
            onLogin(activeUser);
            //console.log(activeUser);
            return <Redirect to="/actions"/>
        }
        catch(error){
            console.error('Error while logging in user', error);
            setShowInvalidLogin(true);
        }
    }

    return (
        <div className="p-login">
            
            <h1>אנא התחבר</h1>
            {/* <p>or <Link to="/signup">create an account</Link></p> */}
            {showInvalidLogin ? <Alert variant="danger">Invalid Credentials!</Alert> : null}
            <Form onSubmit={login}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>דוא"ל</Form.Label>
                    <Form.Control type="email" placeholder="הזן דואר אלקטרוני"
                        value={email} onChange={e => setEmail(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>סיסמה</Form.Label>
                    <Form.Control type="password" placeholder="הזן סיסמה"
                        value={pwd} onChange={e => setPwd(e.target.value)} />
                </Form.Group>
                <Button variant="success" type="submit" block>
                    התחבר
                </Button>
            </Form>
        </div>
    )
}