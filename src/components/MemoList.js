import React, { useEffect, useState } from 'react'
import { Button, Item } from 'semantic-ui-react'


import { connect } from 'react-redux'
import { removeMemo } from '../redux/actions'
import { addMemoNotifications } from '../redux/actions'
import { wipeMemoNotifications } from '../redux/actions'

const MemoList = (props) => {

    //memosNotifications is an array of notification objects = { title, startTime, [timerId] } 

    useEffect(() => {
        const memosNotifs = props.memosNotifications
        // Clean old notifications timers
        if (memosNotifs !== undefined && memosNotifs.length !== 0) {
            memosNotifs.forEach(notification => {
                if (notification.timerIds !== undefined) {
                    notification.timerIds.forEach(timer => clearInterval(timer))
                }
            })
        }

        props.wipeMemoNotifications()


        // Adding new
        if (props.memos !== undefined) {
            const memoNotifObjects = []
            props.memos.forEach(memo => {
                const timerIds = setTimeouts(memo.date, memo.title)
                memoNotifObjects.push({
                    title: memo.title,
                    startTime: memo.date,
                    timerIds
                })
            })
            props.addMemoNotifications(memoNotifObjects)
        }
    }, [props.memos])

    const nativeNotification = (body) => {
        if (window.ipcRenderer !== undefined)
            window.ipcRenderer.send('notify', { title: 'Time to repeat', body })
        else
            console.log('window.ipcRenderer is undefined, check your electron-preload.js. Maybe you are running the app in browser?');
    }

    const setTimeouts = (startTime, title) => {
        const timerIds = []
        // const timeouts = [
        //     // 5 * 1000, //test: 5 sec
        //     // 20 * 1000, //test
        //     1000 * 600,             // 10 minutes
        //     1000 * 3600,            // 1 hour
        //     1000 * 3600 * 5,        // 5 hours
        //     1000 * 3600 * 24,       // 1 day
        //     1000 * 3600 * 24 * 5,   // 5 day
        //     1000 * 3600 * 24 * 25,   // 25 day
        //     1000 * 3600 * 24 * 30 * 4,  // 4 month
        // ]
        const timeouts = [
            { time: 1000 * 600, text: '10 min' },
            { time: 1000 * 3600, text: '1 hour' },
            { time: 1000 * 3600 * 5, text: '5 hours' },
            { time: 1000 * 3600 * 24, text: '1 day' },
            { time: 1000 * 3600 * 24 * 5, text: '5 days' },
            { time: 1000 * 3600 * 24 * 25, text: '25 days' },
            { time: 1000 * 3600 * 24 * 30 * 4, text: '4 month' }
        ]

        timeouts.forEach(timer => {
            const futureDate = new Date((startTime.valueOf() + timer.time)).valueOf()
            if (futureDate > new Date().valueOf()) {
                const dateToSetTimeout = futureDate - new Date().valueOf();
                if (dateToSetTimeout < 2147483600) { // timeout cannot be set for more than 2147483647
                    const timerId = setTimeout(
                        () => {
                            nativeNotification(`${title} (${timer.text})`)
                            alert(`Time to repeat: ${title} (${timer.text})`)
                        },
                        dateToSetTimeout
                    );
                    timerIds.push(timerId)
                }
            }
        })
        return timerIds
    }

    const renderItems = () => {
        if (props.memos !== undefined) {
            return props.memos.reverse().map(item => {
                return (
                    <div key={item.title + item.date}>
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
        memos: state.memos,
        memosNotifications: state.memosNotifications
    }
}


export default connect(mapStateToProps, {
    removeMemo,
    addMemoNotifications,
    wipeMemoNotifications
})(MemoList)