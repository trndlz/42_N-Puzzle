import React, { useState } from "react";
import './App.css';
import { Layout, Menu, Icon } from 'antd';
import NPuzzle from "./components/NPuzzle";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Import from "./components/Import";
import RandomBoard from "./components/RandomBoard";

const { Content, Footer } = Layout;

const App = () => {

  const getCurrentPage = (path) => {
    if (path === '/puzzle4') {
      return ("4");
    } else if (path === '/import') {
      return ("5");
    } else {
      return ("3")
    }
  }

  const [current, setCurrent] = useState(getCurrentPage(window.location.pathname));

  const handleClick = e => {
    setCurrent(e.key);
  };

  const DefaultPuzzle3 = () => {
    const random = RandomBoard(3)
    return <NPuzzle rawPuzzle={random} heuristics={"MANHATTAN"} />;
  }

  const DefaultPuzzle4 = () => {
    const random = RandomBoard(4)
    return <NPuzzle rawPuzzle={random} heuristics={"MIXED_LINEAR_CONFLICT_MANHATTAN"} />;
  }

  const Header = () => {
    return (
      <Menu onClick={handleClick} defaultSelectedKeys={[current]} mode="horizontal">
        <Menu.Item key="3">
          <Link to="/"><Icon type="gift" />Random Size 3</Link>
        </Menu.Item>
        <Menu.Item key="4">
          <Link to="/puzzle4"><Icon type="lock" />Random Size 4</Link>
        </Menu.Item>
        <Menu.Item key="5">
          <Link to="/import"><Icon type="upload" />Import</Link>
        </Menu.Item>
      </Menu>
    );
  }

  return (
    <div className="App">
      <Router>
        <div>
          <Header />
          <Layout className="layout" style={{ height: "100vh" }}>
            <Content style={{ padding: '5vw' }}>
              <Route exact path="/" component={DefaultPuzzle3} />
              <Route path="/puzzle4" component={DefaultPuzzle4} />
              <Route path="/import" component={Import} />
            </Content>
            <Footer style={{ textAlign: 'center' }}>© 2019</Footer>
          </Layout>
        </div>
      </Router>
    </div>
  );
}

export default App;