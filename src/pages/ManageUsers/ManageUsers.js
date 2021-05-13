import { useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import { Container, Row, Col } from 'react-bootstrap';

export default function ManageUsers({ activeUser }) {

    const [communityUsers, setCommunityUsers] = useState([]);

    useEffect(() => {
        async function fetchData() {
            setCommunityUsers(await activeUser.GetComminityUsers(activeUser.Community.id));
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
            <Row>
                {communityUsers.map(user =>
                    <Col key={user.id} md={3} sm={6}>
                        {user.fullName}{', '}{user.apartment}
                    </Col>
                )}
            </Row>
        </Container>
    )

}