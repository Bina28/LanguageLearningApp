import { motion } from "framer-motion";
import { Link, useOutletContext } from "react-router-dom";
import "./Home.css";
import { useAccount } from "../../lib/hooks/useAccount";
import heroImg from "../Assets/hero.jpg";

export default function Home() {
  const { currentUser } = useAccount();
  const { setModal } = useOutletContext<{
    setModal: (v: "login" | "signup" | null) => void;
  }>();

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
          <motion.div
            className="hero-action"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Link to="/courses" className="btn btn-courses">
              Continue Learning
            </Link>
            <Link to={`/profiles/${currentUser.id}`} className="btn btn-profile">
              My Profile
            </Link>
          </motion.div>
        ) : (
          <motion.div
            className="hero-cta"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <button className="btn btn-login" onClick={() => setModal("login")}>
              Get Started
            </button>
          </motion.div>
        )}
      </div>

      <div className="hero-img">
        <img src={heroImg} alt="Animated image of girl studing" />
      </div>
    </section>
  );
}
