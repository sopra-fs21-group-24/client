import React from "react";
import { Button, Input, Dropdown, Form, Modal } from "semantic-ui-react";

const ProfileModal = (props) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [password, setPassword] = React.useState(props.user.password);
  const [username, setUsername] = React.useState(props.user.username);


  return (
    <Modal
      centered={false}
      open={isOpen}
      onClose={() => setIsOpen(false)}
      onOpen={() => setIsOpen(true)}
      trigger={<Dropdown.Item>Edit Profile</Dropdown.Item>}
    >
      <Modal.Header>Update your Profile</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          Enter a new username or change your password.
        </Modal.Description>
        <Form>
          <Form.Field>
            <Input
              defaultValue={props.user.username}
              placeholder="Username"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </Form.Field>

          <Form.Field>
            <Input
              defaultValue={password}
              type="password"
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </Form.Field>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button
          primary
          onClick={() => {
            props.updateUser(username, password);
            setIsOpen(false);
          }}
        >
          Update Changes
        </Button>
        <Button onClick={() => setIsOpen(false)}>Cancel</Button>
      </Modal.Actions>
    </Modal>
  );
};

export default ProfileModal;
