import { Redirect } from 'react-router';

export default function DashBoardPage({activeUser}){
    //console.log(activeUser);
    if (!activeUser) {       
        return <Redirect to="/"/>
    }
    return (
        <div>
actions
        </div>
    )
}