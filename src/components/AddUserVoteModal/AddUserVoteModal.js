import { useState } from "react";
import { Button, Modal, Form, Col, Row } from "react-bootstrap";
import UserVoteModel from "../../model/UserVoteModel";
import VoteModel from "../../model/VoteModel";
import VoteUserOption from "../VoteUserOption/VoteUserOption"
import "./AddUserVoteModal.css"

export default function AddUserVoteModal({ show, onClose, vote, activeUser }) {
    const [chosenItem, setChosenItem] = useState([]);
    async function createUserVote() {
        const userVote = new UserVoteModel(activeUser.id, chosenItem.map(item => item.id));
        await VoteModel.addUserVote(vote.id, userVote);
        onClose();
    }

    function createOptionsObject(obj) {
        //if (vote.isPermitMultiVotes) {
            let exists = false;
            if (obj) {
                const userVotes = [...chosenItem];

                for (const item of userVotes) {
                    if (item.id === obj.id) {
                        exists = true;
                        setChosenItem(userVotes.filter(listItem => { return listItem.id != obj.id }));
                    }
                }
                if (!exists) {
                    setChosenItem(userVotes.concat(obj));
                }
            }
        //}
        // else {
        //     setChosenItem(obj);
        // }
    }
    return (
        <Modal show={show} onHide={onClose} size="lg" className="c-new-useVote">
            <Modal.Header closeButton className="d-flex justify-content-between align-items-center">
                <Modal.Title>{vote.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="vote-details">{vote.details}</div>
                <div className="vote-details">אנא בחר:</div>
                <div className="vote-options">
                    {vote.voteOptions.map(item =>
                        <VoteUserOption item={item} setChosen={(chosenItem) => createOptionsObject(chosenItem)}></VoteUserOption>
                    )}
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => onClose()}>
                    ביטול
                </Button>
                <Button variant="primary" onClick={() => createUserVote()}>
                    שמירה
                </Button>
            </Modal.Footer>
        </Modal >
    )
}