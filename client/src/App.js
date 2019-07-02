import React, { useState, useEffect } from "react";
import './App.css';
import { Layout, Menu, Icon } from 'antd';
import NPuzzle from "./components/NPuzzle";

const { Content, Footer } = Layout;

const App = () => {
  const [current, setCurrent] = useState("3");

  const handleClick = e => {
    setCurrent(e.key);
  };

  const defaultSize3 = "# This puzzle is solvable\n3\n8 6 1\n7 2 0\n5 4 3\n";
  const defaultSize4 = "# This puzzle is solvable\n4\n1 0 3 4\n12 2 13 5\n11 9 14 8\n15 10 7 6\n";

  const PuzzleSwitcher = () => {
    if (current === "3") {
      return (<NPuzzle rawPuzzle={defaultSize3} />);
    } else {
      return (<NPuzzle rawPuzzle={defaultSize4} />);
    }
  }

  return (
    <div className="App">
      <Layout className="layout" style={{ height: "100vh" }}>
        <Menu onClick={handleClick} defaultSelectedKeys={['3']} mode="horizontal">
          <Menu.Item key="3">
            <Icon type="gift" />Default Puzzle 3
        </Menu.Item>
          <Menu.Item key="4">
            <Icon type="lock" />Default Puzzle 4
        </Menu.Item>
        </Menu>
        <Content style={{ padding: '5vw' }}>
          <PuzzleSwitcher />
        </Content>
        <Footer style={{ textAlign: 'center' }}>© 2019</Footer>
      </Layout>
    </div>
  );
}

export default App;