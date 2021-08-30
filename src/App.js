import React, { useState } from "react";
import "./App.css";
import Board from "./components/Board";
import { calculateWinner } from "./conditions/win";

function App() {
	const [state, setState] = useState({
		history: [
			{
				squares: Array(9).fill(null),
				// 9つの配列があって、全部にnullを格納してる。
			},
		],
		stepNumber: 0,
		xIsNext: true,
	});

	const handleClick = (i) => {
		const history = state.history.slice(0, state.stepNumber + 1);
		// １回１回の盤の状況を記録した配列
		// 0から、stepNumberのプラス１まで。
		const current = history[history.length - 1];
		// 最新の盤の状況から一つ戻った盤の状況を切り出したもの
		const squares = current.squares.slice();
		// 一つ戻った盤の状況をの配列を新しく配列に格納したもの
		if (calculateWinner(squares) || squares[i]) {
			// もし、関数がtrueslyな値で返却されるか、引数の番手のsquaresを選択した場合
			return;
		}
		squares[i] = state.xIsNext ? "X" : "O";
		setState({
			history: history.concat([
				{
					squares: squares,
					//
				},
			]),
			stepNumber: history.length,
			xIsNext: !state.xIsNext,
		});
	};

	const jumpTo = (step) => {
		setState({
			stepNumber: step,
			xIsNext: step % 2 === 0,
		});
		debugger;
	};

	const history = state.history;
	const current = history[state.stepNumber];
	const winner = calculateWinner(current.squares);
	// もし、同じ人だった場合は、winnerに格納される。
	// いない場合はnullになる。

	const moves = history.map((step, move) => {
		const desc = move ? "Goto move #" + move : "Goto game start";
		// moveが０（一番初めから）なら、falseの値になるから右辺を取れる。
		// moveがtrueなら、左辺。falseなら右辺を格納する。
		return (
			<li key={move}>
				<button onClick={() => jumpTo(move)}>{desc}</button>
			</li>
		);
	});

	let status;
	if (winner) {
		status = "Winner: " + winner;
	} else {
		status = "Next player: " + (state.xIsNext ? "X" : "O");
	}

	return (
		<div className="game">
			<div className="game-board">
				<Board squares={current.squares} onClick={(i) => handleClick(i)} />
			</div>
			<div className="game-info">
				<div>{status}</div>
				<ol>{moves}</ol>
			</div>
		</div>
	);
}

export default App;
