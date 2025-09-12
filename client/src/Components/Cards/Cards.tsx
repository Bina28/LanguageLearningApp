import { useState } from "react";
import { useCards } from "../../lib/hooks/useCards";
import { useUserProgressUpdate } from "../../lib/hooks/useUserProgressUpdate";
import { useParams } from "react-router-dom";
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
    <div className="flashcard-container">
      {!isFinished && (
        <div className="flashcard">
          <h2>{cards?.[index].englishText}</h2>
          <input
            type="text"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="Skriv på norsk"
          />
          <div className="btn-cards-container">
            <button onClick={handleSubmit}>Submit</button>
            <button onClick={handleNext}>Next</button>
          </div>
          <div className="flashcard-wrapper">
            {feedback && <p className="feedback">{feedback}</p>}
          </div>
        </div>
      )}

      {isFinished && (
        <div className="result-container">
          <h2 className="result-title">Result</h2>
          <p className="result-text">
            You got {countCorrectAnswers} out of {cards.length} correct!
          </p>
        </div>
      )}
    </div>
  );
}
