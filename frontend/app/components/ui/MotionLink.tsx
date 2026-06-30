import { motion } from "motion/react";
import { Link } from "react-router";

/** A React Router <Link> that accepts motion props (whileHover, etc.). */
export const MotionLink = motion.create(Link);
