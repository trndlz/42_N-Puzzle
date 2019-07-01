import React from 'react';

export class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            size: Math.sqrt(props.input.length)
        }
    }

    render() {
        const { size } = this.state;
        const array = this.props.input;
        const sizeArray = [...Array(this.state.size).keys()]
        return (
            <div className="grid">
                {sizeArray.map((v) => 
                    <div className="row" key={v}>{
                        sizeArray.map((w) => 
                        <div className="box" key={w}>
                            <div className="inner">{array[v * size + w]}</div>
                        </div>)
                    }</div>
                )}
            </div>
        )
    }
}