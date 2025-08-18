import "./Cards.css";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useCards } from "../../lib/hooks/useCards";
import { useUserProgressUpdate } from "../../lib/hooks/useUserProgressUpdate";
import { useCompletedUnit } from "../../lib/hooks/useCompletedUnit";

export default function Cards() {
  const { courseId } = useParams();
  const { cards, isLoadingCards } = useCards(courseId);
  const { updateProgress } = useUserProgressUpdate();
  const { mutateAsync: completeUnit } = useCompletedUnit();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  if (isLoadingCards) return <p>Loading...</p>;
  if (!cards || cards.length === 0) return <p>No cards found</p>;

  const handleCheckAnswer = async () => {
    const isCorrect =
      userAnswer.trim().toLowerCase() ===
      cards[currentIndex].norwegianText.toLowerCase();

    if (isCorrect) {
      setCorrectAnswers((prev) => prev + 1);
      setFeedback("✅ Riktig!");
    } else {
      setFeedback(`❌ Feil! Riktig svar: ${cards[currentIndex].norwegianText}`);
    }

    setIsAnswered(true);

    setTimeout(async () => {
      if (currentIndex + 1 < cards.length) {
        setCurrentIndex((prev) => prev + 1);
        setUserAnswer("");
        setFeedback(null);
        setIsAnswered(false);
      } else {
        const isCompleted = correctAnswers + (isCorrect ? 1 : 0) >= 3;

        const userString = localStorage.getItem("user");
        if (!userString) return;

        const user = JSON.parse(userString);
        const userId = user.id;

        if (isCompleted) {
          await completeUnit({
            Id: userId,
            CorrectAnswers: correctAnswers + (isCorrect ? 1 : 0),
          });
        }

        await updateProgress.mutateAsync({
          userid: userId,
          courseId: Number(courseId),
          isCompleted,
        });

        setShowResult(true);
      }
    }, 2500);
  };

  return (
    <div className="flashcard-container">
      {showResult ? (
        <div className="result">
          <h2>
            Du fikk {correctAnswers} av {cards.length} riktige!
          </h2>
          {correctAnswers >= 3 ? (
            <p>✅ Du kan gå videre til neste unit!</p>
          ) : (
            <p>❌ Prøv igjen for å bestå denne unit.</p>
          )}
        </div>
      ) : (
        <div className="flashcard-wrapper">
          {feedback && <p className="feedback">{feedback}</p>}
          <div className="flashcard">
            <h2>{cards[currentIndex].englishText}</h2>
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Skriv på norsk"
              disabled={isAnswered}
            />
            <button onClick={handleCheckAnswer} disabled={isAnswered}>
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
