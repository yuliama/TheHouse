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

export default function AddUserVoteModal(vote, show, onClose, activeUser) {
    return (
        <Modal show={show} onHide={onClose} size="lg" className="c-new-useVote">
            <Modal.Header closeButton className="d-flex justify-content-between align-items-center">
                <Modal.Title>{vote.title}</Modal.Title>
                {vote.details}
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="optionsList" as={Row} controlId="formHorizontalOptionsList">
                        {options.map(item => {
                            return <VoteOption key={item.id} option={item} deleteItem={''}></VoteOption>
                        })}
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