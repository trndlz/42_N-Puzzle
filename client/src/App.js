import React, { Component } from 'react';
import './App.css';
import { Layout, Menu, Icon } from 'antd';

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
            
              <div class="grid">
                <div class="row">
                  <div class="box"><div class="inner">1</div></div>
                  <div class="box"><div class="inner">2</div></div>
                  <div class="box"><div class="inner">3</div></div>
                </div>
                <div class="row">
                  <div class="box"><div class="inner">6</div></div>
                  <div class="box"><div class="inner">7</div></div>
                  <div class="box"><div class="inner">8</div></div>
                </div>
                <div class="row">
                  <div class="box"><div class="inner">16</div></div>
                  <div class="box"><div class="inner">17</div></div>
                  <div class="box"><div class="inner">18</div></div>
                </div>
              </div>

          </Content>
          <Footer style={{ textAlign: 'center' }}>© 2018</Footer>
        </Layout>

      </div>
    );
  }
}

export default App;