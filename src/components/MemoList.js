import React from 'react'
import { Button, Item } from 'semantic-ui-react'


import { connect } from 'react-redux'
import { removeMemo } from '../redux/actions'

const MemoList = (props) => {

    const renderItems = () => {
        if (props.memos !== undefined) {
            return props.memos.reverse().map(item => {
                return (
                    <div key={item.title}>
                        <Item>
                            <Item.Content>
                                <Item.Header as='a'>{item.title}</Item.Header>
                                <Button
                                    inverted
                                    size='small'
                                    color='red'
                                    floated='right'
                                    icon='delete'
                                    onClick={() => props.removeMemo(item.title)}
                                />
                                <Item.Meta>
                                    <span>
                                        {new Date(item.date).toLocaleString()}
                                    </span>
                                </Item.Meta>
                            </Item.Content>
                        </Item>
                        <br />
                    </div>
                );
            })
        } else {
            return (
                <div>
                    <Item>
                        <Item.Content>
                            <Item.Header as='a'>Example Memo</Item.Header>
                            <Button inverted size='mini' color='red' floated='right' icon='delete' />
                            <Item.Meta>
                                <span>{new Date().toLocaleString()}</span>
                            </Item.Meta>
                        </Item.Content>
                    </Item>
                </div>
            )
        }
    }

    return (
        <div>
            <Item.Group divided >
                <div className='memo-list'>
                    {renderItems()}
                </div>
            </Item.Group>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        memos: state.memos
    }
}


export default connect(mapStateToProps, { removeMemo })(MemoList)