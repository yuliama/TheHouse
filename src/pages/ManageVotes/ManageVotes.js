import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import AddNewVoteModal from "../../components/AddNewVoteModal/AddNewVoteModal";
import VoteCard from "../../components/VoteCard/VoteCard";
import VoteModel from "../../model/VoteModel";
import './ManageVotes.css';

export default function ManageVotes({ activeUser }) {
    const [showNewVoteModal, setShowNewVoteModal] = useState(false);
    const [communityVotes, setCommunityVotes] = useState([]);
// console.log(communityVotes);
    useEffect(() => {
        async function fetchData() {
            setCommunityVotes(await VoteModel.getCommunityVotes(activeUser.Community.id));
        }

        if (activeUser) {
            fetchData();
        }
    }, []);
    return (
        <div className="p-manageVotes">
            <Button onClick={() => setShowNewVoteModal(true)}>+הוסף הצבעה</Button>
            <AddNewVoteModal show={showNewVoteModal} onClose={() => setShowNewVoteModal(false)}></AddNewVoteModal>
            {communityVotes.length ?
                <div>הצבעות קודמות
                    {communityVotes.map((vote) => <VoteCard vote={vote}></VoteCard>)}
                </div>
                :
                <div>אין הצבעות קודמות</div>}
        </div>
    )
}