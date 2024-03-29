import {Board} from "./Board";
import {MoveDirection} from "../Constants";
import {ISolver, ExpectimaxSolver} from "./Solver";
import {delaySeconds} from "../../util/util";

export class Game {
    private readonly _width: number;
    private readonly _chanceTwo: number;
    private readonly _humanPlayer: boolean;
    private readonly _board: Board;
    private _points: number;
    private readonly _solver: ISolver | undefined;
    private readonly _delayInSeconds: number | undefined;

    private constructor(width: number, chanceTwo: number, humanPlayer: boolean, board: Board, solver?: ISolver, delayInSeconds?: number) {
        this._width = width;
        this._humanPlayer = humanPlayer;
        this._chanceTwo = chanceTwo;
        this._points = 0;
        this._board = board;
        this._solver = solver;
        this._delayInSeconds = delayInSeconds;
    }

    public static createHumanGame(): Game {
        let width = 4;
        let chanceTwo = 0.9;
        let board = Board.createBoard(width, chanceTwo);
        return new Game(width, chanceTwo, true, board, undefined);
    }

    public static createAiGame(): Game {
        let width = 4;
        let chanceTwo = 0.9;
        let board = Board.createBoard(width, chanceTwo);
        let maxSearchDepth = 5;
        let solver = new ExpectimaxSolver(maxSearchDepth);
        let delayInSeconds = 0.005;
        return new Game(4, chanceTwo, false, board, solver, delayInSeconds);
    }

    get points(): number {
        return this._points;
    }

    get board(): Board {
        return this._board;
    }

    get humanPlayer(): boolean {
        return this._humanPlayer;
    }

    public initGame() {
        this._board.initRandom();
    }

    public isGameWon(): boolean {
        let val = this._board.largestPieceValue();
        return val >= 2048;
    }

    public isGameOver(): boolean {
        return !this._board.isMovePossible();
    }

    public performMove(moveDirection: MoveDirection): boolean {
        if (!this._board.isMovePossible())
            return false;

        let performPointsPair = this._board.move(moveDirection);
        if (performPointsPair[0]) {
            this._points += performPointsPair[1];
            this._board.addRandomPiece();
        }

        return true
    }

    public async performAiMove(): Promise<boolean> {
        if (this._humanPlayer || this._solver === undefined || this._delayInSeconds === undefined)
            throw Error("mode human player is set or solver is null or the delay is undefined, please use user input");

        let nextDirection = this._solver.getNextMove(this._board);

        await delaySeconds(this._delayInSeconds);
        return this.performMove(nextDirection);
    }

    public copy(): Game {
        return new Game(this._width, this._chanceTwo, this._humanPlayer, this._board, this._solver);
    }
}
