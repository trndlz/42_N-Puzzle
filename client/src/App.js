import React, { useState } from "react";
import './App.css';
import { Layout, Menu, Icon } from 'antd';
import NPuzzle from "./components/NPuzzle";


const { Content, Footer } = Layout;

const App = () => {


  let [current, setCurrent] = useState();

  const handleClick = e => {
    setCurrent(e.key);
  };

  return (
    <div className="App">
      <Layout className="layout" style={{ height: "100vh" }}>
        <Menu onClick={handleClick} selectedKeys={current} mode="horizontal">
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
          <NPuzzle />
        </Content>
        <Footer style={{ textAlign: 'center' }}>© 2019</Footer>
      </Layout>
    </div>
  );
}

export default App;