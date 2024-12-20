import { Button } from "./ui/Button"
import Image from "next/image"
import { Confetti } from "./Confetti"

interface QuizCompleteProps {
  onBookLesson: () => void
}

export function QuizComplete({ onBookLesson }: QuizCompleteProps) {
  return (
    <div className="text-center space-y-6">
      <Confetti />
      <Image
        src="/images/celebration.svg"
        alt="Celebration"
        width={300}
        height={300}
        className="mx-auto rounded-lg"
      />
      <h2 className="text-3xl font-bold text-blue-600">
        Поздравляем! Вы успешно завершили квиз
      </h2>
      <p className="text-gray-600 max-w-md mx-auto">
        Вы показали отличную мотивацию к изучению английского языка. 
        Забронируйте бесплатный пробный урок прямо сейчас!
      </p>
      <Button
        onClick={onBookLesson}
        size="lg"
        className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 text-lg"
      >
        Забронировать бесплатный урок
      </Button>
    </div>
  )
}

