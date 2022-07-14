export type Player = 1 | 2;
export type Board = Player[][];
export type DiagonalStartPositions = [number, number, number, number];

export enum DiagonalSide {
  Left = 'left',
  Right = 'right'
}