import React from 'react';
import './App.css';

function App() {
  return (
    <div className='App'>
      <section><p>競走馬リスト</p></section>
      <div className='formArea'>
        <form>
          <input type="text" className='umaName'/>
          <input type="submit" value="+" className='umaButton'/>
        </form>
      </div>
      <div className='IncompleteArea'>
      <ul>
        <p className='title'>まだ撮ってない馬</p>
        <li><p>イクイノックス</p>
        <button>完了</button>
        <button>削除</button></li>
      </ul>
      </div>
      <div className='CompleteArea'>
      <ul>
      <p className='title'>もう撮った馬</p>
        <li><p>リバティアイランド</p>
        <button>戻す</button></li>
      </ul>
      </div>
    </div>
  )
}

export default App;
