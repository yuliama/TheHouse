import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import './HomePage.css';

export default function HomePage() {
    const [email, setEmail] = useState('');
    return (
        <div className="p-homePage">
            {/* <h1>ועד בית</h1> */}
            <div className="content">
                מערכת ועד בית מאפשר לכם לעקוב אחר הודעות, לדבר עם דיירים להצביע ולעקוב אחרי כל מה שקורה בבניין!
                !הצטרפו עוד היום
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Control type="email" className="email" placeholder="להצטרפות נא הזן כתובת אימייל"
                            value={email} onChange={e => setEmail(e.target.value)} />
                    </Form.Group>
                    <Button variant="light" type="submit" block>
                        שלח
                    </Button>
                </Form>
            </div>
            <div className="baner">
                <img alt="banner" src={process.env.PUBLIC_URL + "/images/app-baner.png"}></img>
            </div>
        </div>
    )
}