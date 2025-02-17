"use client"

import { motion, AnimatePresence } from "framer-motion"
import type React from "react"
import { useRef, useState } from "react"
import ExperienceCard from "./ExperienceCard"
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
      className="h-screen relative flex overflow-hidden flex-col text-left md:flex-row max-w-full justify-evenly mx-auto items-center z-0"
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

      <h3 className="absolute top-36 uppercase tracking-[20px] text-primary-mint text-2xl font-bold">Experience</h3>

      <div className="relative w-full flex justify-center items-center">
        {experiences.length > 1 && (
          <button
            onClick={prevExperience}
            className="absolute left-10 z-30 p-3 rounded-full bg-primary-dark/80 text-primary-mint border border-primary-mint/20 backdrop-blur-sm transition-all duration-300 hover:bg-primary-mint hover:text-primary-dark disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={experiences.length <= 1}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        <div className="relative w-full max-w-7xl h-[600px] flex items-center justify-center">
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
                  x: `${position * 110}%`,
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
                className={`absolute w-full max-w-2xl ${position === 0 ? "z-20" : "z-10"}`}
              >
                <div className={`glass-card p-8 rounded-xl mx-4 ${position === 0 ? "ring-2 ring-primary-mint/20" : ""}`}>
                  <motion.img
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1.2 }}
                    className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 object-contain mx-auto rounded-full"
                    src={urlFor(experience?.companyImage).url()}
                    alt={experience?.company}
                  />
                  <h4 className="text-2xl md:text-4xl font-semibold text-center my-4">
                    <span className="text-primary-mint">
                      Experience {currentIndex + 1} of {experiences.length}:
                    </span>{" "}
                    {experience?.jobTitle}
                  </h4>
                  <div className="flex items-center space-x-4 justify-center my-4">
                    {experience?.technologies.map((technology) => (
                      <div key={technology._id} className="relative group/tech">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-mint/50 to-primary-blue/50 rounded-full blur opacity-0 group-hover/tech:opacity-100 transition duration-300"></div>
                        <img
                          className="relative w-10 h-10 rounded-full bg-primary-dark p-1 transition-transform duration-300 group-hover/tech:scale-110"
                          src={urlFor(technology.image).url() || "/placeholder.svg"}
                          alt={technology.title}
                        />
                      </div>
                    ))}
                  </div>
                  {position === 0 && (
                    <>
                      <p className="text-lg text-center text-primary-mint/80 mb-4">{experience?.company}</p>
                      <div className="text-sm sm:text-base text-primary-mint/80 space-y-2">
                        {experience?.points.map((point, index) => (
                          <p key={index} className="text-center">{point}</p>
                        ))}
                      </div>
                    </>
                  )}
                </div>  
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {experiences.length > 1 && (
          <button
            onClick={nextExperience}
            className="absolute right-10 z-30 p-3 rounded-full bg-primary-dark/80 text-primary-mint border border-primary-mint/20 backdrop-blur-sm transition-all duration-300 hover:bg-primary-mint hover:text-primary-dark disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={experiences.length <= 1}
          >
            <ChevronRight className="w-6 h-6" />
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
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex ? "bg-primary-mint w-6" : "bg-primary-mint/30 hover:bg-primary-mint/50"
              }`}
            />
          ))}
        </div>
      )}
    </motion.div>
  )
}

export default Experience