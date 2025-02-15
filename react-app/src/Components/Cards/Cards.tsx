import "./Cards.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";



interface Cards {
  id: number;
  englishText: string;
  norwegianText: string;
}

export default function Cards() {
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
                const response = await axios.get<Cards[]>(`http://localhost:5117/api/auth/cards/${courseId}`);
                const shuffledCards = response.data.sort(() => 0.5 - Math.random()).slice(0, 5);
                setFlashcards(shuffledCards);
            } catch (error) {
                console.error("Error fetching flashcards:", error);
            }
        };
        fetchFlashcards();
    }, [courseId]);

    const checkAnswer = () => {
        const isCorrect = userAnswer.trim().toLowerCase() === flashcards[currentIndex].norwegianText.toLowerCase();
        
        if (isCorrect) {
            setCorrectAnswers((prev) => prev + 1);
            setFeedback("✅ Riktig!");
        } else {
            setFeedback(`❌ Feil! Riktig svar: ${flashcards[currentIndex].norwegianText}`);
        }

        setIsAnswered(true); // Блокировка инпута и кнопки

        setTimeout(() => {
            if (currentIndex + 1 < flashcards.length) {
                setCurrentIndex((prev) => prev + 1);
                setUserAnswer("");
                setFeedback(null);
                setIsAnswered(false); // Разблокировка для следующего вопроса
            } else {
                setShowResult(true);
            }
        }, 2500);
    };

    return (
        <div className="flashcard-container">
            {showResult ? (
                <div className="result">
                    <h2>Du fikk {correctAnswers} av {flashcards.length} riktige!</h2>
                    {correctAnswers >= 3 ? <p>✅ Du kan gå videre til neste unit!</p> : <p>❌ Prøv igjen for å bestå denne uniten.</p>}
                </div>
            ) : (
                flashcards.length > 0 && (
                    <div className="flashcard-wrapper">
                        {feedback && <p className="feedback">{feedback}</p>}
                        <div className="flashcard">
                            <div className="flashcard-content">
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
                    </div>
                )
            )}
        </div>
    );
}
