import { useState, useEffect } from 'react'
import { Card } from "@/components/ui/Card"
import { QuizStart } from '@/components/QuizStart'
import { QuizQuestions } from '@/components/QuizQuestions'
import { QuizComplete } from '@/components/QuizComplete'
import { BookingModal } from '@/components/BookingModal'

export default function Quiz() {
  const [stage, setStage] = useState<'start' | 'questions' | 'complete'>('start')
  const [showBooking, setShowBooking] = useState(false)
  const [telegramUsername, setTelegramUsername] = useState<string | null>(null)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const telegram = urlParams.get('telegram');
    setTelegramUsername(telegram);
  }, []);

  const handleQuizComplete = async (answers: Record<number, string[]>) => {
    try {
      const response = await fetch('/api/quiz-complete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          telegram: telegramUsername,
          answers,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send quiz answers');
      }

      setStage('complete');
    } catch (error) {
      console.error('Error sending quiz answers:', error);
      // Handle error (e.g., show an error message to the user)
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4">
      <Card className="max-w-4xl mx-auto p-6 shadow-lg">
        {stage === 'start' && (
          <QuizStart onStart={() => setStage('questions')} />
        )}
        
        {stage === 'questions' && (
          <QuizQuestions 
            onComplete={handleQuizComplete}
          />
        )}
        
        {stage === 'complete' && (
          <QuizComplete onBookLesson={() => setShowBooking(true)} />
        )}

        <BookingModal 
          open={showBooking} 
          onClose={() => setShowBooking(false)}
        />
      </Card>
    </div>
  )
}

