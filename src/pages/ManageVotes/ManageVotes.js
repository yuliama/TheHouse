import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import AddNewVoteModal from "../../components/AddNewVoteModal/AddNewVoteModal";
import VoteCard from "../../components/VoteCard/VoteCard";
import VoteModel from "../../model/VoteModel";
import './ManageVotes.css';

export default function ManageVotes({ activeUser }) {
    const [showNewVoteModal, setShowNewVoteModal] = useState(false);
    const [communityVotes, setCommunityVotes] = useState([]);
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
            <AddNewVoteModal show={showNewVoteModal} onClose={() => setShowNewVoteModal(false)} activeUser={activeUser}></AddNewVoteModal>
            {communityVotes.length ?
                <div>
                    <h1>הצבעות קודמות</h1>
                    <div className="prev-votes">
                        {communityVotes.slice(0, 6).map((vote) => <VoteCard vote={vote}></VoteCard>)}
                    </div>
                    {communityVotes.length > 6 ?
                        <div className="more-votes-link">
                            <a href="">להצבעות נוספות</a>
                        </div>
                        : ''}
                </div>
                :
                <div>אין הצבעות קודמות</div>
            }
        </div>
    )
}