import React, { Component } from 'react';
import NewMemo from './components/NewMemo'
import MemoList from './components/MemoList'
import NotificationCheckBox from './components/NotificationCheckBox'

class App extends Component {

  render() {
    return (
      <div className='App'>
        <NewMemo />
        <NotificationCheckBox />
        <MemoList />
      </div>
    );
  }
}

export default App;
