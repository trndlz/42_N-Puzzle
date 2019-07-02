import React, { useState, useEffect, useRef } from "react";
import { Spin } from 'antd';
import { Button, Menu, Icon, Dropdown } from 'antd';
import Statistics from "./Statistics";
import Board from "./Board";

const NPuzzle = () => {

    const [moves, setMoves] = useState(0);
    const [delay, setDelay] = useState(1000);
    const [path, setPath] = useState([]);
    const [target, setTarget] = useState([]);
    const [timer, setTimer] = useState([]);
    const [play, setPlay] = useState(false);
    const [heuristics, setHeuristics] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [currentBoard, setCurrentBoard] = useState(0);

    useInterval(() => {
        if (currentBoard < moves && play) {
            setCurrentBoard(currentBoard + 1);
        }
    }, delay);

    useEffect(() => {
        fetch('http://localhost:3000/')
            .then(res => res.json())
            .then((data) => {
                setHeuristics(data.heuristics);
                setMoves(data.moves);
                setPath(data.path.map((id) => id.split(',').map(a => parseInt(a))));
                setTimer(data.timer);
                setTarget(data.target.split(',').map(a => parseInt(a)))
                setIsLoaded(true);
            })
            .catch(e => console.log(e));
    }, []);

    function useInterval(callback, delay) {
        const savedCallback = useRef();
        useEffect(() => {
            savedCallback.current = callback;
        }, [callback]);
        useEffect(() => {
            function tick() {
                savedCallback.current();
            }
            if (delay !== null) {
                let id = setInterval(tick, delay);
                return () => clearInterval(id);
            }
        }, [delay]);
    }

    function playSolution() {
        setPlay(true);
    }

    function resetSolution() {
        setCurrentBoard(0);
        setPlay(false);
    }

    function handleMenuClick(e) {
        setDelay(e.item.props.value);
    }

    const speedMenu = (
        <Menu onClick={handleMenuClick}>
            <Menu.Item key="1" value="100">100ms</Menu.Item>
            <Menu.Item key="2" value="400">400ms</Menu.Item>
            <Menu.Item key="3" value="1000">1000ms</Menu.Item>
        </Menu>
    );

    if (isLoaded) {
        return (
            <div>
                <Statistics moves={moves} heuristics={heuristics} timer={timer} />
                <div>
                    <Board input={path[currentBoard]} target={target} />
                </div>
                <div style={{ margin: '40px' }}>
                    <Button icon="play-circle" onClick={playSolution}>Play</Button>
                    <Button icon="backward" onClick={resetSolution}>Reset</Button>
                    <Dropdown overlay={speedMenu}>
                        <Button>
                            Speed <Icon type="down" />
                        </Button>
                    </Dropdown>
                </div>

            </div >
        )
    } else {
        return <Spin size="large" />
    }
}

export default NPuzzle;
