import { useMemo } from "react";
import UserVoteModel from "../../model/UserVoteModel";
import VoteOptionModel from "../../model/VoteOptionModel";
import { Pie } from 'react-chartjs-2';
import './VoteCard.css';

export default function VoteCard({ vote }) {
    const voteSumData = useMemo(() => {
        if (!vote.userVotes) return null;
        const options = vote.voteOptions.map(option => new VoteOptionModel(option.id, option.text));
        const userVotes = vote.userVotes.map(userVote => userVote.value).flat(1);

        const sumOptionVotes = [];
        for(const option of options){
            sumOptionVotes.push(userVotes.filter(item => item===option.id).length);
        }

        return {
            labels: options.map(option => option.text),
            datasets: [
                {
                    label: '',
                    data: sumOptionVotes,
                    backgroundColor: [
                        '#CA70A8',
                        '#2381CF',
                        '#E9C66E',
                        '#0B0E3E',
                        '#F6EE1D'
                      ],
                      borderColor: [
                        '#CA70A8',
                        '#2381CF',
                        '#E9C66E',
                        '#0B0E3E',
                        '#F6EE1D'
                      ],
                      borderWidth: 1,
                }
            ],
        };
    }, [vote]);
    return (
        <div className="c-vote-card">
            <div className="title">{vote.title}</div>
            <div className="details">{vote.details}</div>
            {vote.userVotes?<Pie data={voteSumData}/>:<div  className="details">עדיין לא התקבלו הצבעות</div>}
        </div>
    )
}