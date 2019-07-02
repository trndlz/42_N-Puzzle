import React from 'react';
import { Board } from './Board';
import { Spin } from 'antd';

export class NPuzzle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            moves: 0,
            path: [],
            target: [],
            timer: 0,
            isLoaded: false,
            currentBoard: [],
        }
    }

    componentDidMount() {
        fetch('http://localhost:3000/')
            .then(res => res.json())
            .then((data) => {
                console.log(data)
                this.setState({
                    isLoaded: true,
                    moves: data.moves,
                    path: data.path.map((id) => id.split(',').map(a => parseInt(a))),
                    timer: data.timer,
                    target: data.target.split(',').map(a => parseInt(a)),
                });
                
            })
            .catch(e => console.log(e));
        this.timerID = setInterval(
            () => this.tick(), 1000
        );
    }

    tick() {
        const { path } = this.state;
        if (path.length) {
            const updatedPath = this.state.path.shift();
            this.setState({
                currentBoard: updatedPath,
            });
        }
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    render() {
        const { isLoaded, currentBoard, target } = this.state;

        if (isLoaded) {
            // console.log(currentBoard)
            return <Board input={currentBoard} target={target} />
        } else {
            return <Spin size="large" />
        }
    }
}