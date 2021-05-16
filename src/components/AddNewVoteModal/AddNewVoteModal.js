import { useState } from "react"

export default function AddNewVoteModal({ show, onClose }){
    const [title, setTitle] = useState();
    const[details, setDetails] = useState();
    const [dueDate, setDueDate] = useState();
    const[isPermitMultiVotes, setIsPermitMultiVotes] = useState();

return(
    <Modal show={show} onHide={onClose} size="lg" className="c-new-user">
            <Modal.Header closeButton>
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
                    {/* <Form.Group as={Row} controlId="formHorizontalApartment">
                        <Form.Label column sm={3}>
                            מספר דירה
                        </Form.Label>
                        <Col sm={9}>
                            <Form.Control type="text" placeholder="מספר דירה"
                                value={apartment} onChange={e => setApartment(e.target.value)} />
                        </Col>
                    </Form.Group> */}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    ביטול
                </Button>
                <Button variant="primary" onClick={() => createOrUpdateVote()}>
                    שמירה
                </Button>
            </Modal.Footer>
        </Modal>
)
}