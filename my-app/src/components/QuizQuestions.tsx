import { useState } from 'react'
import { Button } from "./ui/Button"
import { Card } from "./ui/Card"
import { RadioGroup, RadioGroupItem } from "./ui/RadioGroup"
import { Label } from "./ui/Label"
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'

const questions = [
  {
    id: 1,
    question: "Как часто вы сталкиваетесь с английским языком?",
    options: [
      { 
        id: 'a', 
        text: "Каждый день на работе", 
        gif: "https://media.giphy.com/media/3oKIPnAiaMCws8nOsE/giphy.gif"
      },
      { 
        id: 'b', 
        text: "Иногда смотрю фильмы/сериалы в оригинале", 
        gif: "https://media.giphy.com/media/3o7rc0qU6m5hneMsuc/giphy.gif"
      },
      { 
        id: 'c', 
        text: "Редко, в основном в путешествиях", 
        gif: "https://media.giphy.com/media/3o6ZtrvsFui01kCPCg/giphy.gif"
      },
      { 
        id: 'd', 
        text: "Практически никогда", 
        gif: "https://media.giphy.com/media/26BRxBeok4neDwUQo/giphy.gif"
      }
    ]
  },
  {
    id: 2,
    question: "Какая ваша главная цель в изучении английского?",
    options: [
      { 
        id: 'a', 
        text: "Карьерный рост", 
        gif: "https://media.giphy.com/media/3o7TKMt1VVNkHV2PaE/giphy.gif"
      },
      { 
        id: 'b', 
        text: "Путешествия", 
        gif: "https://media.giphy.com/media/3o6ZtpWvwnhf34Oj0A/giphy.gif"
      },
      { 
        id: 'c', 
        text: "Саморазвитие", 
        gif: "https://media.giphy.com/media/26BRzozg4TCBXv6QU/giphy.gif"
      },
      { 
        id: 'd', 
        text: "Переезд за границу", 
        gif: "https://media.giphy.com/media/3o6Zt3AC93PIPAdQ9a/giphy.gif"
      }
    ]
  },
  {
    id: 3,
    question: "Как бы вы оценили свой текущий уровень английского?",
    options: [
      { 
        id: 'a', 
        text: "Начинающий", 
        gif: "https://media.giphy.com/media/3o7TKMt1VVNkHV2PaE/giphy.gif" 
      },
      { 
        id: 'b', 
        text: "Элементарный", 
        gif: "https://media.giphy.com/media/3o6Zt3AC93PIPAdQ9a/giphy.gif"
      },
      { 
        id: 'c', 
        text: "Средний", 
        gif: "https://media.giphy.com/media/3o6ZtrvsFui01kCPCg/giphy.gif"
      },
      { 
        id: 'd', 
        text: "Продвинутый", 
        gif: "https://media.giphy.com/media/26BRxBeok4neDwUQo/giphy.gif"
      }
    ]
  }
]

interface QuizQuestionsProps {
  onComplete: (answers: Record<number, string[]>) => void;
}

export function QuizQuestions({ onComplete }: QuizQuestionsProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string[]>>({})

  const handleAnswer = (questionId: number, answerId: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: prev[questionId]?.includes(answerId) 
        ? prev[questionId].filter(id => id !== answerId)
        : [...(prev[questionId] || []), answerId]
    }))
  }

  const handleComplete = () => {
    onComplete(answers);
  };

  const canProceed = answers[questions[currentQuestion].id]?.length > 0
  const isLastQuestion = currentQuestion === questions.length - 1

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Button
          variant="ghost"
          onClick={() => setCurrentQuestion(prev => prev - 1)}
          disabled={currentQuestion === 0}
        >
          <ChevronLeft className="mr-2" />
          Назад
        </Button>
        <span className="text-sm text-gray-500">
          Вопрос {currentQuestion + 1} из {questions.length}
        </span>
      </div>

      <h2 className="text-2xl font-bold text-center text-blue-600">
        {questions[currentQuestion].question}
      </h2>

      <RadioGroup
        value={answers[questions[currentQuestion].id]?.[0] || ''}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {questions[currentQuestion].options.map((option) => (
          <Card
            key={option.id}
            className={`p-4 cursor-pointer transition-colors ${
              answers[questions[currentQuestion].id]?.includes(option.id)
                ? 'border-blue-500 bg-blue-50'
                : ''
            }`}
            onClick={() => handleAnswer(questions[currentQuestion].id, option.id)}
          >
            <div className="flex items-start space-x-3">
              <RadioGroupItem
                value={option.id}
                id={option.id}
                className="mt-1"
              />
              <div className="flex-1">
                <Label htmlFor={option.id}>{option.text}</Label>
                <Image
                  src={option.gif}
                  alt={option.text}
                  width={200}
                  height={150}
                  className="mt-2 rounded-lg"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://via.placeholder.com/200x150?text=Loading...";
                  }}
                />
              </div>
            </div>
          </Card>
        ))}
      </RadioGroup>

      <Button
        onClick={isLastQuestion ? handleComplete : () => setCurrentQuestion(prev => prev + 1)}
        disabled={!canProceed}
        className="w-full"
      >
        {isLastQuestion ? 'Завершить' : 'Следующий вопрос'}
        {!isLastQuestion && <ChevronRight className="ml-2" />}
      </Button>
    </div>
  )
}

