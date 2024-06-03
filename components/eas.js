import { useState, useEffect } from 'react';
import { ProgressBar } from 'react-bootstrap';
import GameResult from './GameResult';
import styles from './TapGame.module.css';

const TapGame = () => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(5);
  const [isGameActive, setIsGameActive] = useState(false);
  const [showContinuePrompt, setShowContinuePrompt] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [timePlayed, setTimePlayed] = useState(0);
  const [playcount, setPlaycount] = useState(0);
  const [deductcount, setDeductcount] = useState(0);
  const [timeincrease, setTimeincrease] = useState(0);
  

  useEffect(() => {
    let timer;
    if (isGameActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
        setTimePlayed((prevTime) => prevTime + 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsGameActive(false);
      setShowContinuePrompt(true);
    }

    return () => clearInterval(timer);
  }, [isGameActive, timeLeft]);

  const startGame = () => {
    setScore(0);
    setTimeLeft(5);
    setIsGameActive(true);
    setShowContinuePrompt(false);
    setShowResults(false);
    setTimePlayed(0);
  };

  const continueGame = () => {

    if (score >= 10) {
      setScore(score - deductcount); 
      setTimeLeft((prevTime) => prevTime + timeincrease); 
      if(playcount == 0 ){
        setDeductcount(5);
        setPlaycount(1);
        setTimeincrease(5);
      }else if(playcount > 0){
        setDeductcount((prevdeductcount)  => prevdeductcount  + 5);
        setTimeincrease((prevtimeincrease)=> prevtimeincrease + 5);

      }  
      setIsGameActive(true);
      setShowContinuePrompt(false);
    } else {
      alert("Not enough points to continue.");
    }
    
  
   
  };

  const handleTap = () => {
    if (isGameActive) {
      setScore((prevScore) => prevScore + 1);
      setAnimate(true);
      setTimeout(() => setAnimate(false), 500);  // Reset animation state after 500ms
    }
  };

  const showGameResults = () => {
    setShowResults(true);
  }



  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Tap Game</h1>
      {!showResults ? (
        <>
          <p className={styles.score}>Score: {score}</p>
          <p className={styles.score}>Time Left: {timeLeft}</p>
          <div className={styles.progressBar}>
            <ProgressBar now={(timeLeft / 10) * 100} label={`${timeLeft}s`} />
          </div>
          {!isGameActive && !showContinuePrompt && (
            <button onClick={startGame} className={`${styles.startButton}`}>
              Start Game
            </button>
          )}
          {isGameActive && (
            <button onClick={handleTap} className={`${styles.tapButton} ${animate ? styles.tapButtonActive : ''}`}>
              Tap!
            </button>
          )}
          {showContinuePrompt && (
            <div className={styles.prompt}>
              <p>Do you want to continue? It will cost {deductcount} points.</p>
              <button onClick={continueGame} className={styles.continueButton}>
                Continue
              </button>
              <button onClick={showGameResults} className={styles.tapButton}>
                Result
              </button>
            </div>
          )}
        </>
      ) : (
        <GameResult score={score} timePlayed={timePlayed} onRestart={startGame} />
      )}
    </div>
  );
};

export default TapGame;
