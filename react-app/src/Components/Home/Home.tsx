import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
  return (
    <div className="home-container">
      <motion.h1 
        initial={{ opacity: 0, y: -50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 1 }}
      >
        Welcome to Language Learner!
      </motion.h1>

      <motion.p 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ delay: 0.5, duration: 1 }}
      >
        Improve your vocabulary and master new languages with interactive flashcards.
      </motion.p>

      <motion.div 
        className="buttons-container"
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ delay: 1, duration: 1 }}
      >
        <Link to="/courses" className="btn">Explore Courses</Link>
        <Link to="/signup" className="btn btn-alt">Sign Up</Link>
      </motion.div>
    </div>
  );
}
