import { useState, useEffect } from 'react';
import { ProgressBar } from 'react-bootstrap';
import GameResult from './GameResult';
import styles from './TapGame.module.css';
// import ReactSound from 'react-sound';

const TapGame = () => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [isGameActive, setIsGameActive] = useState(false);
  const [showContinuePrompt, setShowContinuePrompt] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [timePlayed, setTimePlayed] = useState(0);
  const [deductCount, setDeductCount] = useState(5); // Initialize deduct count
  const [playCount, setPlayCount] = useState(0); // Initialize play count
  const [timeIncrease, setTimeIncrease] = useState(10); // Initialize time increase (10 seconds)
  const [recentDeduct, setRecentDeduct] = useState(0); // Track recent deduction
  const [recentTimeIncrease, setRecentTimeIncrease] = useState(0); // Track recent time increase
  const [playSound, setPlaySound] = useState(false);

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
    setTimeLeft(10);
    setIsGameActive(true);
    setShowContinuePrompt(false);
    setShowResults(false);
    setTimePlayed(0);
    setDeductCount(5); // Reset deduct count on new game
    setPlayCount(0); // Reset play count on new game
    setRecentDeduct(0); // Reset recent deduction
    setRecentTimeIncrease(0); // Reset recent time increase
  };

  const continueGame = () => {
    if (score >= deductCount) {
      setScore(score - deductCount);
      setTimeLeft((prevTime) => prevTime + timeIncrease);
      setIsGameActive(true);
      setShowContinuePrompt(false);

      // Track recent deduction and time increase
      setRecentDeduct(deductCount);
      setRecentTimeIncrease(timeIncrease);

      // Update deduct count and time increase based on play count
      setPlayCount((prevPlayCount) => {
        const newPlayCount = prevPlayCount + 1;
        let newDeductCount = deductCount;
        let newTimeIncrease = timeIncrease;

        // Increase time and deduction 
        if(newPlayCount <= 2){       //after 2rd 
          newTimeIncrease *= 2;
        }else if (newPlayCount === 3) { //after 3rd
          newTimeIncrease *= 3; 
          newDeductCount *= 3;
        } else if (newPlayCount === 6) { //after  6th continues
          newDeductCount *= 3; 
        }

        console.log("cont-->",newPlayCount);
        console.log("newTimeIncrease-->",newTimeIncrease);
        console.log("newDeductCount-->",newDeductCount);

        setDeductCount(newDeductCount);
        setTimeIncrease(newTimeIncrease);

        return newPlayCount;
      });
    } else {
      alert("Not enough points to continue.");
    }
  };

  const handleTap = () => {
    if (isGameActive) {
      setScore((prevScore) => prevScore + 1);
      setAnimate(true);
      setTimeout(() => setAnimate(false), 500); // Reset animation state after 500ms
    }
  };

  const playSoundEffect = () => {
    setPlaySound(true);
    setTimeout(() => {
      setPlaySound(false);
    }, 1000); 
  };




  const showGameResults = () => {
    setShowResults(true);
  };

  return (
    <div className={styles.container}>

        {/* <ReactSound
          url="/path/to/soundfile.mp3" // Path to your sound file
          playStatus={playSound ? ReactSound.status.PLAYING : ReactSound.status.STOPPED} // Play sound when playSound state is true
          volume={50} // Adjust volume as needed
        /> */}
      <h1 className={styles.title}>Tap Game</h1>
      {!showResults ? (
        <>
          <p className={styles.score}>Score: {score}</p>
          <div className={styles.progressBar}>
            <ProgressBar now={(timeLeft / 70) * 100} label={`${timeLeft}s`} />
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
              <p>Do you want to continue? It will cost {deductCount} points.</p>
              {recentDeduct > 0 && recentTimeIncrease > 0 && (
                <p>
                  Last continue: Deducted {recentDeduct} points, added {recentTimeIncrease } sec.
                </p>
              )}
              <button onClick={continueGame} className={styles.continueButton}>
                Continue
              </button>
              <button onClick={showGameResults} className={styles.startButton}>
                Show Results
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
