import React from 'react'
import { Button, Input, Dropdown, Form, Modal } from 'semantic-ui-react'


const ProfileModal = (props) => {
  const [open, setOpen] = React.useState(false)
  const [password, setPassword] = React.useState(props.user.password)
  const [username, setUsername] = React.useState(props.user.username)
  
  
//   setPassword(props.user.password)
//   setUsername(props.user.username)

  console.log("in header", props)
  return (
    <Modal
      centered={false}
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
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
                onChange={e => {
                  setUsername( e.target.value)
                }}
                />
              </Form.Field>
       
            <Form.Field>

            <Input
 
            defaultValue={props.user.password}
              type="password"
              placeholder="Password"
              onChange={e => {
                setPassword(e.target.value)
              }}
              />
              </Form.Field>
         
         
          </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button  primary onClick={() => {
            props.updateUser(username, password)
            setOpen(false);
        
        }}>Update Changes</Button>
        <Button onClick={() => setOpen(false)}>Cancel</Button>
      </Modal.Actions>
    </Modal>
  )
}

export default ProfileModal