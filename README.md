# Unbeatable TicTacToe Game
This is a simple tic-tac-toe game that uses the mini-max algorithm as an AI player against the human player so it never loses.

## Minimax Algorithm
In real life, a human would think of all the possible consequences for each move. This is where the minimax algorithm comes handy.
The algorithm evaluates the moves that lead to a terminal state based on the players’ turn. It will choose the move with maximum score when it is the AI’s turn and choose the move with the minimum score when it is the human player’s turn. Using this strategy, Minimax avoids losing to the human player.


/*
A Minimax algorithm can be best defined as a recursive function that does the following things:

1- return a value if a terminal state is found (+10, 0, -10)
2- go through available spots on the board
3- call the minimax function on each available spot (recursion)
4- evaluate returning values from function calls
5- and return the best value
*/

## Play Here
[Play it on CodePen](https://codepen.io/RakshitDalvi/details/abKWgXW)
