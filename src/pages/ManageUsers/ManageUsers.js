import { useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import { Container, Row, Col, Button } from 'react-bootstrap';
import CommunityModel from '../../model/CommunityModel';

export default function ManageUsers({ activeUser }) {

    const [communityUsers, setCommunityUsers] = useState([]);
    const [communityDetails, setCommunityDetails] = useState([]);

    useEffect(() => {
        async function fetchData() {
            setCommunityUsers(await activeUser.GetComminityUsers(activeUser.Community.id));
            setCommunityDetails(await CommunityModel.getCommunityDetails(activeUser.Community.id));
        }

        if (activeUser) {
            fetchData();
        }
    }, [activeUser])

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
                <Row key={user.id} className="bg-light text-dark border">
                    <Col md={1}>{index + 1}</Col>
                    <Col md={2}>{user.fullName}</Col>
                    <Col md={2}>{user.email}</Col>
                    <Col md={1}>{user.apartment}</Col>
                    <Col md={6}>
                        <Button>עריכה</Button>
                        <Button>מחיקה</Button>
                    </Col>
                </Row>
            )}
            <Row className="bg-light text-dark border">
                    <Col md={1}></Col>
                    <Col md={2}></Col>
                    <Col md={2}><a href="">+הוסף דייר</a></Col>
                </Row>

        </Container>
    )

}