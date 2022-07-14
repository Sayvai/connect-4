import { Heading } from "@chakra-ui/react";
import { playerName } from "const";
import { FC } from "react";
import { useRecoilValue } from "recoil";
import { gameOverState, playerState } from "state";

const GameProgress: FC = () => {
  const player = useRecoilValue(playerState);
  const gameOver = useRecoilValue(gameOverState);
  const name = playerName[player];

  const text = gameOver ? `${name} wins!` : `${name}'s turn`;

  return (
    <Heading as="h3" size="lg" aria-label={text}>
      {text}
    </Heading>
  );
};

export default GameProgress;
