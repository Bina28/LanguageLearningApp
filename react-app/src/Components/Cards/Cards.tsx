import "./Cards.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useUserProgress } from "../UserProgressContext";


interface Cards {
  id: number;
  englishText: string;
  norwegianText: string;
}


export default function Cards() {
  const { completedUnits, refreshProgress } = useUserProgress();
  const { courseId } = useParams<{ courseId: string }>();
  const [flashcards, setFlashcards] = useState<Cards[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);


  useEffect(() => {
    const fetchFlashcards = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.get<Cards[]>(`${apiUrl}/api/learning/cards/${courseId}`);
        const shuffledCards = response.data.sort(() => 0.5 - Math.random()).slice(0, 5);
        setFlashcards(shuffledCards);
      } catch (error) {
        console.error("Error fetching flashcards:", error);
      }
    };

    fetchFlashcards();
  }, [courseId]);

  const updateUserCourse = async (isCompleted: boolean) => {
    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      const userString = localStorage.getItem("user");
      if (!userString) return;

      const user = JSON.parse(userString);
      const userId = user.id;

      // Call the API to update UserCourse (increment attempts and set completion status)
      await axios.post(`${apiUrl}/api/usercourse`, {
        Id: userId,
        CourseId: courseId,
        IsCompleted: isCompleted,
      });
    } catch (error) {
      console.error("Error updating UserCourse:", error);
    }
  };

  const completeUnit = async () => {
    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      const userString = localStorage.getItem("user");
      if (!userString) return;

      const user = JSON.parse(userString);
      const userId = user.id;

      const isCompleted = correctAnswers >= 3;

      // Update user progress if the course is completed
      if (isCompleted) {
        await axios.post(`${apiUrl}/api/learning/complete`, {
          Id: userId,
          CorrectAnswers: correctAnswers,
        });

        refreshProgress();
      }
    } catch (error) {
      console.error("Error updating completed units:", error);
    }
  };

  const checkAnswer = () => {
    const isCorrect = userAnswer.trim().toLowerCase() === flashcards[currentIndex].norwegianText.toLowerCase();

    if (isCorrect) {
      setCorrectAnswers((prev) => prev + 1);
      setFeedback("✅ Riktig!");
    } else {
      setFeedback(`❌ Feil! Riktig svar: ${flashcards[currentIndex].norwegianText}`);
    }

    setIsAnswered(true);

    setTimeout(async () => {
      try {
        if (currentIndex + 1 < flashcards.length) {
          // Move to the next flashcard
          setCurrentIndex((prev) => prev + 1);
          setUserAnswer("");
          setFeedback(null);
          setIsAnswered(false);
        } else {
          // User has finished the flashcards
          const isCompleted = correctAnswers + (isCorrect ? 1 : 0) >= 3;

          // Update UserCourse (increment attempts and set completion status)
          await updateUserCourse(isCompleted);

          // Complete the unit if the user passed
          if (isCompleted) {
            await completeUnit();
          }

          // Show the result
          setShowResult(true);
        }
      } catch (error) {
        console.error("Error during setTimeout operation:", error);
      }
    }, 2500);
  };

  return (
    <div className="flashcard-container">
      {showResult ? (
        <div className="result">
          <h2>Du fikk {correctAnswers} av {flashcards.length} riktige!</h2>
          {correctAnswers >= 3 ? <p>✅ Du kan gå videre til neste unit!</p> : <p>❌ Prøv igjen for å bestå denne unit.</p>}
        </div>
      ) : (
        flashcards.length > 0 && (
          <div className="flashcard-wrapper">
            {feedback && <p className="feedback">{feedback}</p>}
            <div className="flashcard">
              <h2>{flashcards[currentIndex].englishText}</h2>
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Skriv på norsk"
                disabled={isAnswered}
              />
              <button onClick={checkAnswer} disabled={isAnswered}>Submit</button>
            </div>
          </div>
        )
      )}
    </div>
  );
}

