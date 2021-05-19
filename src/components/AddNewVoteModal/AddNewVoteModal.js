import { useEffect, useState } from "react"
import { Button, Modal, Form, Col, Row, Alert } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { registerLocale } from "react-datepicker";
import VoteOptionSection from '../VoteOptionSection/VoteOptionSection'
import "react-datepicker/dist/react-datepicker.css";
import "./AddNewVoteModal.css"
import he from 'date-fns/locale/he';
import VoteModel from "../../model/VoteModel";
import MessageModal from '../MessageModal/MessageModal'


export default function AddNewVoteModal({ show, onClose }) {
    const [title, setTitle] = useState();
    const [details, setDetails] = useState();
    const [dueDate, setDueDate] = useState();
    const [isPermitMultiVotes, setIsPermitMultiVotes] = useState(false);
    const [voteOptions, setVoteOptions] = useState([]);
    const [showMessageModal, setShowMessageModal] = useState(false);
    const [messageTxt, setMessageTxt] = useState("ארעה שגיאה");

    useEffect(() => {
        clearForm();
        registerLocale('he', he);
    }, []);

    function clearForm() {
        setShowMessageModal(false);
        setTitle('');
        setDetails('');
        setDueDate('');
        setIsPermitMultiVotes(false);
        setVoteOptions([]);
    }
    function close() {
        clearForm();
        onClose();
    }

    async function createOrUpdateVote() {
        if (title && details && voteOptions) {
            const result = await VoteModel.addNewVote(title, details, dueDate, isPermitMultiVotes, voteOptions);
            setShowMessageModal(true);
            if (result) {
                setMessageTxt("ההצבעה נשמרה");
                close();
            }
            else {     
                setMessageTxt("חלה שגיאה בשמירת ההצבעה");
            }
        }
        else {
            setShowMessageModal(true);
            setMessageTxt("חסרים פרטים לשמירת ההצבעה");
        }
    }
    return (
        <Modal show={show} onHide={onClose} size="lg" className="c-new-vote">
            <Modal.Header closeButton className="d-flex justify-content-between align-items-center">
                <Modal.Title>הוספת הצבעה חדשה</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group as={Row} controlId="formHorizontalTitle">
                        <Form.Label column sm={3}>
                            כותרת
                        </Form.Label>
                        <Col sm={9}>
                            <Form.Control type="text" placeholder="כותרת הצבעה"
                                value={title} onChange={e => setTitle(e.target.value)} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formHorizontalDetails">
                        <Form.Label column sm={3}>
                            פרטי הצבעה
                        </Form.Label>
                        <Col sm={9}>
                            <Form.Control type="text" placeholder="פרטים נוספים"
                                value={details} onChange={e => setDetails(e.target.value)} />
                        </Col>
                    </Form.Group>
                    <VoteOptionSection onChange={(options) => setVoteOptions(options)}></VoteOptionSection>
                    <Form.Group as={Row} controlId="formHorizontalDueDate">
                        <Form.Label column sm={3}>
                            תאריך סיום הצבעה
                        </Form.Label>
                        <Col sm={3}>
                            <DatePicker selected={dueDate} onChange={(date) => setDueDate(date)} inline locale="he" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="align-items-center" controlId="formHorizontalIsPermitMultiVotes">
                        <Col sm={3}>
                            <Form.Check type="checkbox" checked={isPermitMultiVotes} onChange={() => setIsPermitMultiVotes(!isPermitMultiVotes)} />
                        </Col>
                        <Form.Label column sm={9}>
                            לאפשר בחירת אופציות מרובות?
                        </Form.Label>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => close()}>
                    ביטול
                </Button>
                <Button variant="primary" onClick={() => createOrUpdateVote()}>
                    שמירה
                </Button>
            </Modal.Footer>
            <MessageModal messageTxt={messageTxt} show={showMessageModal} onClose={() => setShowMessageModal(false)}></MessageModal>
        </Modal >
    )
}