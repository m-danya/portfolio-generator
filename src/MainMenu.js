import React, { Component } from 'react'
import { Menu, Segment } from 'semantic-ui-react'

export default class MainMenu extends Component {
  //state = { activeItem: this.props.page }

  handleItemClick = (e, { name }) => this.props.setPage(name);

  render() {

    return (
      <Menu
        secondary
        style={{
          paddingLeft: '30px',
          paddingTop: '10px',
        }}
      //pointing
      //secondary
      >
        <Menu.Item
          name='hello'
          active={this.props.page === 'hello'}
          onClick={this.handleItemClick}

        >
          Главная
        </Menu.Item>
        <Menu.Item
          name='portfolios'
          active={this.props.page === 'portfolios'}
          onClick={this.handleItemClick}
        >
          Созданные портфолио
        </Menu.Item>
        <Menu.Item
          name='main'
          active={this.props.page === 'main' || this.props.page == 'move'}
          onClick={this.handleItemClick}
        >
          Редактировать портфолио
        </Menu.Item>


      </Menu>
    )
  }
}
