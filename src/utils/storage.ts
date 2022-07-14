import { MutableSnapshot, Snapshot } from "recoil"
import { boardState, playerState } from "state"

export async function processSnapshot(snapshot: Snapshot) {
  // grab recoil state data
  const persistedBoardState = await snapshot.getPromise(boardState);
  const persistedCurrentPlayerState = await snapshot.getPromise(playerState);

  // persist data to local storage
  localStorage.setItem(
    "game_storage",
    JSON.stringify({
      board: persistedBoardState,
      currentPlayer: persistedCurrentPlayerState,
    })
  );
}

export function initState(snapshot: MutableSnapshot) {
  const data = localStorage.getItem("game_storage");

  if (!data) return;

  // obtain persisted data from local storage
  const {
    board: persistedBoardState,
    currentPlayer: persistedCurrentPlayerState,
  } = JSON.parse(data)

  // apply persisted data to the existing recoil state definition model
  snapshot.set(boardState, persistedBoardState)
  snapshot.set(playerState, persistedCurrentPlayerState)
}
