import { ChakraProvider, Container, VStack } from "@chakra-ui/react";
import Board from "components/Board";
import GameControls from "components/GameControls";
import GameProgress from "components/GameProgress";
import { FC } from "react";
import { RecoilRoot } from "recoil";
import { initState } from 'utils'

const App: FC = () => (
  <ChakraProvider>
    <RecoilRoot initializeState={initState}>
      <Container py={4} as={VStack}>
        <Board />
        <GameProgress />
        <GameControls />
      </Container>
    </RecoilRoot>
  </ChakraProvider>
);

export default App;
