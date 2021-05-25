import { useEffect, useState } from "react"
import { Button, Modal, Form, Col, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./DateModal.css"
import he from 'date-fns/locale/he';
import MessageModal from '../MessageModal/MessageModal'

export default function DateModal({titleTxt, show, onClose}) {
    const [dueDate, setDueDate] = useState();
    const [showMessageModal, setShowMessageModal] = useState(false);
    //const [messageTxt, setMessageTxt] = useState("ארעה שגיאה");

    useEffect(() => {
        setShowMessageModal(false);
        registerLocale('he', he);
    }, []);

    return (
        <Modal show={show} onHide={onClose} size="lg" className="c-date">
            <Modal.Header closeButton className="d-flex justify-content-between align-items-center">
                <Modal.Title>{titleTxt}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group as={Row} controlId="formHorizontalDueDate">
                    <Form.Label column sm={3}>
                        בחר תאריך
                    </Form.Label>
                    <Col sm={3}>
                        <DatePicker selected={dueDate} onChange={(date) => setDueDate(date)} inline locale="he" />
                    </Col>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => onClose(null)}>
                    ביטול
                </Button>
                <Button variant="primary" onClick={() => onClose(dueDate)}>
                    שמירה
                </Button>
            </Modal.Footer>
            {/* <MessageModal messageTxt={messageTxt} show={showMessageModal} onClose={() => setShowMessageModal(false)}></MessageModal> */}
            </Modal>
            )
}