import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Quiz Game',
  description: 'A simple quiz game with multiple questions',
}

export default function QuizGameLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-gray-200">
      {children}
    </div>
  )
}

