import React from 'react';
import axios from 'axios';
import { Board } from './Board';

export class NPuzzle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            moves: 0,
            path: [],
            timer: 0,
            isLoaded: false,
            currentBoard: [],
        }
    }

    componentDidMount() {
        fetch('http://localhost:3000/')
            .then(res => res.json())
            .then((data) => {
                this.setState({
                    isLoaded: true,
                    moves: data.moves,
                    path: data.path.map((id) => id.split(',').map(a => parseInt(a))),
                    timer: data.timer,
                });
                
            })
            .catch(e => console.log(e));
        this.timerID = setInterval(
            () => this.tick(), 1000
        );
    }

    tick() {
        const { path } = this.state;
        if (path.length > 1) {
            const updatedPath = this.state.path.shift();
            console.log(updatedPath);
            // this.setState({
            //     path: updatedPath,
            // });
        }
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    render() {
        const { isLoaded, path } = this.state;

        if (isLoaded) {
            console.log(path[0])
            return <Board input={path[0]} />
        } else {
            return <div>TEST</div>
        }
    }
}