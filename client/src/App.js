import React, { Component } from 'react';
import './App.css';
import { Layout, Menu, Icon } from 'antd';
import { Board } from './Board';

const { Content, Footer } = Layout;

class App extends Component {
  state = {
    current: 'mail',
  };

  handleClick = e => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  };

  render() {
    return (
      <div className="App">

        <Layout className="layout" style={{ height: "100vh" }}>
          <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
            <Menu.Item key="gift">
              <Icon type="gift" />
              Puzzle 3
        </Menu.Item>
            <Menu.Item key="lock">
              <Icon type="lock" />
              Puzzle 4
        </Menu.Item>
          </Menu>
          <Content style={{ padding: '5vw' }}>
              <Board input={[1, 2, 3, 5, 5, 5, 7, 8, 0]} />
          </Content>
          <Footer style={{ textAlign: 'center' }}>© 2018</Footer>
        </Layout>

      </div>
    );
  }
}

export default App;