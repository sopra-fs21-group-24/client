import React from 'react';
import { withRouter } from 'react-router-dom';

class Header extends React.Component{

    constructor(props){
        super(props);
        this.state = {};
    }

    getExitButton =()=>{
        return(
            <Button>Exit</Button>
        );
    }

    getLogo = () =>{
        return(
            <h1>Logo</h1>
        )
    }

    getHeaderStats = ()=>{
        return(
            <div>
                <text>Score</text>
                <text>Time</text>
                <text>Round</text>
            </div>
        )
    }



    render(){
        return(
            <Toolbar>
                {getLogo()}
                {getHeaderStats()}
                {getExitButton()}
            </Toolbar>
        )
    }


}
export default Header;