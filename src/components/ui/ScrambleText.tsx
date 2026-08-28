'use client'

import { useState, useRef, useEffect, useCallback } from 'react'

interface ScrambleTextProps {
  text: string
  className?: string
  as?: React.ElementType
  scrambleSpeed?: number
  scrambleChars?: string
}

const DEFAULT_CHARS = '!@#$%^&*()_+-=[]{}|;:,.<>?/0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'

export function ScrambleText({
  text,
  className = '',
  as: Component = 'span',
  scrambleSpeed = 35,
  scrambleChars = DEFAULT_CHARS,
}: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState(text)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const stepRef = useRef(0)

  useEffect(() => {
    setDisplayText(text)
  }, [text])

  const stopScramble = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  useEffect(() => {
    return () => {
      stopScramble()
    }
  }, [stopScramble])

  const startScramble = useCallback(() => {
    stopScramble()
    stepRef.current = 0

    const totalSteps = text.length * 3.5

    intervalRef.current = setInterval(() => {
      stepRef.current += 1
      const progress = stepRef.current / totalSteps
      const revealedCount = Math.floor(progress * text.length)

      const scrambled = text
        .split('')
        .map((char, idx) => {
          if (char === ' ' || char === '/') return char
          if (idx < revealedCount) return char
          return scrambleChars[Math.floor(Math.random() * scrambleChars.length)]
        })
        .join('')

      setDisplayText(scrambled)

      if (stepRef.current >= totalSteps) {
        stopScramble()
        setDisplayText(text)
      }
    }, scrambleSpeed)
  }, [text, scrambleChars, scrambleSpeed, stopScramble])

  return (
    <Component
      onMouseEnter={startScramble}
      className={`cursor-pointer select-none transition-colors duration-300 ${className}`}
    >
      {displayText}
    </Component>
  )
}
