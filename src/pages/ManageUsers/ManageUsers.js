import { useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import { Container, Row, Col, Button } from 'react-bootstrap';
import CommunityModel from '../../model/CommunityModel';
import AddNewUserModal from '../../components/AddNewUserModal/AddNewUserModal';
import './ManageUsers.css';

export default function ManageUsers({ activeUser }) {
    const [communityUsers, setCommunityUsers] = useState([]);
    const [communityDetails, setCommunityDetails] = useState([]);
    const [showNewUserModal, setShowNewUserModal] = useState(false);
    const [userToUpdate, setUserToUpdate] = useState();

    useEffect(() => {
        async function fetchData() {
            setCommunityUsers(await activeUser.GetComminityUsers(activeUser.Community.id));
            setCommunityDetails(await CommunityModel.getCommunityDetails(activeUser.Community.id));
        }

        if (activeUser) {
            fetchData();
        }
    }, [activeUser, communityDetails]);

    async function deleteUser(user) {
        await activeUser.deleteUser(user.id);
    }
    async function updateUser(user) {
        setShowNewUserModal(true);
        setUserToUpdate(user);
    }
    async function addUser(){
        setShowNewUserModal(true);
        setUserToUpdate(null);
    }

    if (!activeUser) {
        return <Redirect to="/" />
    }
    if (!activeUser.isCommiteeMember) {
        return <Redirect to="/dashBoard" />
    }

    return (
        <Container className="p-manageUsers">
            <h1>רשימת דיירי בניין בכתובת: {communityDetails.map(item => item.Address)}</h1>
            <Row className="bg-light text-dark border">
                <Col md={1}>מס"ד</Col>
                <Col md={2}>שם</Col>
                <Col md={2}>דוא"ל</Col>
                <Col md={1}>מספר דירה</Col>
                <Col md={6}></Col>
            </Row>
            {communityUsers.map((user, index) =>
                <Row key={user.id} className="bg-light text-dark border userRow">
                    <Col md={1}>{index + 1}</Col>
                    <Col md={2}>{user.fullName}</Col>
                    <Col md={2}>{user.username}</Col>
                    <Col md={1}>{user.apartment}</Col>
                    <Col md={6}>
                        <Button onClick={() => updateUser(user)}>עריכה</Button>
                        {user.id != activeUser.id ? <Button onClick={() => deleteUser(user)}>מחיקה</Button> : ''}
                    </Col>
                </Row>
            )}
            <Row className="bg-light text-dark border">
                <Col md={1}></Col>
                <Col md={2}></Col>
                <Col md={2}><Button onClick={() => addUser()}>+הוסף דייר</Button></Col>
            </Row>
            <AddNewUserModal user={userToUpdate} show={showNewUserModal} onClose={() => setShowNewUserModal(false)}></AddNewUserModal>
        </Container>
    )
}