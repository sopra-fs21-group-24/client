import { Header, Label } from "semantic-ui-react";
export const GameDebugView = (props) => {
    return (
      <div>
        <Header as="h1" inverted>
          Debug Specs
        </Header>
        <Label>Current question Id: {props.info.currentQuestionId}</Label>
      </div>
    );
  };