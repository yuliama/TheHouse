import { useState } from 'react';
import { Button } from 'react-bootstrap';
import './Header.css';

export default function Header({ activeUser, onLogout }) {
    const img = process.env.PUBLIC_URL + "/images/home.png";
    const hoverImg = process.env.PUBLIC_URL + "/images/home-red.png"
    const [homeImg, setHomeImg] = useState(img);
    return (
        <div className="header">
            <div className="mainMenu">
                <a href="/"><img alt="Home" src={homeImg} onMouseEnter={() => setHomeImg(hoverImg)} onMouseLeave={() => setHomeImg(img)} className="logo"></img></a>
                <a href="#/company" >על החברה</a>
                <a href="#/product">על המוצר</a>
                <a href="#/support">תמיכה</a>
            </div>
            <div className="loginMenu">
                {!activeUser ? <a href="#/login" variant='link'>כניסה</a>:
                <Button onClick={()=>onLogout()} variant='link'>יציאה</Button>}
            </div>
        </div>
    )
}