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
        className="relative flex items-center justify-center rounded-xl border border-primary-mint/20 
                   bg-primary-dark/30 backdrop-blur-sm overflow-hidden p-4 transition-all duration-300
                   group-hover:border-primary-mint/50 group-hover:bg-primary-dark/50"
      >
        {/* Background Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary-mint/10 to-primary-blue/10 opacity-0 
                      group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Skill Image */}
        <div className="relative w-16 h-16 sm:w-20 sm:h-20 xl:w-24 xl:h-24 transition-transform duration-300 
                      group-hover:scale-110">
          <img
            src={urlFor(skill?.image).url() || "/placeholder.svg"}
            alt={skill.title}
            className="object-contain w-full h-full p-2 transition-all duration-300 
                     group-hover:p-1 rounded-xl"
          />
        </div>

        {/* Skill Info Overlay */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileHover={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 flex items-center justify-center bg-primary-dark/90 backdrop-blur-sm
                   opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <div className="text-center p-2">
            <p className="text-base sm:text-lg font-semibold text-primary-mint mb-1">
              {skill.title}
            </p>
            <div className="w-full bg-primary-mint/20 h-1.5 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.progress}%` }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="h-full bg-primary-mint rounded-full"
              />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default Skill