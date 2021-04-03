import React from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Form, Grid, Header, Menu, MenuItem, Segment, Progress } from 'semantic-ui-react'

import { api, handleError } from '../../helpers/api';

class Scorepage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  async componentDidMount() {
      try{
          const response = await api.get('/score');

          this.setState(response.data);

        
      }catch(error){
          alert('Something went wrong while fetching the scores');
      }
  }

  render() {

    return (
      <div>
        <Menu borderless secondary>
        <Menu.Item position ='right'>
		<Button color='red' onClick = {()=>{}}>EXIT</Button>
	    </Menu.Item>
        </Menu>
        <ScoreBox players = {this.state}/>

      </div>
    );
  }
  
}

const ScoreBox = (props) => {
    


    const ProgressBar = (score) => (
        <Progress percent={score/5000*100} success>
            <h3>/5000</h3>
        </Progress>
        )

    return ( 
    
    <Grid textAlign='center' style={{ height: '90vh' }} verticalAlign='middle'>
        
        <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' color='teal' textAlign='center'>
            <text>Your Score</text>
        </Header>
        <Segment raised>
        <Form size='large'>
            <ProgressBar score = {79}/>
            <Button color='teal' fluid size='large'>
                Next Round
            </Button>
        </Form>
        </Segment>
        </Grid.Column>
    </Grid>
    )
}




export default withRouter(Scorepage);
