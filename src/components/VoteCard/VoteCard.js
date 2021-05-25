import { useEffect, useMemo, useState } from "react";
import DateModal from "../../components/DateModal/DateModal";
import VoteOptionModel from "../../model/VoteOptionModel";
import VoteModel from "../../model/VoteModel";
import AddUserVoteModal from "../AddUserVoteModal/AddUserVoteModal"
import { Pie } from 'react-chartjs-2';
import './VoteCard.css';
import { Button } from "react-bootstrap";

export default function VoteCard({ vote, activeUser }) {
    const [showDateModal, setShowDateModal] = useState(false);
    const [showAddUserVoteModal, setShowAddUserVoteModal] = useState(false);
    const [showVoteButton, setShowVoteButton] = useState(true);
    const [showManageVoteButtons, setShowManageVoteButtons] = useState(true);
    const [showVoteIsClosedMessage, setShowVoteIsClosedMessage] = useState(false);
    
    const voteSumData = useMemo(() => {
        if (!vote.userVotes) {
            setShowVoteButton(true);
            return null;
        }

        const options = vote.voteOptions.map(option => new VoteOptionModel(option.id, option.text));
        const userVotes = vote.userVotes.map(userVote => userVote.value).flat(1);

        const sumOptionVotes = [];
        for (const option of options) {
            const optionVoteCount = userVotes.filter(item => item === option.id).length;
            sumOptionVotes.push(optionVoteCount);
        }

        
        const userVote = vote.userVotes.filter(item => item.id == activeUser.id).length;
        if(userVote){
            setShowVoteButton(false);
        }

        return {
            labels: options.map(option => option.text),
            datasets: [
                {
                    label: '',
                    data: sumOptionVotes,
                    backgroundColor: [
                        '#CA70A8',
                        '#2381CF',
                        '#E9C66E',
                        '#0B0E3E',
                        '#F6EE1D'
                    ],
                    borderColor: [
                        '#CA70A8',
                        '#2381CF',
                        '#E9C66E',
                        '#0B0E3E',
                        '#F6EE1D'
                    ],
                    borderWidth: 1,
                }
            ],
        };
    }, [vote, showAddUserVoteModal]);

    useEffect(() => {
        if(activeUser.isCommiteeMember){
            setShowManageVoteButtons(true);
        }
    }, [vote]);

    async function saveDate(date) {
        setShowDateModal(false);
        await VoteModel.saveDate(vote.id, date);
        if(date < new Date()){
            setShowManageVoteButtons(false);
            setShowVoteButton(false);
            setShowVoteIsClosedMessage(true);
        //send email
        }
    }

    async function closeVote() {
        const now = new Date();
        await VoteModel.saveDate(vote.id, now);
        setShowManageVoteButtons(false);
        setShowVoteButton(false);
        setShowVoteIsClosedMessage(true);
        //send email
    }
    function closeAddNewVoteModal(isSaved){
        setShowAddUserVoteModal(false);
        if(isSaved){
            setShowVoteButton(false);
        }
    }

    return (
        <div className="c-vote-card">
            {showVoteIsClosedMessage?
                <div className="closed-vote">ההצבעה סגורה!</div> : ''
            }
            <div className="title">{vote.title}</div>
            <div className="details">{vote.details}</div>
            {vote.userVotes ? <Pie data={voteSumData} /> : <div className="details no-votes">עדיין לא התקבלו הצבעות</div>}
            {
                vote.dueDate > new Date() && activeUser.isCommiteeMember && showManageVoteButtons ?
                    <div className="actions">
                        <Button onClick={() => setShowDateModal(true)}>הארכת ההצבעה</Button>
                        <Button onClick={() => closeVote()}>סגירת ההצבעה</Button>
                        <DateModal show={showDateModal} onClose={(date) => saveDate(date)} titleTxt="עדכון תאריך הצבעה"></DateModal>
                    </div>
                    : ''
            }
            {
                vote.dueDate > new Date() && showVoteButton ?
                    <div className="actions">
                        <Button onClick={() => setShowAddUserVoteModal(true)}>להצביע</Button>
                        <AddUserVoteModal show={showAddUserVoteModal} onClose={(isSaved) => closeAddNewVoteModal(isSaved)} vote={vote} activeUser={activeUser}></AddUserVoteModal>
                    </div>
                    : ''
            }

        </div>
    )
}