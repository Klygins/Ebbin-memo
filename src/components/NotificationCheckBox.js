import React, { useState } from 'react'
import { Checkbox, Segment, Modal, Button, Item } from 'semantic-ui-react'
import MemoOnNotification from './MemoOnNotification'

//

const memos = [0]//FROM REDUX

//
const RenderMemos = () => { //RENDER USING REDUX
    return (
        <div>
            <MemoOnNotification title='qwe' date='wqe' />
        </div>
    )
}

const NotificationCheckBox = () => {
    const [open, setOpen] = useState(false)

    const modal = (memos.length != 0) && ( //using redux memos prob will be undefined, so use memos !== undefined

        <Modal
            onClose={() => setOpen(false)}
            open={open}
        >

            <Item.Group divided >
                <div className='memo-list-notification'>
                    <RenderMemos />
                </div>
            </Item.Group>

            <div className='close-modal-button'>
                <Button positive onClick={() => setOpen(false)}>okey</Button>
            </div>

        </Modal>
    )

    return (
        <div className='notification-checkbox'>
            <Segment>
                <Checkbox compact toggle id='12' defaultChecked
                    onChange={() => setOpen(document.getElementById('12').checked)}
                    label={
                        <label>
                            <div className='notification-checkbox-text'>
                                notification
                            </div>
                        </label>
                    }
                />
            </Segment>
            {modal}
        </div >
    )
}

export default NotificationCheckBox