import { Button, Modal } from "react-bootstrap";
import "./MessageModal.css";

export default function MessageModal({ messageTxt, show, onClose }) {
    return (
        <Modal show={show} onHide={onClose} size="lg" className="c-message-modal">
            <Modal.Header closeButton className="d-flex justify-content-between align-items-center">
                <Modal.Title>{messageTxt}</Modal.Title>
            </Modal.Header>
            {/* <Modal.Body></Modal.Body> */}
            <Modal.Footer>
                <Button variant="primary" onClick={() => onClose()}>
                    שמירה
                </Button>
            </Modal.Footer>
        </Modal>
    )
}