import React from 'react'
import Square from './Square'

function Board(props) {

  const renderSquare=(i)=>{
    return (
      <Square 
        val={props.squares[i]}
        // 1マスに入れるXかOを表示する。
        onClick={()=>props.onClick(i)}
        // クリックした時の動作を格納する。
      />
    );
  }

  return (
    <>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </>
  )
}

export default Board
