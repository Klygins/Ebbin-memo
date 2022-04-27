import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
    Button,
    Input
} from 'semantic-ui-react'
import { Button as MUIButton } from '@mui/material'

import icon from '../../assets/tray@2x.png'
import { Link } from "react-router-dom";
import config from "../../config";
import { addNewMemo } from "../../db/api";


const HeaderWrapper = styled.div`
    display: flex;
    align-items: center;
    position: fixed;
    top: 0;
    height: fit-content;
    width: 100%;
    padding-top: 12px;
    padding-bottom: 12px;
    padding-left: 30px;
    background-color: white;
    z-index: 100;
`
const Img = styled.img`
    height: 38px; //input height
    width: 38px; //input height
    margin-right: 20px;
`
const Buttons = styled.div`
    text-align: right;
    flex-grow: 1;
    margin-right: 40px;
`

const Header = () => {
    const [onloadStyle, setStyle] = useState({})
    const [memoText, setMemoText] = useState('')

    useEffect(() => {
        setStyle({ height: document.getElementById('header').offsetHeight })
    }, [])

    function addMemo() {
        console.time('add memo')
        addNewMemo(memoText, (err, res) => {
            console.log(err, res);
            console.timeEnd('add memo')
        }, undefined, ['tag1', 'tag2'], 'my memos')
    }

    return (
        <>
            <HeaderWrapper id="header">
                <Link to={config.pages.home}>
                    <Img src={icon} />
                </Link>
                <Input
                    placeholder={'Der Abend - evening'}
                    value={memoText}
                    onChange={(e) => setMemoText(e.target.value)}
                    action={
                        <Button onClick={addMemo}
                            color='green'>Add memo</Button>
                    } />
                <div style={{ flexGrow: '4' }} />
                <Buttons>
                    <Button.Group>
                        <Link to={config.pages.memoList}>
                            <Button color='yellow'>New Memo</Button>
                        </Link>
                        <Button.Or text='/' />
                        <Link to={config.pages.newMemo}>
                            <Button color='yellow'>Memo List</Button>
                        </Link>
                    </Button.Group>
                </Buttons>
            </HeaderWrapper>
            <div style={onloadStyle}></div>
        </>
    )
}

export default Header