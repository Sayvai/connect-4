import { Button } from "@chakra-ui/react";
import { FC } from "react";
import { useRecoilCallback, useRecoilValue, useResetRecoilState } from "recoil";
import { boardState, gameOverState, playerState } from "state";
import { processSnapshot } from "utils";

const GameControls: FC = () => {
  const board = useRecoilValue(boardState);
  const resetBoard = useResetRecoilState(boardState);
  const resetPlayer = useResetRecoilState(playerState);
  const resetGameOver = useResetRecoilState(gameOverState);

  const saveState = useRecoilCallback(({ snapshot }) => () => {
    processSnapshot(snapshot);
  })

  const handleReset = () => {
    resetBoard();
    resetPlayer();
    resetGameOver();

    saveState() // persist reset state to local storage
  };

  return (
    <Button onClick={handleReset} isDisabled={!board.some((col) => col.length)} aria-label="Reset">
      Reset
    </Button>
  );
};

export default GameControls;
