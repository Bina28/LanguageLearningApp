import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./Home.css";
import { useAccount } from "../../lib/hooks/useAccount";
import heroImg from "../Assets/hero.png";

export default function Home() {
  const { currentUser } = useAccount();
  return (
    <section className="hero-section">
      <div className="hero-content">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Start Your Language Journey Today!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Build your vocabulary, practice every day, and make real progress with
          simple, fun, and interactive flashcards.
        </motion.p>

        {currentUser ? (
          <div className="hero-action">
            <Link to="/courses" className="btn btn-courses">
              Continue Learning
            </Link>
            <Link to="/account/user-info" className="btn btn-profile">
              My Profile
            </Link>
          </div>
        ) : (
          <div className="hero-cta">
            <Link to="/login" className="btn btn-login">
              Get Started
            </Link>
          </div>
        )}
      </div>

      <div className="hero-img">
        <img src={heroImg} alt="Animated image of girl studing" />
      </div>
    </section>
  );
}
