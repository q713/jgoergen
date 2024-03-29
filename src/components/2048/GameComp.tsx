import {Component} from "react";
import {Game} from "../../domain/2048/Game";
import {BoardComp} from "./BoardComp";
import {GameState, KeyBoardEventCodes, MoveDirection} from "../../domain/Constants";
import {Board} from "../../domain/2048/Board";
import {GameEnded} from "./GameEnded";
import {NavLink} from "react-router-dom";

type GameProps = {
    humanPlayer: boolean
};

type GameCompState = {
    game: Game,
    board: Board,
    points: number,
    gameState: GameState,
    bestScore: number,
    reachedWin: boolean,
    humanPlayer: boolean
};

export class GameComp extends Component<GameProps, GameCompState> {

    constructor(props: GameProps) {
        super(props);
        let g = props.humanPlayer ? Game.createHumanGame() : Game.createAiGame();
        g.initGame();
        this.state = {
            game: g,
            board: g.board,
            points: g.points,
            gameState: GameState.GAME_READY,
            bestScore: 0,
            reachedWin: false,
            humanPlayer: props.humanPlayer
        }
    }

    private switchPlayers() {
        let newPlayer = !this.state.humanPlayer;
        let g = newPlayer ? Game.createHumanGame() : Game.createAiGame();
        g.initGame();
        this.updateState(g, newPlayer);
    }

    private closeGameOver() {
        this.setState({
            ...this.state,
            gameState: GameState.GAME_STOPPED
        })
    }

    private closeGameWon() {
        this.setState({
            ...this.state,
            gameState: GameState.GAME_RUNNING
        });
    }

    private startNewGame() {
        let g = this.state.game.humanPlayer ? Game.createHumanGame() : Game.createAiGame();
        g.initGame();
        this.updateState(g, this.state.game.humanPlayer);
    }

    private updateState(g: Game, hP: boolean) {
        let p = g.points;
        let b = g.board;
        let isGameOver = g.isGameOver();
        let isGameWon = g.isGameWon();
        let reached = this.state.reachedWin;

        let state: GameState | undefined = undefined;
        if (isGameOver) {
            state = GameState.GAME_OVER;
        } else if (isGameWon && !reached) {
            state = GameState.GAME_WON;
            reached = true;
        } else {
            state = GameState.GAME_RUNNING;
        }

        let best = this.state.bestScore < p ? p : this.state.bestScore;

        this.setState({
            game: g,
            board: b,
            points: p,
            gameState: state,
            bestScore: best,
            reachedWin: reached,
            humanPlayer: hP
        });
    }

    private handleKeyPress(event: KeyboardEvent) {
        event.preventDefault();

        if (this.state.gameState === GameState.GAME_STOPPED || this.state.gameState === GameState.GAME_OVER)
            return;

        let direction: MoveDirection | undefined = undefined;
        switch (event.code) {
            case KeyBoardEventCodes.KEY_ARROW_DOWN:
            case KeyBoardEventCodes.KEY_S:
                direction = MoveDirection.DOWN;
                break;
            case KeyBoardEventCodes.KEY_ARROW_UP:
            case KeyBoardEventCodes.KEY_W:
                direction = MoveDirection.UP;
                break;
            case KeyBoardEventCodes.KEY_ARROW_RIGHT:
            case KeyBoardEventCodes.KEY_D:
                direction = MoveDirection.RIGHT;
                break;
            case KeyBoardEventCodes.KEY_ARROW_LEFT:
            case KeyBoardEventCodes.KEY_A:
                direction = MoveDirection.LEFT;
                break;
            default:
                return;
        }
        let performable = this.state.game.performMove(direction!);
        if (performable) {
            this.updateState(this.state.game, this.state.game.humanPlayer);
        }
    }

    private shouldPerformAiMove(): boolean {
        return (this.state.gameState === GameState.GAME_READY || this.state.gameState === GameState.GAME_RUNNING) && !this.state.game.humanPlayer;
    }

    private makeAIMove() {
        try {
            this.state.game.performAiMove().then(performable => {
                if (performable)
                    this.updateState(this.state.game, this.state.game.humanPlayer);
            });
        } catch (e) {
           this.updateState(this.state.game, this.state.game.humanPlayer);
        }
    }

    componentDidMount() {
        if (this.state.gameState === GameState.GAME_READY && this.state.game.humanPlayer) {
            window.addEventListener("keydown", this.handleKeyPress.bind(this));
        }

        if (this.shouldPerformAiMove() && this.state.gameState === GameState.GAME_READY) {
            this.makeAIMove();
        }
    }

    componentDidUpdate(prevProps: Readonly<GameProps>, prevState: Readonly<GameCompState>, snapshot?: any) {
        if (this.shouldPerformAiMove()) {
            this.makeAIMove();
        }
    }

    componentWillUnmount() {
        if (this.state.game.humanPlayer) {
            window.removeEventListener("keydown", this.handleKeyPress.bind(this));
        }
    }

    render() {
        return <div className="max-w-lg mx-auto mt-20 px-8 flex flex-col min-h-screen">
            <div className="flex py-8">
                <div className="px-2 py-2 font-bold text-4xl rounded-lg">
                    2048
                </div>
            </div>


            <div className="flex mb-4">
                <div className="ml-4 relative rounded-lg text-center">
                    <div className="text-xs font-bold uppercase">Best</div>
                    <div className="font-bold">{this.state.bestScore}</div>
                </div>

                <div
                    className="ml-auto mr-4 relative px-3 py-1 rounded-lg text-center">
                    <div className="text-xs font-bold uppercase">Points</div>
                    <div className="font-bold">{this.state.points}</div>
                </div>
            </div>

            <div className="p-4 rounded-lg mb-4 text-xl relative overflow-hidden ">
                <BoardComp board={this.state.game.board}/>
            </div>

            <div className="flex mb-4 pt-4">
                <NavLink to="/" className="text-xs font-bold uppercase rounded-lg bg-stone-900 text-white px-5 py-2.5
                    hover:bg-stone-800 ml-4">
                    Back
                </NavLink>
                <button className="text-xs font-bold uppercase rounded-lg bg-stone-900 text-white px-5 py-2.5
                    hover:bg-stone-800 ml-4" onClick={this.switchPlayers.bind(this)}>
                    {this.state.humanPlayer ? "Switch to Ai" : "Switch to Human"}
                </button>
                <button className="text-xs font-bold uppercase rounded-lg bg-stone-900 text-white ml-auto
                    px-5 py-2.5 mr-4 hover:bg-stone-800" onClick={this.startNewGame.bind(this)}>
                    Restart
                </button>
            </div>

            <div className="flex mb-4 pt-4">
                <p className="text-stone-400 ml-auto mr-4 py-2.5"> Based on 2048 by <a className="font-bold" href="http://gabrielecirulli.github.io/2048">Gabriele Cirulli</a>.</p>
            </div>

            <GameEnded gameState={this.state.gameState} points={this.state.points} closeModal={
                this.state.gameState === GameState.GAME_OVER ? this.closeGameOver.bind(this)
                    : this.closeGameWon.bind(this)}/>
        </div>
    }
}