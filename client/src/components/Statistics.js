import React from "react";
import { Statistic, Row, Col } from 'antd';
import { HeuristicsDesc, searchAlgoDesc } from "./Text";


const Statistics = props => {
    return (
        <div style={{ borderColor: '#000000', borderWidth: '1px', margin: '40px' }}>
            <Row gutter={16} style={{ marginBottom: '20px' }} >
                <Col span={8}>
                    <Statistic title="Moves" value={props.moves} />
                </Col>
                <Col span={8}>
                    <Statistic title="Time Complexity" value={props.timeComplexity} />
                </Col>
                <Col span={8}>
                    <Statistic title="Size Complexity" value={props.sizeComplexity} />
                </Col>
            </Row>
            <Row gutter={16} >
                <Col span={8}>
                    <Statistic title="Calculation Duration" value={props.timer} />
                </Col>
                <Col span={8}>
                    <Statistic title="Heuristics" value={HeuristicsDesc[props.heuristics]} valueStyle={{ fontSize: "1.2em"}} />
                </Col>
                <Col span={8}>
                    <Statistic title="Search Algo" value={searchAlgoDesc[props.searchAlgo]} />
                </Col>
            </Row>
        </div>
    )
}

export default Statistics;