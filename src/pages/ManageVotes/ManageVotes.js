import { useState } from "react";
import { Button } from "react-bootstrap";
import AddNewVoteModal from "../../components/AddNewVoteModal/AddNewVoteModal";
import './ManageVotes.css';

export default function ManageVotes(){
    const [showNewVoteModal, setShowNewVoteModal] = useState(false);
    return(
        <div className="p-manageVotes">
            <Button onClick={() => setShowNewVoteModal(true)}>+הוסף הצבעה</Button>
            <AddNewVoteModal show={showNewVoteModal} onClose={()=>setShowNewVoteModal(false)}></AddNewVoteModal>
            <div>הצבעות קודמות</div>
        </div>
    )
}