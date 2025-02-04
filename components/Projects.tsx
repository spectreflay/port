import { motion } from "framer-motion";
import React from "react";
import { urlFor } from "../sanity";
import { Project } from "../typings";

type Props = {
  projects: Project[];
};

function Projects({ projects }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="h-screen relative flex overflow-hidden flex-col text-left md:flex-row max-w-full justify-evenly mx-auto items-center z-0"
    >
      <h3 className="absolute top-24 uppercase tracking-[20px] text-violet-400 text-2xl">
        Projects
      </h3>

      <div className="relative w-full flex overflow-x-scroll overflow-y-hidden snap-x snap-mandatory z-20 scrollbar scrollbar-track-violet-900/20 scrollbar-thumb-violet-500/80 scrollbar-thumb-rounded-full">
        {projects.map((project, i) => (
          <div
            key={project._id}
            className="w-screen flex-shrink-0 snap-center flex flex-col space-y-5 items-center justify-center p-20 md:p-44 h-screen"
          >
            <motion.img
              initial={{ y: -300, opacity: 0 }}
              transition={{ duration: 1.2 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 object-contain"
              src={urlFor(project?.image).url()}
              alt=""
            />
            <div className="glass-card p-8 rounded-xl max-w-6xl">
              <h4 className="text-2xl md:text-4xl font-semibold text-center mb-4">
                <span className="text-violet-400">
                  Project {i + 1} of {projects.length}:
                </span>{" "}
                {project?.title}
              </h4>
              <div className="flex items-center space-x-4 justify-center my-4">
                {project?.technologies.map((technology) => (
                  <img
                    className="h-10 w-10 rounded-full bg-white/10 p-1 hover:bg-white/20 transition-all"
                    key={technology._id}
                    src={urlFor(technology.image).url()}
                  />
                ))}
              </div>
              <p className="text-sm sm:text-base md:text-lg text-center text-violet-200">
                {project?.summary}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="w-full absolute top-[30%] bg-violet-900/10 left-0 h-[500px] -skew-y-12" />
    </motion.div>
  );
}

export default Projects;