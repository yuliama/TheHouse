import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Redirect } from 'react-router';
import AddNewVoteModal from "../../components/AddNewVoteModal/AddNewVoteModal";
import VoteCard from "../../components/VoteCard/VoteCard";
import VoteModel from "../../model/VoteModel";
import './VotesPage.css';

export default function VotesPage({ activeUser }) {
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
    if (!activeUser) {
        return <Redirect to="/" />
    }
    return (
        <div className="p-votes">
            {activeUser.isCommiteeMember ?
                <Button onClick={() => setShowNewVoteModal(true)}>+הוסף הצבעה</Button>
                : ''
            }
            <AddNewVoteModal show={showNewVoteModal} onClose={() => setShowNewVoteModal(false)} activeUser={activeUser}></AddNewVoteModal>
            {communityVotes.length ?
                <div>
                    <h1>הצבעות קודמות</h1>
                    <div className="prev-votes">
                        {communityVotes.map((vote, index) => <VoteCard key={index} vote={vote} activeUser={activeUser}></VoteCard>)}
                    </div>
                </div>
                :
                <div>אין הצבעות קודמות</div>
            }
        </div>
    )
}