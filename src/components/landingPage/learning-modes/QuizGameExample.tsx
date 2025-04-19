import { CheckIcon, LucideRefreshCw } from "lucide-react";
import React, { useState } from "react";
import Button from "@components/ui/Button";
import { AnswerCard, QuestionCard } from "@components/ui/Card";
import Paragraph from "@components/ui/Paragraph";

interface Answer {
  text: string;
  correct: boolean;
}

interface QuizQuestion {
  question: string;
  answers: Answer[];
}

const QuizGameExample: React.FC = () => {
  const quizQuestions: QuizQuestion[] = [
    {
      question: "Dans quelle ville se situe le parlement européen ?",
      answers: [
        { text: "Bruxelles", correct: false },
        { text: "Berlin", correct: false },
        { text: "Londres", correct: false },
        { text: "Strasbourg", correct: true },
      ],
    },
    {
      question: "Quel est le plus grand océan du monde ?",
      answers: [
        { text: "Atlantique", correct: false },
        { text: "Pacifique", correct: true },
        { text: "Indien", correct: false },
        { text: "Arctique", correct: false },
      ],
    },
    {
      question: "Quelle est la capitale de l'Australie ?",
      answers: [
        { text: "Sydney", correct: false },
        { text: "Melbourne", correct: false },
        { text: "Canberra", correct: true },
        { text: "Brisbane", correct: false },
      ],
    },
    {
      question: "Combien de côtés a un hexagone ?",
      answers: [
        { text: "5", correct: false },
        { text: "6", correct: true },
        { text: "7", correct: false },
        { text: "8", correct: false },
      ],
    },
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(
    null
  );
  const [showIncorrectMessage, setShowIncorrectMessage] = useState(false);
  const [showButtons, setShowButtons] = useState(false);

  const currentQuestion = quizQuestions[currentQuestionIndex];

  // Function to handle answer selection
  const handleSelectAnswer = (index: number) => {
    if (hasAnswered) return;

    setHasAnswered(true);
    setSelectedAnswerIndex(index);
    setShowButtons(true);

    const isCorrect = currentQuestion.answers[index].correct;
    if (!isCorrect) {
      setShowIncorrectMessage(true);
    }
  };

  // Function to get the correct answer text
  const getCorrectAnswerText = () => {
    const correctAnswer = currentQuestion.answers.find(
      (answer) => answer.correct
    );
    return correctAnswer ? correctAnswer.text : "";
  };

  // Function to move to the next question
  const handleNextQuestion = () => {
    setCurrentQuestionIndex(
      (prevIndex) => (prevIndex + 1) % quizQuestions.length
    );
    resetQuestionState();
  };

  // Function to reset the current question
  const handleResetQuestion = () => {
    resetQuestionState();
  };

  // Helper to reset the question state
  const resetQuestionState = () => {
    setHasAnswered(false);
    setSelectedAnswerIndex(null);
    setShowIncorrectMessage(false);
    setShowButtons(false);
  };

  return (
    <div className="relative flex flex-col space-y-4 order-2 lg:order-1">
      <QuestionCard>
        <h4 className="text-lg sm:text-xl font-semibold font-saeada text-center">
          {currentQuestion.question}
        </h4>
      </QuestionCard>

      <div className="grid grid-cols-2 gap-4">
        {currentQuestion.answers.map((answer, index) => {
          const isSelected = selectedAnswerIndex === index;
          const showCorrect = hasAnswered && answer.correct;
          const showIncorrect = hasAnswered && isSelected && !answer.correct;

          let cardClassName = "hover:-translate-y-1 transform transition-all";
          if (showCorrect) cardClassName = "bg-emerald-100 border-emerald-500";
          if (showIncorrect) cardClassName = "bg-rose-100 border-rose-500";

          return (
            <button
              key={index}
              onClick={() => handleSelectAnswer(index)}
              disabled={hasAnswered}
              // isCorrect={answer.correct}
            >
              <AnswerCard className={cardClassName}>
                <span className="font-medium">{answer.text}</span>
                {showCorrect && (
                  <div className="absolute top-2 right-2">
                    <CheckIcon className="h-5 w-5 text-emerald-500" />
                  </div>
                )}
              </AnswerCard>
            </button>
          );
        })}
      </div>

      {showIncorrectMessage && (
        <div className="p-4 text-center font-semibold bg-rose-100 rounded-md">
          <Paragraph className="text-rose-600">
            Essayez encore. La bonne réponse est "{getCorrectAnswerText()}".
          </Paragraph>
        </div>
      )}

      {showButtons && (
        <div className="mt-2 flex justify-between">
          <Button variant="neutral" onClick={handleResetQuestion}>
            <LucideRefreshCw className="w-4 h-4" />
          </Button>
          <Button onClick={handleNextQuestion}>
            <p className="text-white">Question suivante →</p>
          </Button>
        </div>
      )}

      <div className="quiz-progress mt-4 flex space-x-2">
        {quizQuestions.map((_, index) => (
          <span
            key={index}
            className={`h-2 w-2 rounded-full ${
              index === currentQuestionIndex ? "bg-emerald-500" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default QuizGameExample;
