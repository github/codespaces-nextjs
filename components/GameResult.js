import React from 'react';
import styles from './GameResult.module.css';

const GameResult = ({ score, timePlayed, onRestart }) => {
  return (
    <div className={styles.resultsContainer}>
      <h2 className={styles.resultsTitle}>Game Results</h2>
      <p className={styles.resultsText}>Final Score: {score}</p>
      <p className={styles.resultsText}>Time Played: {timePlayed} seconds</p>
      <button onClick={onRestart} className={styles.restartButton}>
        Start New Game
      </button>
    </div>
  );
};

export default GameResult;
