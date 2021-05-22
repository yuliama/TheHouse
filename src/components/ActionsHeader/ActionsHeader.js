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
                    <div className="manageMenu">
                    {activeUser.isCommiteeMember ?<a href="#/manageUsers">ניהול דיירים</a>:''}
                        <a href="#/issue">ליקויים</a>
                        <a href="#/message">הודעות</a>
                        <a href="#/votes">הצבעות</a>
                    </div>
            </div>
            <div className="greetings-menu">
                שלום, {activeUser.fullName}{' '}
            </div>
        </div>
    )
}