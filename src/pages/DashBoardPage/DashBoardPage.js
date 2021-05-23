import { useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import { Container, Row, Col } from 'react-bootstrap';
import VoteCard from '../../components/VoteCard/VoteCard';
import CommunityModel from '../../model/CommunityModel';
import VoteModel from '../../model/VoteModel';

export default function DashBoardPage({ activeUser }) {
    const [communityVotes, setCommunityVotes] = useState([]);
    const [communityUsers, setCommunityUsers] = useState([]);
    const [communityDetails, setCommunityDetails] = useState([]);

    useEffect(() => {
        async function fetchData() {
            setCommunityVotes(await VoteModel.getCommunityVotes(activeUser.Community.id));
            setCommunityUsers(await activeUser.GetComminityUsers(activeUser.Community.id));
            setCommunityDetails(await CommunityModel.getCommunityDetails(activeUser.Community.id));
        }
        if (activeUser) {
            fetchData();
        }
    }, [activeUser]);
    if (!activeUser) {
        return <Redirect to="/" />
    }
    return (
        <div>
            {activeUser.isCommiteeMember ?
                <Container className="p-manageUsers">
                    <h1>דיירי בניין בכתובת: {communityDetails.map(item => item.Address)}</h1>
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

                        </Row>
                    )}
                </Container>
                :''
            }
            <div className="p-votes">
                {communityVotes.length ?
                    <div>
                        <h1>הצבעות</h1>
                        <div className="prev-votes">
                            {communityVotes.slice(0, 3).map((vote, index) => <VoteCard key={index} vote={vote} activeUser={activeUser}></VoteCard>)}
                        </div>
                    </div>
                    :
                    ''
                }
            </div>
        </div>
    )
}