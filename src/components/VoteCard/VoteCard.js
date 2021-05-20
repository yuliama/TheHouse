import { useMemo } from "react";
import UserVoteModel from "../../model/UserVoteModel";
import VoteOptionModel from "../../model/VoteOptionModel";
import { Pie } from 'react-chartjs-2';

export default function VoteCard({ vote }) {
    const voteSumData = useMemo(() => {
        if (!vote.userVotes) return null;
        const options = vote.voteOptions.map(option => new VoteOptionModel(option.id, option.text));
        const userVotes = vote.userVotes.map(userVote => userVote.value).flat(1);

        const sumOptionVotes = [];
        for(const option of options){
            sumOptionVotes.push(userVotes.filter(item => item===option.id).length);
        }

        console.log( options.map(option => option.text), sumOptionVotes)
        return {
            labels: options.map(option => option.text),
            datasets: [
                {
                    label: '',
                    data: sumOptionVotes,
                }
            ],
        };
    }, [vote]);
    return (
        <div>
            {vote.title}
            {vote.details}
            <Pie data={voteSumData}/>
        </div>
    )
}