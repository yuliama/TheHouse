import { useState } from "react";
import { Button } from "react-bootstrap";

export default function ManageVotes(){
    const [showNewVoteModal, setShowNewVoteModal] = useState(false);
    return(
        <div className="p-manageVotes">
            <Button onClick={() => setShowNewVoteModal(true)}>+הוסף הצבעה</Button>
            <div>הצבעות קודמות</div>
        </div>
    )
}