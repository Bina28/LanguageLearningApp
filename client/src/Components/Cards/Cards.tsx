import { useState } from "react";
import { useCards } from "../../lib/hooks/useCards";
import { useUserProgressUpdate } from "../../lib/hooks/useUserProgressUpdate";
import { Link, useParams } from "react-router-dom";
import { useAccount } from "../../lib/hooks/useAccount";
import "./Cards.css";

export default function Card() {
  const { courseId } = useParams();
  const { cards, isLoadingCards } = useCards(courseId);
  const [index, setIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [countCorrectAnswers, setCountCorrectAnswers] = useState(0);
  const { updateProgress } = useUserProgressUpdate();
  const { currentUser } = useAccount();
  const [isFinished, setIsFinished] = useState(false);
  const userId = currentUser?.id;
  const [feedback, setFeedback] = useState<string | null>(null);

  if (!cards || cards.length === 0) return <p>No cards available</p>;

  if (isLoadingCards) return <p>Is loading a flashcard...</p>;

  const correct =
    userAnswer.trim().toLowerCase() ===
    cards[index].norwegianText.toLowerCase();

  const handleSubmit = () => {
    if (correct) {
      setCountCorrectAnswers((prev) => prev + 1);
      setFeedback("✅ Riktig!");
    } else {
      setFeedback(`❌ Feil! Riktig svar: ${cards[index].norwegianText}`);
    }
  };

  const handleNext = () => {
    if (index + 1 < cards.length) {
      setIndex((prev) => prev + 1);
      setUserAnswer("");
    } else {
      setIsFinished(true);
      updateProgress.mutate({
        userId,
        courseId: Number(courseId),
        correctAnswers: countCorrectAnswers,
      });
    }
  };

  return (
    <div className="flashcard">
      {feedback && !isFinished && (
        <p className="flashcard-feedback">{feedback}</p>
      )}
      {!isFinished && (
        <div className="flashcard-content">
          <h2>{cards?.[index].englishText}</h2>
          <input
            type="text"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="Skriv på norsk"
            className="flashcard-input"
          />
          <div className="flashcard-actions">
            <button className="btn flashcard-btn" onClick={handleSubmit}>
              Submit
            </button>
            <button className="btn flashcard-btn" onClick={handleNext}>
              Next
            </button>
          </div>
        </div>
      )}

      {isFinished && (
        <div className="result">
          <h2 className="result-title">Result</h2>
          <p className="result-text">
            You got {countCorrectAnswers} out of {cards.length} correct!
          </p>
          <Link to="/courses" className="btn result-btn">
            Go back to cards page
          </Link>
        </div>
      )}
    </div>
  );
}
