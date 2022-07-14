import { boardCols, boardRows } from "const";
import { useRecoilState } from "recoil";
import { boardState, gameOverState, playerState } from "state";
import { DiagonalSide, DiagonalStartPositions, Player } from "types";

const testWin = (arr: number[]): boolean => /1{4}|2{4}/.test(arr.join(""));

const getDiagonalStartPositions = (col = 0, row = 0): DiagonalStartPositions => {
  let startColDiagonalBottomLeft = col - row;
  let startColDiagonalBottomRight = col + row;
  let startRowDiagonalBottomLeft = 0;
  let startRowDiagonalBottomRight = 0;

  if (startColDiagonalBottomLeft < 0) {
    // if computed starting column postion is out-of-bounds to the left, then elevate row position to the inverse of computed column (negative to positive), and reset column position to zero (first column)
    startRowDiagonalBottomLeft = Math.abs(startColDiagonalBottomLeft)
    startColDiagonalBottomLeft = 0;
  }

  if (startColDiagonalBottomRight > (boardCols - 1)) {
    // if computed starting column postion is out-of-bounds to the right, then elevate row position to the remaining positive column difference as offset to total configured columns, and reset column position last valid zero-indexed column position
    startRowDiagonalBottomRight = startColDiagonalBottomRight - (boardCols - 1);
    startColDiagonalBottomRight = (boardCols - 1);
  }

  return [startColDiagonalBottomLeft, startRowDiagonalBottomLeft, startColDiagonalBottomRight, startRowDiagonalBottomRight]
}

const getDiagonalPieces = (board: Player[][], side: DiagonalSide, startColPos = 0, startRowPos = 0): number[] => {
  const isDiagonalLeft = side === DiagonalSide.Left;
  const reducerFunctionName = isDiagonalLeft ? 'reduce' : 'reduceRight'; // dynamically decide which reducer function to use at runtime dependent on the diagonal direction of pieces we are validating against

  let colPos = startColPos;
  let rowPos = startRowPos;

  return board[reducerFunctionName]((acc, column, index) => {
    if (index !== colPos) {
      return acc; // ignore current iteration if starting bottom column position is outside of diagonal direction range
    }

    acc.push(column[rowPos] || 0) // add current diagonal piece iteration to resulting array

    isDiagonalLeft ? colPos++ : colPos-- // shift column position towards the right for bottom left diagonal direction validation, otherwise shift towards the left, for the next column iteration
    rowPos++ // shift row position upwards for the next column iteration

    return acc;
  }, [])
}

const usePlayPiece = () => {
  const [board, setBoard] = useRecoilState(boardState);
  const [player, setPlayerTurn] = useRecoilState(playerState);
  const [gameOver, setGameOver] = useRecoilState(gameOverState);

  return (col: number) => {
    // Prevent adding a piece when the game is over
    if (gameOver) {
      return;
    }

    // Prevent adding a piece when the column is full
    if (board[col].length === boardRows) {
      return;
    }

    // Play piece (non mutating)
    const newBoard = board.map((column, i) =>
      i === col ? [...column, player] : column
    );

    const row = newBoard[col].length - 1;

    const [startColDiagonalBottomLeft, startRowDiagonalBottomLeft, startColDiagonalBottomRight, startRowDiagonalBottomRight] = getDiagonalStartPositions(col, row)

    if (
      testWin(newBoard[col]) || // Did win vertically
      testWin(newBoard.map((col) => col[row] || 0)) || // Did win horizontally
      testWin(getDiagonalPieces(newBoard, DiagonalSide.Left, startColDiagonalBottomLeft, startRowDiagonalBottomLeft)) || // Did win diagonally from bottom left
      testWin(getDiagonalPieces(newBoard, DiagonalSide.Right, startColDiagonalBottomRight, startRowDiagonalBottomRight)) // Did win diagonally from bottom right
    ) {
      setGameOver(true);
    } else {
      setPlayerTurn(player === 1 ? 2 : 1);
    }

    setBoard(newBoard);
  };
};

export default usePlayPiece;
