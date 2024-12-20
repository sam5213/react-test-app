import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/Dialog"
import { Button } from "./ui/Button"
import { Input } from "./ui/Input"
import { Label } from "./ui/Label"
import { Loader2 } from 'lucide-react'

interface BookingModalProps {
  open: boolean
  onClose: () => void
}

export function BookingModal({ open, onClose }: BookingModalProps) {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    phone: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const urlParams = new URLSearchParams(window.location.search);
      const telegram = urlParams.get('telegram');

      const response = await fetch('/api/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          telegram,
        }),
      })
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Failed to book lesson');
      }
      
      const data = await response.json();
      if (data.success) {
        onClose();
        // Show success message
      } else {
        throw new Error(data.error || 'Failed to book lesson');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to book lesson')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Забронировать бесплатный урок</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="text-red-500 text-sm">{error}</div>
          )}
          <div className="space-y-2">
            <Label htmlFor="date">Предпочтительная дата *</Label>
            <Input
              id="date"
              type="date"
              required
              value={formData.date}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                date: e.target.value
              }))}
              disabled={isLoading}
              min={new Date().toISOString().split('T')[0]}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="time">Предпочтительное время *</Label>
            <select
              id="time"
              required
              value={formData.time}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                time: e.target.value
              }))}
              disabled={isLoading}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Выберите время</option>
              {Array.from({ length: 11 }, (_, i) => i + 10).map((hour) => (
                <option key={hour} value={`${hour}:00`}>
                  {`${hour}:00`}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Номер телефона (необязательно)</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                phone: e.target.value
              }))}
              disabled={isLoading}
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Бронирование...
              </>
            ) : (
              'Забронировать'
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

