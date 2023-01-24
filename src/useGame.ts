import { useEffect, useState } from "react";
import swal from "sweetalert";


const useGame = () => {

    const defaultGame = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ]
    const defaultLine = {
        display: 'none',
        right: 0,
        top: 0,
        rotate: 0,
    }

    const defaultUser = [
        {
            id: 1,
            tag: "O",
            value: 1,
            wins: 0,
        },
        {
            id: 2,
            tag: "X",
            value: 2,
            wins: 0
        },
    ];


    const [game, setGame] = useState([...defaultGame])

    const [players, setPlayers] = useState([...defaultUser])

    const [round, setRound] = useState(0);

    const [line, setLine] = useState(defaultLine);

    const isEven = (number: number) => number % 2 === 0;

    const handleClick = (hp: number, position: number) => {
        let newGame = [...game];

        if (newGame[hp][position] != 0) {
            return
        };

        newGame[hp][position] = isEven(round) ? players[0].value : players[1].value;
        setRound(round + 1);

        setGame([...newGame])
    };

    const validateGame = () => {
        let n = 3;

        const vertical = () => {
            let hasWinner = true;
            let lastItem = 0;

            for (let i = 0; i < n; i++) {

                hasWinner = true;
                lastItem = game[i][0];

                for (let j = 1; j < n; j++) {
                    if (lastItem != game[i][j]) {
                        hasWinner = false;
                        break;
                    }

                    lastItem = game[i][j]
                }
                // console.log("aqui",game[i])
                if (hasWinner && lastItem != 0) {
                    showLine(200 + -200 * (i), 300, 90)
                    return lastItem
                }
            }

            return 0;
        }

        const horizontal = () => {
            for (let i = 0; i < n; i++) {
                let hasWinner = true;
                let lastItem = game[0][i];

                for (let j = 1; j < n; j++) {
                    if (lastItem != game[j][i]) {
                        hasWinner = false;
                        break;
                    }

                    lastItem = game[j][i]
                }

                if (hasWinner && lastItem != 0) {
                    showLine(0, 200 * (i) + 100, 0)
                    return lastItem
                }
            }

            return 0;
        };

        const diagonal = () => {
            let hasWinner = true;
            let lastItem = game[0][0];

            for (let i = 1; i < n; i++) {
                if (lastItem != game[i][i]) {
                    hasWinner = false;
                    break;
                }
            };

            if (hasWinner && lastItem != 0) {
                showLine(0, 0, 225)
                return lastItem;
            }

            hasWinner = true;
            lastItem = game[0][n - 1];
            for (let i = 1; i < n; i++) {

                if (lastItem != game[i][n - i - 1]) {
                    hasWinner = false;
                    break;
                }

                lastItem = game[i][n - i - 1];
            }

            if (hasWinner && lastItem != 0) {
                showLine(0, 0, 135)
                return lastItem
            };

            return 0;
        }

        const results = {
            vertical: vertical(),
            horizontal: horizontal(),
            diagonal: diagonal()
        }

        for (let key in results) {
            if (results[key] != 0) {
                return results[key]
            }
        }

        return 0
    }

    const checkEndGame = () => {
        // Horizontal 
        let temZero = false;
        game.forEach(horizontal => {
            if (horizontal.findIndex(value => value == 0) != -1) {
                temZero = true;
            }
        });

        // let oneArray = 

        if (!temZero) {
            resetGame();
        };

    }

    const showLine = (x:number, y:number, rotate:number) => {
        setLine({
            display: 'block',
            right: x,
            top: y,
            rotate,
        })
    };

    const resetGame = () => {
        setLine(defaultLine)
        setRound(0)
        setGame([...defaultGame]);
    };

    useEffect(() => {
        if (round == 0) {
            return
        };

        let winner = validateGame();

        if (winner) {
            setTimeout(() => winMessage(winner), 400)
        }

        checkEndGame();

    }, [game]);

    const winMessage = (winner: number) => {
        const winnerPlayer = players.find(({ value }) => value == winner);

        swal({
            title: `Player ${winnerPlayer?.tag} won!`,
            icon: "sucess",
        }).then(() => {

            const newPlayers = players.map(player => {
                if (player.id == winnerPlayer?.id) {
                    player.wins += 1;
                };

                return player;

            });

            setPlayers([...newPlayers])
            resetGame()
        });

    }

    return {
        game,
        line,
        players,
        handleClick
    }
};

export default useGame;