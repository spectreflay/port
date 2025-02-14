import { motion } from "framer-motion"
import Skill from "./Skill"
import type { Skill as SkillType } from "../typings"

type Props = {
  skills: SkillType[]
}

function Skills({ skills }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="h-screen flex relative flex-col text-center md:text-left xl:flex-row max-w-[2000px] xl:px-10 min-h-screen justify-center xl:space-y-0 mx-auto items-center"
    >
      {/* Background Shapes */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <svg className="absolute w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="skills-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(139, 232, 203, 0.1)" />
              <stop offset="100%" stopColor="rgba(126, 162, 170, 0.1)" />
            </linearGradient>
          </defs>

          {/* Top-right shape */}
          <motion.path
            d="M100,0 Q80,0 80,20 Q100,20 100,0 Z"
            fill="url(#skills-gradient)"
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
            fill="url(#skills-gradient)"
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
            fill="url(#skills-gradient)"
            animate={{
              r: [8, 12, 8],
              cx: [50, 48, 50],
              cy: [50, 52, 50],
            }}
            transition={{ repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", duration: 8, ease: "easeInOut" }}
          />
        </svg>
      </div>

      <h3 className="absolute top-24 uppercase tracking-[20px] text-primary-mint text-2xl font-bold">Skills</h3>
      <h3 className="absolute top-36 uppercase tracking-[3px] text-primary-mint/70 text-sm">
        Hover over a skill for current proficiency
      </h3>

      <div className="grid grid-cols-4 gap-5 mt-32">
        {skills?.map((skill, index) => (
          <Skill key={skill._id} skill={skill} directionLeft={index < skills.length / 2} />
        ))}
      </div>
    </motion.div>
  )
}

export default Skills

