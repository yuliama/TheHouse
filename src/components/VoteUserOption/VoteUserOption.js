import { useState } from "react"

export default function VoteUserOption({ item, setChosen }) {
    const [toggle, setToggle] = useState(false);
    const [className, setClassName] = useState("vote-option");
    const [chosenItem, setChosenItem] = useState([]);
    
    function choose() {
        setToggle(!toggle);
        setChosen(item);
        toggle ? setClassName("vote-option") : setClassName("vote-option chosen");
    }
    return (
        <div className={className} key={item.id} onClick={() => choose()}>{item.text}</div>
    )
}