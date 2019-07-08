import React from "react";
import { Statistic, Row, Col } from 'antd';

const Statistics = props => { 
    return (
        <div style={{ borderColor: '#000000', borderWidth: '1px', margin: '40px' }}>
            <Row gutter={16} style={{ marginBottom: '20px' }} >
                <Col span={8}>
                    <Statistic title="Calculation Duration" value={props.timer} />
                </Col>
                <Col span={8}>
                    <Statistic title="Heuristics" value={props.heuristics} />
                </Col>
                <Col span={8}>
                    <Statistic title="Moves" value={props.moves} />
                </Col>
            </Row>
            <Row gutter={16} >
                <Col span={8}>
                    <Statistic title="Time Complexity" value={props.timeComplexity} />
                </Col>
                <Col span={8}>
                    <Statistic title="Space Complexity" value={props.spaceComplexity} />
                </Col>
                <Col span={8}>
                    <Statistic title="???" value={"???"} />
                </Col>
            </Row>
        </div>
    )
}

export default Statistics;