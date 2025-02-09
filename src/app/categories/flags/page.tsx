"use client"

import { useState, useEffect, type KeyboardEvent } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion, AnimatePresence } from "framer-motion"
import { Itim } from "next/font/google"
import Image from "next/image"
import dynamic from "next/dynamic"

const itim = Itim({ weight: "400", subsets: ["latin"] })

// Updated list of 195 sovereign states
const countries = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Brazil",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Cape Verde",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Comoros",
  "Congo",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czech Republic",
  "Democratic Republic of the Congo",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Ethiopia",
  "Fiji",
  "Finland",
  "France",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Greece",
  "Grenada",
  "Guatemala",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Ivory Coast",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Micronesia",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "North Korea",
  "North Macedonia",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Korea",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Sweden",
  "Switzerland",
  "Syria",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Timor-Leste",
  "Togo",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Vatican City",
  "Venezuela",
  "Vietnam",
  "Yemen",
  "Zambia",
  "Zimbabwe",
]

const getCountryCode = (country: string): string => {
  const codes: { [key: string]: string } = {
    "United States": "us",
    "United Kingdom": "gb",
    "North Korea": "kp",
    "South Korea": "kr",
    "Czech Republic": "cz",
    "Dominican Republic": "do",
    "United Arab Emirates": "ae",
    "South Africa": "za",
    "New Zealand": "nz",
    "Saudi Arabia": "sa",
    "Democratic Republic of the Congo": "cd",
    "Vatican City": "va",
    "Timor-Leste": "tl",
    "North Macedonia": "mk",
    "Ivory Coast": "ci",
    "Sao Tome and Principe": "st",
    Afghanistan: "af",
    Albania: "al",
    Algeria: "dz",
    Andorra: "ad",
    Angola: "ao",
    "Antigua and Barbuda": "ag",
    Argentina: "ar",
    Armenia: "am",
    Australia: "au",
    Austria: "at",
    Azerbaijan: "az",
    Bahamas: "bs",
    Bahrain: "bh",
    Bangladesh: "bd",
    Barbados: "bb",
    Belarus: "by",
    Belgium: "be",
    Belize: "bz",
    Benin: "bj",
    Bhutan: "bt",
    Bolivia: "bo",
    "Bosnia and Herzegovina": "ba",
    Botswana: "bw",
    Brazil: "br",
    Brunei: "bn",
    Bulgaria: "bg",
    "Burkina Faso": "bf",
    Burundi: "bi",
    Cambodia: "kh",
    Cameroon: "cm",
    Canada: "ca",
    "Cape Verde": "cv",
    "Central African Republic": "cf",
    Chad: "td",
    Chile: "cl",
    China: "cn",
    Colombia: "co",
    Comoros: "km",
    Congo: "cg",
    "Costa Rica": "cr",
    Croatia: "hr",
    Cuba: "cu",
    Cyprus: "cy",
    Denmark: "dk",
    Djibouti: "dj",
    Dominica: "dm",
    Ecuador: "ec",
    Egypt: "eg",
    "El Salvador": "sv",
    "Equatorial Guinea": "gq",
    Eritrea: "er",
    Estonia: "ee",
    Ethiopia: "et",
    Fiji: "fj",
    Finland: "fi",
    France: "fr",
    Gabon: "ga",
    Gambia: "gm",
    Georgia: "ge",
    Germany: "de",
    Ghana: "gh",
    Greece: "gr",
    Grenada: "gd",
    Guatemala: "gt",
    Guinea: "gn",
    "Guinea-Bissau": "gw",
    Guyana: "gy",
    Haiti: "ht",
    Honduras: "hn",
    Hungary: "hu",
    Iceland: "is",
    India: "in",
    Indonesia: "id",
    Iran: "ir",
    Iraq: "iq",
    Ireland: "ie",
    Israel: "il",
    Italy: "it",
    Jamaica: "jm",
    Japan: "jp",
    Jordan: "jo",
    Kazakhstan: "kz",
    Kenya: "ke",
    Kiribati: "ki",
    Kuwait: "kw",
    Kyrgyzstan: "kg",
    Laos: "la",
    Latvia: "lv",
    Lebanon: "lb",
    Lesotho: "ls",
    Liberia: "lr",
    Libya: "ly",
    Liechtenstein: "li",
    Lithuania: "lt",
    Luxembourg: "lu",
    Madagascar: "mg",
    Malawi: "mw",
    Malaysia: "my",
    Maldives: "mv",
    Mali: "ml",
    Malta: "mt",
    "Marshall Islands": "mh",
    Mauritania: "mr",
    Mauritius: "mu",
    Mexico: "mx",
    Micronesia: "fm",
    Moldova: "md",
    Monaco: "mc",
    Mongolia: "mn",
    Montenegro: "me",
    Morocco: "ma",
    Mozambique: "mz",
    Myanmar: "mm",
    Namibia: "na",
    Nauru: "nr",
    Nepal: "np",
    Netherlands: "nl",
    Nicaragua: "ni",
    Niger: "ne",
    Nigeria: "ng",
    Norway: "no",
    Oman: "om",
    Pakistan: "pk",
    Palau: "pw",
    Panama: "pa",
    "Papua New Guinea": "pg",
    Paraguay: "py",
    Peru: "pe",
    Philippines: "ph",
    Poland: "pl",
    Portugal: "pt",
    Qatar: "qa",
    Romania: "ro",
    Russia: "ru",
    Rwanda: "rw",
    "Saint Kitts and Nevis": "kn",
    "Saint Lucia": "lc",
    "Saint Vincent and the Grenadines": "vc",
    Samoa: "ws",
    "San Marino": "sm",
    Senegal: "sn",
    Serbia: "rs",
    Seychelles: "sc",
    "Sierra Leone": "sl",
    Singapore: "sg",
    Slovakia: "sk",
    Slovenia: "si",
    "Solomon Islands": "sb",
    Somalia: "so",
    "South Sudan": "ss",
    Spain: "es",
    "Sri Lanka": "lk",
    Sudan: "sd",
    Suriname: "sr",
    Sweden: "se",
    Switzerland: "ch",
    Syria: "sy",
    Tajikistan: "tj",
    Tanzania: "tz",
    Thailand: "th",
    Togo: "tg",
    Tonga: "to",
    "Trinidad and Tobago": "tt",
    Tunisia: "tn",
    Turkey: "tr",
    Turkmenistan: "tm",
    Tuvalu: "tv",
    Uganda: "ug",
    Ukraine: "ua",
    Uruguay: "uy",
    Uzbekistan: "uz",
    Vanuatu: "vu",
    Venezuela: "ve",
    Vietnam: "vn",
    Yemen: "ye",
    Zambia: "zm",
    Zimbabwe: "zw",
  }

  return codes[country] || "xx"
}

const ClientOnly = dynamic(() => import("@/components/ui/ClientOnly"), { ssr: false })

const GamePage = () => {
  const [questions, setQuestions] = useState<string[]>([])
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
  const [showAnswer, setShowAnswer] = useState(false)

  useEffect(() => {
    resetGame()
  }, [])

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

  const getRandomCountry = () => {
    const availableCountries = countries.filter((country) => !questions.includes(country))
    if (availableCountries.length === 0) {
      return null
    }
    const randomIndex = Math.floor(Math.random() * availableCountries.length)
    return availableCountries[randomIndex]
  }

  const handleAnswerSubmit = () => {
    if (gameOver) return

    if (!gameStarted) {
      setGameStarted(true)
      setIsActive(true)
    }

    const currentQuestion = questions[currentQuestionIndex]
    if (currentQuestion && answer.toLowerCase().trim() === currentQuestion.toLowerCase()) {
      setCorrectAnswers(correctAnswers + 1)
      setEffect("correct")
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
    const newQuestion = getRandomCountry()
    if (newQuestion) {
      setQuestions([...questions, newQuestion])
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setTriesLeft(5)
      setAnswer("")
      setShowCorrectAnswer(false)
      setShowAnswer(false)
    } else {
      setGameOver(true)
      setIsActive(false)
    }
  }

  const handleSkip = () => {
    if (gameOver) return

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
      setTimeout(() => setEffect(null), 1000)
    } else {
      setFailedQuestions(failedQuestions + 1)
      setEffect("incorrect")
      setShowCorrectAnswer(true)
      setTimeout(() => {
        setEffect(null)
        nextQuestion()
      }, 3000)
    }
  }

  const resetGame = () => {
    const initialQuestions = []
    for (let i = 0; i < 10; i++) {
      const newQuestion = getRandomCountry()
      if (newQuestion) {
        initialQuestions.push(newQuestion)
      }
    }
    setQuestions(initialQuestions)
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
    setShowAnswer(false)
  }

  const handleShowAnswer = () => {
    setShowAnswer(true)
    setFailedQuestions(failedQuestions + 1)
    setTriesLeft(0)
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

        <Card className="w-full max-w-md bg-gray-800 bg-opacity-80 backdrop-filter backdrop-blur-lg shadow-xl border-gray-700 transition-all duration-300 hover:shadow-2xl hover:scale-105">
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
              <h2 className="text-xl font-semibold text-gray-200">
                Flag {currentQuestionIndex + 1} of {countries.length}
              </h2>
              <p className="text-xl font-semibold text-gray-200">Time: {formatTime(timer)}</p>
            </div>
            <div className="relative pt-1 mb-6">
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-700">
                <div
                  style={{ width: `${(currentQuestionIndex / countries.length) * 100}%` }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500 transition-all duration-500 ease-in-out"
                ></div>
              </div>
              <p className="text-center text-sm text-gray-400">
                {Math.round((currentQuestionIndex / countries.length) * 100)}% Complete
              </p>
            </div>
            {!gameOver && currentQuestion ? (
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
                    <div className="flex flex-col items-center">
                      <Image
                        src={`https://flagcdn.com/w160/${getCountryCode(currentQuestion)}.png`}
                        alt="Country flag"
                        width={160}
                        height={100}
                        className="w-40 h-auto object-contain shadow-lg rounded"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.onerror = null
                          target.src = "/placeholder.svg"
                        }}
                      />
                      {(showAnswer || showCorrectAnswer) && (
                        <p className="mt-2 text-red-500 font-bold text-xl text-center">{currentQuestion}</p>
                      )}
                    </div>
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
                <div className="flex justify-between items-center mb-4 space-x-2">
                  <Button
                    onClick={handleAnswerSubmit}
                    disabled={triesLeft === 0}
                    className="bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-200 flex-1"
                  >
                    Submit
                  </Button>
                  <Button
                    onClick={handleShowAnswer}
                    disabled={showAnswer}
                    className="bg-yellow-600 hover:bg-yellow-700 text-white transition-colors duration-200 flex-1"
                  >
                    Show
                  </Button>
                  <Button
                    onClick={handleSkip}
                    className="bg-gray-600 hover:bg-gray-700 text-white transition-colors duration-200 flex-1"
                  >
                    Next
                  </Button>
                </div>
                <div className="flex justify-between text-sm bg-gray-700 p-3 rounded-lg">
                  <p className="text-green-400 flex items-center">
                    <span className="w-3 h-3 bg-green-400 rounded-full mr-2"></span>
                    Correct: {correctAnswers}
                  </p>
                  <p className="text-red-400 flex items-center">
                    <span className="w-3 h-3 bg-red-400 rounded-full mr-2"></span>
                    Failed: {failedQuestions}
                  </p>
                  <p className="text-yellow-400 flex items-center">
                    <span className="w-3 h-3 bg-yellow-400 rounded-full mr-2"></span>
                    Skipped: {skippedQuestions}
                  </p>
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
      </div>
    </ClientOnly>
  )
}

export default GamePage

