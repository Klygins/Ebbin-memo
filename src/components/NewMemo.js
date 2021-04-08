import React, { useState } from 'react';
import { Button, Input } from 'semantic-ui-react'

import { connect } from 'react-redux'
import { addNewMemo } from '../redux/actions'

const NewMemo = (props) => {

    const [memoTitle, setTitle] = useState('');

    const handleCreation = () => {
        if (memoTitle !== '') {
            props.addNewMemo( {title: memoTitle, date: new Date().valueOf() } )
            setTitle('')
        }
    }

    return (
        <div className='new-memo'>
            <Input
                className='add-memo-input'
                placeholder='Add new Memo'
                onChange={(event) => setTitle(event.target.value)}
                value={memoTitle}
                action={
                    <Button
                        color='green'
                        content='Create'
                        onClick={handleCreation}
                    />
                }
            />
        </div>
    );
}

const mapStateToProps = (state) => {
    return { }
}

export default connect( mapStateToProps, { addNewMemo } )(NewMemo)