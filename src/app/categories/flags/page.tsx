"use client"

import { useState, useEffect, useRef, type KeyboardEvent } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion, AnimatePresence } from "framer-motion"
import { Itim } from "next/font/google"
import Image from "next/image"
import dynamic from "next/dynamic"

const itim = Itim({ weight: "400", subsets: ["latin"] })

// List of all 195 countries (abbreviated for brevity)
const countries = ["Afghanistan", "Albania", "Algeria", /* ... other countries ... */ "Zimbabwe"]

const ClientOnly = dynamic(() => import("@/components/ui/ClientOnly"), { ssr: false })

const GamePage = () => {
  const [questions, setQuestions] = useState<string[]>(countries)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [triesLeft, setTriesLeft] = useState(5)
  const [answer, setAnswer] = useState("")
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [skippedQuestions, setSkippedQuestions] = useState(0)
  const [failedQuestions, setFailedQuestions] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [effect, setEffect] = useState<"correct" | "incorrect" | null>(null)
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false)
  const [timer, setTimer] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const [gameStarted, setGameStarted] = useState(false)

  const correctAudioRef = useRef<HTMLAudioElement | null>(null)
  const incorrectAudioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (questions.length === 0) {
      const shuffledQuestions = [...countries].sort(() => Math.random() - 0.5)
      setQuestions(shuffledQuestions)
    }
  }, [questions])

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    if (isActive && !gameOver) {
      interval = setInterval(() => {
        setTimer((timer) => timer + 1)
      }, 1000)
    } else if (!isActive && timer !== 0) {
      if (interval) clearInterval(interval)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive, gameOver, timer])

  const handleAnswerSubmit = () => {
    if (!gameStarted) {
      setGameStarted(true)
      setIsActive(true)
    }

    const currentQuestion = questions[currentQuestionIndex]
    if (answer.toLowerCase().trim() === currentQuestion.toLowerCase()) {
      setCorrectAnswers(correctAnswers + 1)
      setEffect("correct")
      if (correctAudioRef.current) {
        correctAudioRef.current.play()
      }
      setTimeout(() => {
        setEffect(null)
        nextQuestion()
      }, 1000)
    } else {
      handleTryAgain()
    }
  }

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleAnswerSubmit()
    }
  }

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setTriesLeft(5)
      setAnswer("")
      setShowCorrectAnswer(false)
    } else {
      setGameOver(true)
      setIsActive(false)
    }
  }

  const handleSkip = () => {
    if (!gameStarted) {
      setGameStarted(true)
      setIsActive(true)
    }
    setSkippedQuestions(skippedQuestions + 1)
    nextQuestion()
  }

  const handleTryAgain = () => {
    if (triesLeft > 1) {
      setTriesLeft(triesLeft - 1)
      setAnswer("")
      setEffect("incorrect")
      if (incorrectAudioRef.current) {
        incorrectAudioRef.current.play()
      }
      setTimeout(() => setEffect(null), 1000)
    } else {
      setFailedQuestions(failedQuestions + 1)
      setEffect("incorrect")
      setShowCorrectAnswer(true)
      if (incorrectAudioRef.current) {
        incorrectAudioRef.current.play()
      }
      setTimeout(() => {
        setEffect(null)
        nextQuestion()
      }, 3000)
    }
  }

  const resetGame = () => {
    const shuffledQuestions = [...countries].sort(() => Math.random() - 0.5)
    setQuestions(shuffledQuestions)
    setCurrentQuestionIndex(0)
    setTriesLeft(5)
    setAnswer("")
    setCorrectAnswers(0)
    setSkippedQuestions(0)
    setFailedQuestions(0)
    setGameOver(false)
    setShowCorrectAnswer(false)
    setTimer(0)
    setIsActive(false)
    setGameStarted(false)
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
  }

  const currentQuestion = questions[currentQuestionIndex]

  return (
    <ClientOnly>
      <div
        className={`min-h-screen bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center p-4 ${itim.className} relative overflow-hidden`}
      >
        {/* Background effect */}
        <div className="absolute inset-0 opacity-10">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-white rounded-full"
              style={{
                width: Math.random() * 5 + 2 + "px",
                height: Math.random() * 5 + 2 + "px",
                top: Math.random() * 100 + "%",
                left: Math.random() * 100 + "%",
              }}
              animate={{
                y: [0, -1000],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 20 + 10,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            />
          ))}
        </div>

        <Card className="w-full max-w-md bg-gray-800 bg-opacity-80 backdrop-filter backdrop-blur-lg shadow-xl border-gray-700">
          <CardHeader>
            <CardTitle className="text-center">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <motion.span
                  className="inline-block text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Flags of the World
                </motion.span>
              </motion.div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-200">Flag {currentQuestionIndex + 1} of 195</h2>
              <p className="text-xl font-semibold text-gray-200">Time: {formatTime(timer)}</p>
            </div>
            <div className="relative pt-1 mb-6">
              <div className="overflow-hidden h-4 mb-4 text-xs flex rounded bg-blue-200">
                <div
                  style={{ width: `${(currentQuestionIndex / (countries.length - 1)) * 100}%` }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                >
                  {Math.round((currentQuestionIndex / (countries.length - 1)) * 100)}%
                </div>
              </div>
            </div>
            {!gameOver ? (
              <>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentQuestionIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="flex justify-center mb-4 relative"
                  >
                    <Image
                      src={`https://flagcdn.com/w640/${currentQuestion?.toLowerCase().slice(0, 2)}.png`}
                      alt="Country flag"
                      width={320}
                      height={160}
                      className="w-64 h-auto shadow-lg rounded"
                    />
                    {showCorrectAnswer && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70">
                        <p className="text-red-500 font-bold text-2xl text-center">{currentQuestion}</p>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
                <div className="mb-4">
                  <Input
                    type="text"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Enter the country name"
                    className={`w-full bg-gray-700 text-gray-100 border-2 focus:border-4 ${
                      effect === "correct"
                        ? "animate-pulse border-green-500 focus:border-green-500"
                        : effect === "incorrect"
                          ? "animate-shake border-red-500 focus:border-red-500"
                          : "border-gray-600 focus:border-gray-500"
                    }`}
                  />
                </div>
                <div className="flex justify-between items-center mb-4">
                  <Button
                    onClick={handleAnswerSubmit}
                    disabled={triesLeft === 0}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Submit
                  </Button>
                  <Button
                    onClick={handleSkip}
                    className="bg-white hover:bg-gray-200 text-gray-800 border border-gray-300"
                  >
                    Next
                  </Button>
                </div>
                <div className="flex justify-between text-sm">
                  <p className="text-green-400">Correct: {correctAnswers}</p>
                  <p className="text-red-400">Failed: {failedQuestions}</p>
                  <p className="text-orange-400">Skipped: {skippedQuestions}</p>
                </div>
              </>
            ) : (
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-4 text-gray-100">Game Over!</h2>
                <p className="text-lg mb-4 text-gray-300">
                  You identified {correctAnswers} out of {countries.length} flags correctly.
                </p>
                <p className="text-lg mb-4 text-gray-300">Total time: {formatTime(timer)}</p>
                <Button onClick={resetGame} className="bg-blue-600 hover:bg-blue-700 text-white">
                  Play Again
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
        <audio ref={correctAudioRef} src="/correct.mp3" />
        <audio ref={incorrectAudioRef} src="/incorrect.mp3" />
      </div>
    </ClientOnly>
  )
}

export default GamePage


