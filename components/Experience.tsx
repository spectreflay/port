"use client"

import { motion } from "framer-motion"
import type React from "react"
import { useRef, useState } from "react"
import ExperienceCard from "./ExperienceCard"
import { Experience } from "../typings"
import { ChevronLeft, ChevronRight } from "lucide-react"

type Props = {
  experiences: Experience[]
}

function Experience({ experiences }: Props) {
  const [activeIndex, setActiveIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const scrollToCard = (direction: "next" | "prev") => {
    if (containerRef.current) {
      const newIndex =
        direction === "next" ? Math.min(activeIndex + 1, experiences.length - 1) : Math.max(activeIndex - 1, 0)

      setActiveIndex(newIndex)

      const cardWidth = containerRef.current.offsetWidth
      containerRef.current.scrollTo({
        left: newIndex * cardWidth,
        behavior: "smooth",
      })
    }
  }

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (containerRef.current) {
      const scrollPosition = e.currentTarget.scrollLeft
      const cardWidth = containerRef.current.offsetWidth
      const newIndex = Math.round(scrollPosition / cardWidth)
      setActiveIndex(newIndex)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="min-h-screen flex relative overflow-hidden flex-col text-left max-w-full justify-center mx-auto items-center pt-[100px]"
    >
      <div className="w-full absolute top-[100px] bg-primary-mint/10 h-[500px] -skew-y-12" />

      <h3 className="absolute top-24 uppercase tracking-[20px] text-primary-mint text-2xl font-bold">Experience</h3>

      <div className="w-full flex flex-col items-center mt-20 relative px-5 md:px-10">
        {/* Navigation Buttons */}
        {experiences.length > 1 && (
          <>
            <button
              onClick={() => scrollToCard("prev")}
              disabled={activeIndex === 0}
              className={`absolute left-0 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-primary-dark/80 text-primary-mint border border-primary-mint/20 backdrop-blur-sm transition-all duration-300 ${
                activeIndex === 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-primary-mint hover:text-primary-dark"
              }`}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => scrollToCard("next")}
              disabled={activeIndex === experiences.length - 1}
              className={`absolute right-0 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-primary-dark/80 text-primary-mint border border-primary-mint/20 backdrop-blur-sm transition-all duration-300 ${
                activeIndex === experiences.length - 1
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-primary-mint hover:text-primary-dark"
              }`}
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}

        {/* Cards Container */}
        <div
          ref={containerRef}
          onScroll={handleScroll}
          className="w-full flex snap-x snap-mandatory overflow-x-hidden scrollbar-none"
        >
          {experiences?.map((experience, idx) => (
            <div
              key={experience._id}
              className="flex-shrink-0 w-full flex items-center justify-center transition-all duration-500 px-5 md:px-10"
            >
              <div
                className={`transition-all duration-500 ${
                  idx === activeIndex ? "opacity-100 scale-100" : "opacity-30 scale-95"
                }`}
              >
                <ExperienceCard experience={experience} />
              </div>
            </div>
          ))}
        </div>

        {/* Dots Indicator */}
        {experiences.length > 1 && (
          <div className="flex justify-center space-x-2 mt-8">
            {experiences.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setActiveIndex(idx)
                  containerRef.current?.scrollTo({
                    left: idx * containerRef.current.offsetWidth,
                    behavior: "smooth",
                  })
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  idx === activeIndex ? "bg-primary-mint w-4" : "bg-primary-mint/30"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default Experience

