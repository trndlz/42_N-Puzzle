import React from "react";
import { List, Button, Icon } from "antd";

const InputError = (props) => {
    return (
        <div style={{ width: '480px', textAlign: 'center', margin: '0 auto'  }}>
            <h3 style={{ marginBottom: 16 }}>Oh no ! An error occurred ! <span role="img" aria-label="bug">🐛</span></h3>
            <div>
                <img alt="giphy" src={"https://media.giphy.com/media/iIv3U8k5b1A8Sn0hbY/giphy.gif"} />
            </div>
            <h3 style={{ margin: 16 }}>Error list </h3>
            <List 
                bordered
                dataSource={props.errors}
                renderItem={item => (
                    <List.Item>
                        {item}
                    </List.Item>
                )}
            />
            <Button type="primary" href={"/import"} style={{ margin: 16 }}>
                <Icon type="sync"/>Try Again ?
            </Button>
        </div>
    );
}

export default InputError;