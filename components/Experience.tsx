"use client"

import { motion, AnimatePresence } from "framer-motion"
import type React from "react"
import { useRef, useState } from "react"
import { Experience } from "../typings"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { urlFor } from "../sanity"

type Props = {
  experiences: Experience[]
}

function Experience({ experiences }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  const nextExperience = () => {
    setDirection(1)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % experiences.length)
  }

  const prevExperience = () => {
    setDirection(-1)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + experiences.length) % experiences.length)
  }

  const getVisibleExperiences = () => {
    if (experiences.length === 1) {
      return [{ experience: experiences[0], position: 0 }]
    }

    if (experiences.length === 2) {
      return [
        { experience: experiences[currentIndex], position: 0 },
        {
          experience: experiences[currentIndex === 0 ? 1 : 0],
          position: currentIndex === 0 ? 1 : -1,
        },
      ]
    }

    const positions = [-1, 0, 1]
    return positions.map((position) => {
      let index = currentIndex + position
      if (index < 0) index = experiences.length - 1
      if (index >= experiences.length) index = 0
      return { experience: experiences[index], position }
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="h-screen relative flex overflow-hidden flex-col text-left md:flex-row max-w-full justify-evenly mx-auto items-center"
    >
      {/* Background Shapes */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <svg className="absolute w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="experience-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(139, 232, 203, 0.1)" />
              <stop offset="100%" stopColor="rgba(126, 162, 170, 0.1)" />
            </linearGradient>
          </defs>

          {/* Top-right shape */}
          <motion.path
            d="M100,0 Q80,0 80,20 Q100,20 100,0 Z"
            fill="url(#experience-gradient)"
            animate={{
              d: [
                "M100,0 Q80,0 80,20 Q100,20 100,0 Z",
                "M100,0 Q75,5 80,25 Q105,20 100,0 Z",
                "M100,0 Q80,0 80,20 Q100,20 100,0 Z",
              ],
            }}
            transition={{ repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", duration: 10, ease: "easeInOut" }}
          />

          {/* Bottom-left shape */}
          <motion.path
            d="M0,100 Q20,100 20,80 Q0,80 0,100 Z"
            fill="url(#experience-gradient)"
            animate={{
              d: [
                "M0,100 Q20,100 20,80 Q0,80 0,100 Z",
                "M0,100 Q25,95 20,75 Q-5,80 0,100 Z",
                "M0,100 Q20,100 20,80 Q0,80 0,100 Z",
              ],
            }}
            transition={{ repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", duration: 12, ease: "easeInOut" }}
          />

          {/* Middle shape */}
          <motion.circle
            cx="50"
            cy="50"
            r="8"
            fill="url(#experience-gradient)"
            animate={{
              r: [8, 12, 8],
              cx: [50, 48, 50],
              cy: [50, 52, 50],
            }}
            transition={{ repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", duration: 8, ease: "easeInOut" }}
          />
        </svg>
      </div>

      <h3 className="absolute top-24 sm:top-28 uppercase tracking-[20px] text-primary-mint text-xl sm:text-2xl font-bold z-30">Experience</h3>

      <div className="relative w-full flex justify-center items-center mt-32 sm:mt-20">
        {experiences.length > 1 && (
          <button
            onClick={prevExperience}
            className="absolute left-2 sm:left-10 z-30 p-2 sm:p-3 rounded-full bg-primary-dark/80 text-primary-mint border border-primary-mint/20 backdrop-blur-sm transition-all duration-300 hover:bg-primary-mint hover:text-primary-dark disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={experiences.length <= 1}
          >
            <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" />
          </button>
        )}

        <div className="relative w-full max-w-7xl h-[450px] sm:h-[500px] flex items-center justify-center px-4 sm:px-0">
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            {getVisibleExperiences().map(({ experience, position }) => (
              <motion.div
                key={`${experience._id}-${position}`}
                custom={direction}
                initial={{
                  opacity: 0,
                  x: direction > 0 ? 1000 : -1000,
                  scale: 0.8,
                }}
                animate={{
                  opacity: position === 0 ? 1 : 0.7,
                  x: position === 0 ? 0 : `${position * 110}%`,
                  scale: position === 0 ? 1 : 0.8,
                  zIndex: position === 0 ? 10 : 0,
                }}
                exit={{
                  opacity: 0,
                  x: direction > 0 ? -1000 : 1000,
                  scale: 0.8,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                }}
                className={`absolute w-full max-w-sm sm:max-w-md md:max-w-xl ${position === 0 ? "z-20" : "z-10"}`}
              >
                <div className={`glass-card p-4 sm:p-6 rounded-xl mx-2 sm:mx-4 ${position === 0 ? "ring-2 ring-primary-mint/20" : ""}`}>
                  <motion.img
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1.2 }}
                    className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 object-contain mx-auto rounded-full"
                    src={urlFor(experience?.companyImage).url()}
                    alt={experience?.company}
                  />
                  <div className="mt-4 sm:mt-6">
                    <h4 className="text-lg sm:text-xl md:text-2xl font-semibold text-center">
                      <span className="text-primary-mint block text-sm sm:text-base mb-1">
                        Experience {currentIndex + 1} of {experiences.length}
                      </span>
                      {experience?.jobTitle}
                    </h4>
                    <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 my-3 sm:my-4">
                      {experience?.technologies.map((technology) => (
                        <div key={technology._id} className="relative group/tech">
                          <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-mint/50 to-primary-blue/50 rounded-full blur opacity-0 group-hover/tech:opacity-100 transition duration-300"></div>
                          <img
                            className="relative w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full bg-primary-dark p-1 transition-transform duration-300 group-hover/tech:scale-110"
                            src={urlFor(technology.image).url() || "/placeholder.svg"}
                            alt={technology.title}
                          />
                        </div>
                      ))}
                    </div>
                    {position === 0 && (
                      <>
                        <p className="text-base sm:text-lg text-center text-primary-mint/80 mb-3 sm:mb-4">{experience?.company}</p>
                        <div className="text-xs sm:text-sm md:text-base text-primary-mint/80 space-y-2 max-h-[150px] sm:max-h-[200px] overflow-y-auto scrollbar-thin scrollbar-track-primary-dark/20 scrollbar-thumb-primary-mint/50 pr-2">
                          {experience?.points.map((point, index) => (
                            <p key={index} className="text-center">{point}</p>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>  
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {experiences.length > 1 && (
          <button
            onClick={nextExperience}
            className="absolute right-2 sm:right-10 z-30 p-2 sm:p-3 rounded-full bg-primary-dark/80 text-primary-mint border border-primary-mint/20 backdrop-blur-sm transition-all duration-300 hover:bg-primary-mint hover:text-primary-dark disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={experiences.length <= 1}
          >
            <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6" />
          </button>
        )}
      </div>

      {experiences.length > 1 && (
        <div className="absolute bottom-10 flex space-x-2">
          {experiences.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1)
                setCurrentIndex(index)
              }}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                index === currentIndex ? "bg-primary-mint w-4 sm:w-6" : "bg-primary-mint/30 hover:bg-primary-mint/50"
              }`}
            />
          ))}
        </div>
      )}
    </motion.div>
  )
}

export default Experience