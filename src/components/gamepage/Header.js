import React from 'react';
import { withRouter } from 'react-router-dom';
import React, { Component } from 'react'
import { Button, Dropdown, Menu } from 'semantic-ui-react'

class Header extends React.Component{

    state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Menu size='small' inverted>
        <Menu.Item>
          <img src='https://react.semantic-ui.com/logo.png' alt ={NaN}/>
        </Menu.Item>
        <Menu.Item
          name='Score'
          active={activeItem === 'Score'}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          name='Time'
          active={activeItem === 'Time'}
          onClick={this.handleItemClick}
        />


          <Menu.Item position ='right'>
            <Button color='red'>exit</Button>
          </Menu.Item>
      </Menu>
    )
  }

}

export default Header;