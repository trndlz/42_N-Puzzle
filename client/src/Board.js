import React from 'react';

export class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            size: Math.sqrt(props.input.length)
        }
    }

    tileColor = i => {
        const { target, input } = this.props;
        if (input[i] === 0) {
            return <div className="inner-empty">💋</div>;
        } else if (target[i] === input[i]) {
            return <div className="inner-target">{input[i]}</div>;
        } else {
            return <div className="inner">{input[i]}</div>;
        }

    }

    render() {
        const size = Math.sqrt(this.props.input.length);
        const sizeArray = [...Array(size).keys()]
        return (
            <div className="grid">
                {sizeArray.map((v) =>
                    <div className="row" key={v}>{
                        sizeArray.map((w) =>
                            <div className="box" key={w}>
                                {this.tileColor(v * size + w)}
                            </div>)
                    }</div>
                )}
            </div>
        )
    }
}