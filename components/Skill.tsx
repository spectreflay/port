import { motion } from "framer-motion"
import { urlFor } from "../sanity"
import { Skill } from "../typings"

type Props = {
  skill: Skill
  directionLeft?: boolean
}

function Skill({ skill, directionLeft }: Props) {
  return (
    <div className="group relative flex cursor-pointer">
      <motion.div
        initial={{
          x: directionLeft ? -50 : 50,
          opacity: 0,
        }}
        transition={{ duration: 1 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="relative flex items-center justify-center rounded-full border-2 border-primary-mint/20 bg-primary-dark/30 backdrop-blur-sm overflow-hidden"
      >
        <img
          src={urlFor(skill?.image).url() || "/placeholder.svg"}
          alt={skill.title}
          className="object-cover w-16 h-16 md:w-24 md:h-24 xl:w-32 xl:h-32 rounded-full filter transition duration-300 ease-in-out group-hover:grayscale"
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileHover={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 flex items-center justify-center bg-primary-dark/80 backdrop-blur-sm"
        >
          <p className="text-lg md:text-xl font-semibold text-primary-mint text-center px-2">{skill.title}</p>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default Skill

