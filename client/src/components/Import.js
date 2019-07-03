import React, { useState } from "react";
import { Input, Typography, Radio, Switch, Icon, Button, Alert  } from 'antd';

const { Title } = Typography;
const { TextArea } = Input;



const Import = () => {

    const [rawPuzzle, setRawPuzzle] = useState();
    const [heuristics, setHeuristics] = useState("Manhattan");
    const [greedy, setGreedy] = useState(false);
    const [isReady, setIsReady] = useState(false);
    const [isPuzzleEmpty, setIsPuzzleEmpty] = useState(false);

    const changeHeuristics = e => {
        setHeuristics(e.target.value);
    }

    const changeRawPuzzle = e => {
        setRawPuzzle(e.target.value);
    }

    const changeGreedy = checked => {
        setGreedy(checked);
    }

    const formValidation = () => {
        if (rawPuzzle) {
            console.log("OUI")
        } else {
            setIsPuzzleEmpty(true);
        }
    }

    return (
        <div>
            {isPuzzleEmpty ? <Alert type="error" message="Puzzle input is empty 😥" /> : ''}
            <Title level={2} style={{ margin: '20px' }}>Define your puzzle</Title>
            <TextArea
                rows={6}
                style={{ fontFamily: 'monospace', maxWidth: '400px' }}
                placeholder={"Paste here your Puzzle !\nExample:\n8 6 1\n7 2 0\n5 4 3\n"}
                onChange={changeRawPuzzle}
            />
            <Title level={2} style={{ margin: '20px' }}>Parameters</Title>
            <Radio.Group onChange={changeHeuristics} defaultValue="manhattan">
                <Radio.Button value="manhattan">Manhattan</Radio.Button>
                <Radio.Button value="x">Another ?</Radio.Button>
                <Radio.Button value="xx">Another one ?</Radio.Button>
            </Radio.Group>
            <div style={{ margin: '20px' }}>
                <Switch defaultChecked onChange={changeGreedy} /> Greedy search
            </div>
            <Button type="primary" onClick={formValidation}>
                <Icon type="fire" />Submit
          </Button>
        </div>
    )
}

export default Import;