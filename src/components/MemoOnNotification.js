import React from 'react'
import { Item, Button } from "semantic-ui-react";

const MemoOnNotification = (props) => {
    return (
        <div className='memo-notification'>
            <Item>
                <Item.Content>
                    <Item.Header as='a'>{props.title}</Item.Header>
                    <div style={{marginTop:'1vh'}}></div>
                    <Item.Meta>
                        <span>
                            {new Date(props.date).toLocaleString()}
                        </span>
                    </Item.Meta>
                </Item.Content>
            </Item>
        </div>
    )
}

export default MemoOnNotification