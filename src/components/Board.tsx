import { Circle, Flex } from "@chakra-ui/react";
import { boardRows, playerColor } from "const";
import { usePlayPiece } from "hooks";
import { FC } from "react";
import { useRecoilValue } from "recoil";
import { boardState, gameOverState, playerState } from "state";
import { Player } from "types";

const padCol = (col: number[]): number[] =>
  col.join("").padEnd(boardRows, "0").split("").map(Number);

const Board: FC = () => {
  const play = usePlayPiece();
  const board = useRecoilValue(boardState);
  const player = useRecoilValue(playerState);
  const gameOver = useRecoilValue(gameOverState);

  const defaultCircleText = 'game board circle';

  const colourNameMap: Record<string, string> = {
    '#f10000': 'red',
    '#ece100': 'yellow',
  }

  return (
    <Flex justify="center" aria-label="game board">
      {board.map((col, i) => (
        <Flex
        aria-label="game board column"
          key={i}
          role="group"
          onClick={() => play(i)}
          flexDirection="column-reverse"
          cursor={gameOver ? "auto" : "pointer"}
        >
          {padCol(col).map((p, j) => (
            <Circle
              aria-label={playerColor[p as Player] ? `${defaultCircleText} ${colourNameMap[playerColor[p as Player]]}` : `${defaultCircleText} grey`}
              m={1}
              size="40px"
              key={`${i}-${j}`}
              boxShadow="inner"
              bg={playerColor[p as Player] || "gray.300"}
            />
          ))}
          <Circle
            m={1}
            size="40px"
            boxShadow="base"
            visibility="hidden"
            bg={playerColor[player]}
            _groupHover={{
              visibility: gameOver ? "hidden" : "visible",
            }}
          />
        </Flex>
      ))}
    </Flex>
  );
};

export default Board;
