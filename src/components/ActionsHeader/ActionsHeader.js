import { Button } from 'react-bootstrap';
import { Redirect } from 'react-router';
import './ActionsHeader.css';


export default function ActionsHeader({ activeUser }) {
    if (!activeUser) {
        return <Redirect to="/" />
    }
    return (
        <div className="actions-header">
            <div className="mainMenu">
                {activeUser.isCommiteeMember ?
                    <div className="manageMenu">
                        <a href="#/manageUsers">ניהול דיירים</a>
                        <Button variant='link'>ניהול ליקויים</Button>
                        <Button variant='link'>ניהול הודעות</Button>
                        <Button variant='link'>ניהול הצבעות</Button>
                    </div>
                    : ''}
                <Button variant='link'>דיווח על ליקוי</Button>
                <Button variant='link'>הצבעות</Button>
            </div>
            <div className="greetings-menu">
                שלום, {activeUser.fullName}{' '}
            </div>
        </div>
    )
}