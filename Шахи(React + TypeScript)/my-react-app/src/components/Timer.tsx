import React, { FC, useEffect, useRef, useState } from 'react';
import { Player } from '../models/Player';
import { Colors } from '../models/Colors';

interface TimerProps {
    currentPlayer: Player | null;
    restart: () => void;
}

const Timer: FC<TimerProps> = ({ currentPlayer, restart }) => {
    const [blackTime, setBlackTime] = useState(1000);
    const [whiteTime, setWhiteTime] = useState(1000);
    const [gameOver, setGameOver] = useState(false);
    const [winner, setWinner] = useState<Colors | null>(null);
    const timer = useRef<null | ReturnType<typeof setInterval>>(null);

    useEffect(() => {
        if (gameOver) return;
        startTimer();
        return () => {
            if (timer.current) clearInterval(timer.current);
        };
    }, [currentPlayer, gameOver]);

    function startTimer() {
        if (timer.current) {
            clearInterval(timer.current);
        }
        const callback = currentPlayer?.color === Colors.WHITE ? decrementWhiteTimer : decrementBlackTimer;
        timer.current = setInterval(callback, 1000);
    }

    function decrementBlackTimer() {
        setBlackTime(prev => {
            if (prev <= 1) {
                clearInterval(timer.current as ReturnType<typeof setInterval>);
                setGameOver(true);
                setWinner(Colors.WHITE);
                return 0;
            }
            return prev - 1;
        });
    }

    function decrementWhiteTimer() {
        setWhiteTime(prev => {
            if (prev <= 1) {
                clearInterval(timer.current as ReturnType<typeof setInterval>);
                setGameOver(true);
                setWinner(Colors.BLACK); 
                return 0;
            }
            return prev - 1;
        });
    }

    const handleRestart = () => {
        setWhiteTime(1000);
        setBlackTime(1000);
        setGameOver(false);
        setWinner(null);
        restart();
    };

    return (
        <div>
            <div>
                <button onClick={handleRestart}>Restart game</button>
            </div>
            <h2>Black - {blackTime}</h2>
            <h2>White - {whiteTime}</h2>
            {gameOver && <h2>{winner === Colors.BLACK ? 'Black wins!' : 'White wins!'}</h2>}
        </div>
    );
};

export default Timer;
