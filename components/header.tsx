import { SocialIcon } from "react-social-icons";
import { motion } from "framer-motion";
import Link from "next/link";
import { Social } from "../typings";

type Props = {
  socials: Social[];
};

export default function Header({ socials }: Props) {
  return (
    <header className="sticky top-0 p-5 z-20">
      <div className="glass-card rounded-2xl max-w-7xl mx-auto flex items-start justify-between xl:items-center p-5">
        <motion.div
          initial={{
            x: -500,
            opacity: 0,
            scale: 0.5,
          }}
          animate={{
            x: 0,
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 0.9,
          }}
          className="flex flex-row items-center space-x-2"
        >
          {socials.map((social) => (
            <SocialIcon
              key={social._id}
              url={social.url}
              fgColor="#8BE8CB"
              bgColor="transparent"
              className="hover:scale-110 transition-transform"
            />
          ))}
        </motion.div>

        <Link href="#contact">
          <motion.div
            initial={{
              x: 500,
              opacity: 0,
              scale: 0.5,
            }}
            animate={{
              x: 0,
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 0.9,
            }}
            className="flex flex-row items-center cursor-pointer group"
          >
            <SocialIcon
              network="email"
              fgColor="#8BE8CB"
              bgColor="transparent"
              className="cursor-pointer group-hover:scale-110 transition-transform"
            />
            <p className="uppercase hidden md:inline-flex text-sm text-primary-mint font-semibold tracking-wider group-hover:text-primary-mint/80 transition-colors">
              Get in Touch
            </p>
          </motion.div>
        </Link>
      </div>
    </header>
  );
}