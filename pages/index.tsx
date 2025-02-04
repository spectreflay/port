import type { GetStaticProps } from "next";
import { Fragment } from "react";
import Header from "../components/header";
import Head from "next/head";
import Hero from "../components/hero";
import About from "../components/About";
import WorkExperience from "../components/Experience";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import ContactMe from "../components/ContactMe";
import Link from "next/link";
import { Experience, PageInfo, Project, Skill, Social } from "../typings";
import { fetchPageInfo } from "../utils/fetchPageInfo";
import { fetchExperience } from "../utils/fetchExperience";
import { fetchSkills } from "../utils/fetchSkills";
import { fetchSocial } from "../utils/fetchSocials";
import { fetchProject } from "../utils/fetchProjects";

type Props = {
  pageInfo: PageInfo;
  experiences: Experience[];
  skills: Skill[];
  socials: Social[];
  projects: Project[];
};

const Home = ({ pageInfo, experiences, skills, projects, socials }: Props) => {
  return (
    <div className="gradient-bg text-primary-mint h-screen snap-y snap-mandatory overflow-y-scroll overflow-x-hidden z-0 scrollbar scrollbar-track-primary-dark/20 scrollbar-thumb-primary-mint/50 hover:scrollbar-thumb-primary-mint/80 scrollbar-thumb-rounded-full">
      <Head>
        <title>
          {pageInfo?.name ? `${pageInfo.name} - Portfolio` : "Portfolio"}
        </title>
      </Head>
      <Header socials={socials} />

      <section id="hero" className="snap-start">
        <Hero pageInfo={pageInfo} />
      </section>

      <section id="about" className="snap-center">
        <About pageInfo={pageInfo} />
      </section>

      <section id="experience" className="snap-center">
        <WorkExperience experiences={experiences} />
      </section>

      <section id="skills" className="snap-start">
        <Skills skills={skills} />
      </section>

      <section id="projects" className="snap-start">
        <Projects projects={projects} />
      </section>

      <section id="contact" className="snap-start">
        <ContactMe />
      </section>

      <footer className="sticky bottom-5 w-full">
        <div className="flex items-center justify-center">
          <Link href="#hero">
            <div className="glass-card h-10 w-10 rounded-full cursor-pointer hover:scale-110 transition-all duration-300 flex items-center justify-center animate-float">
              <span className="text-primary-mint">↑</span>
            </div>
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default Home;

export const getStaticProps: GetStaticProps<Props> = async () => {
  const pageInfoArray = await fetchPageInfo();
  const experiences = await fetchExperience();
  const skills = await fetchSkills();
  const projects = await fetchProject();
  const socials = await fetchSocial();

  return {
    props: {
      pageInfo: Array.isArray(pageInfoArray) ? pageInfoArray[0] : pageInfoArray, // Ensure it's an object
      experiences,
      skills,
      projects,
      socials,
    },
    revalidate: 10,
  };
};
