import React, { useEffect, useState } from 'react';
import { Button, Modal, Form, Col, Row } from 'react-bootstrap';
import UserModel from '../../model/UserModel';
import './AddNewUserModal.css';

export default function AddNewUserModal({ user, show, onClose }) {
    const [fullName, setFullName] = useState();
    const [email, setEmail] = useState();
    const [apartment, setApartment] = useState();

    useEffect(() => {
        clearForm();
        if (user) {
            setFullName(user.fullName);
            setEmail(user.username);
            setApartment(user.apartment);
        }

    }, [user]);

    function clearForm() {
        setFullName("");
        setEmail("");
        setApartment("");
    }

    async function createOrUpdateUser() {
        user ? await UserModel.updateUser(user.id, email, fullName, apartment)
            : await UserModel.addNewUser(email, fullName, apartment);
        clearForm();
        onClose();
    }

    return (
        <Modal show={show} onHide={onClose} size="lg" className="c-new-user">
            <Modal.Header closeButton className="d-flex justify-content-between align-items-center">
                {user ? <Modal.Title>עדכון משתמש</Modal.Title> : <Modal.Title>הוספת משתמש חדש</Modal.Title>}
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group as={Row} controlId="formHorizontalName">
                        <Form.Label column sm={3}>
                            שם מלא
                        </Form.Label>
                        <Col sm={9}>
                            <Form.Control type="text" placeholder="שם פרטי ושם משפחה"
                                value={fullName} onChange={e => setFullName(e.target.value)} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formHorizontalEmail">
                        <Form.Label column sm={3}>
                            דואר אלקטרוני
                        </Form.Label>
                        <Col sm={9}>
                            <Form.Control type="text" placeholder="דואר אלקטרוני"
                                value={email} onChange={e => setEmail(e.target.value)} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formHorizontalApartment">
                        <Form.Label column sm={3}>
                            מספר דירה
                        </Form.Label>
                        <Col sm={9}>
                            <Form.Control type="text" placeholder="מספר דירה"
                                value={apartment} onChange={e => setApartment(e.target.value)} />
                        </Col>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    ביטול
                </Button>
                <Button variant="primary" onClick={() => createOrUpdateUser()}>
                    שמירה
                </Button>
            </Modal.Footer>
        </Modal>
    )
}