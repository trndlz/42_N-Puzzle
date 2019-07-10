import React, { useState } from "react";
import { Input, Typography, Radio, Icon, Button, Alert } from 'antd';
import NPuzzle from "./NPuzzle";
import { HeuristicsDesc, searchAlgoDesc } from "./Text";

const { Title } = Typography;
const { TextArea } = Input;

const Import = () => {

    const [rawPuzzle, setRawPuzzle] = useState();
    const [heuristics, setHeuristics] = useState("MANHATTAN");
    const [searchAlgo, setSearchAlgo] = useState("A_STAR");
    const [aStarWeight, setAStarWeight] = useState(1);
    const [isReady, setIsReady] = useState(false);
    const [isPuzzleEmpty, setIsPuzzleEmpty] = useState(false);

    const changeHeuristics = e => {
        setHeuristics(e.target.value);
    }

    const changeRawPuzzle = e => {
        setRawPuzzle(e.target.value);
    }

    const changeAStarWeight = e => {
        setAStarWeight(e.target.value);
    }

    const changeSearchAlgo = e => {
        setSearchAlgo(e.target.value);
    }

    const formValidation = () => {
        if (rawPuzzle) {
            setIsReady(true);
        } else {
            setIsPuzzleEmpty(true);
        }
    }

    if (isReady) {
        return <NPuzzle rawPuzzle={rawPuzzle} heuristics={heuristics} searchAlgo={searchAlgo} aStarWeight={aStarWeight} />;
    } else {
        return (
            <div>
                {isPuzzleEmpty ? <Alert type="error" message="Puzzle input is empty 😥" /> : ''}
                <Title level={2} style={{ margin: '20px' }}>Give us your favourite puzzle</Title>
                <TextArea
                    rows={6}
                    style={{ fontFamily: 'monospace', maxWidth: '400px' }}
                    placeholder={"Paste here your Puzzle !\nExample:\n8 6 1\n7 2 0\n5 4 3\n"}
                    onChange={changeRawPuzzle}
                />
                <Title level={2} style={{ margin: '20px' }}>Tree Search Algorithm</Title>
                <Radio.Group onChange={changeSearchAlgo} defaultValue="A_STAR">
                    <Radio.Button value="A_STAR">{searchAlgoDesc.A_STAR}</Radio.Button>
                    <Radio.Button value="WEIGHED_A_STAR">{searchAlgoDesc.WEIGHED_A_STAR}</Radio.Button>
                    <Radio.Button value="GREEDY">{searchAlgoDesc.GREEDY}</Radio.Button>
                </Radio.Group>
                {(searchAlgo === "WEIGHED_A_STAR") && (
                    <div>
                        <Title level={2} style={{ margin: '20px' }}>Set Weight</Title>
                        <Radio.Group onChange={changeAStarWeight} defaultValue="1">
                            <Radio.Button value="1">1</Radio.Button>
                            <Radio.Button value="2">2</Radio.Button>
                            <Radio.Button value="3">3</Radio.Button>
                            <Radio.Button value="4">4</Radio.Button>
                            <Radio.Button value="5">5</Radio.Button>
                        </Radio.Group>
                    </div>
                )}
                <Title level={2} style={{ margin: '20px' }}>Heuristics</Title>
                <Radio.Group onChange={changeHeuristics} defaultValue="MANHATTAN">
                    <Radio.Button value="MANHATTAN">{HeuristicsDesc.MANHATTAN}</Radio.Button>
                    <Radio.Button value="HAMMING">{HeuristicsDesc.HAMMING}</Radio.Button>
                    <Radio.Button value="MIXED_LINEAR_CONFLICT_MANHATTAN">{HeuristicsDesc.MIXED_LINEAR_CONFLICT_MANHATTAN}</Radio.Button>
                </Radio.Group>
                <Button type="primary" onClick={formValidation} style={{ margin: '20px' }}>
                    <Icon type="fire" />Submit
                </Button>
            </div>
        )
    }
}

export default Import;