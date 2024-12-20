import { Button } from "./ui/Button"
import Image from "next/image"

interface QuizStartProps {
  onStart: () => void
}

export function QuizStart({ onStart }: QuizStartProps) {
  return (
    <div className="text-center space-y-6">
      <Image
        src="/images/robot-teacher.svg"
        alt="English Teacher"
        width={300}
        height={300}
        className="mx-auto rounded-lg"
      />
      <h1 className="text-3xl font-bold text-blue-600">
        Определите свой уровень английского
      </h1>
      <p className="text-gray-600 max-w-md mx-auto">
        Пройдите короткий тест и получите бесплатный пробный урок с профессиональным преподавателем
      </p>
      <Button 
        onClick={onStart}
        size="lg"
        className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 text-lg"
      >
        Начать квиз
      </Button>
    </div>
  )
}

