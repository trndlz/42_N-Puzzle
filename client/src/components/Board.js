import React from "react";

const Board = (props) => {

    const size = Math.sqrt(props.input.length);
    const sizeArray = [...Array(size).keys()]
    const target = props.target;
    const input = props.input;

    const tileColor = i => {
        if (input[i] === 0) {
            return (
                <div className="inner empty">
                    <span role="img" aria-label="kiss">💋</span>
                </div>
            );
        } else if (target[i] === input[i]) {
            return <div className="inner target">{input[i]}</div>;
        } else {
            return <div className="inner normal">{input[i]}</div>;
        }

    }

    return (
        <div className="grid">
            {sizeArray.map((v) =>
                <div className="row" key={v}>{
                    sizeArray.map((w) =>
                        <div className="box" key={w}>
                            {tileColor(v * size + w)}
                        </div>)
                }</div>
            )}
        </div>
    )
}

export default Board;