import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import '../../index.css'; // 👈 import external CSS

const WhyChooseUs = () => {
  // Fade-in animation hook
  const useFadeIn = () => {
    const [ref, inView] = useInView({
      triggerOnce: true,
      threshold: 0.1,
    });

    return {
      ref,
      className: inView ? 'fade-in-visible' : 'fade-in-hidden',
    };
  };

  // Counter animation hook
  const useCounter = (end, duration = 2000) => {
    const [count, setCount] = useState(0);
    const [ref, inView] = useInView({ triggerOnce: true });

    useEffect(() => {
      if (inView) {
        let start = 0;
        const increment = end / (duration / 16);
        const timer = setInterval(() => {
          start += increment;
          if (start >= end) {
            setCount(end);
            clearInterval(timer);
          } else {
            setCount(Math.ceil(start));
          }
        }, 16);
        return () => clearInterval(timer);
      }
    }, [inView, end, duration]);

    return { ref, count };
  };

  // Counter display
  const AnimatedCounter = ({ end, suffix = "", duration = 2000 }) => {
    const { ref, count } = useCounter(end, duration);
    return (
      <div ref={ref} className="counter-number">
        {count}{suffix}
      </div>
    );
  };

  const headingAnimation = useFadeIn();
  const textAnimation = useFadeIn();
  const linkAnimation = useFadeIn();
  const stat1Animation = useFadeIn();
  const stat2Animation = useFadeIn();
  const stat3Animation = useFadeIn();
  const stat4Animation = useFadeIn();

  return (
    <div className="whychooseus-container">
      <div className="content-wrapper">

        {/* Heading */}
        <div className="heading-section">
          <h1 {...headingAnimation} className="main-heading">
            WHY CHOOSE UMAIR ABAYA
          </h1>

          {/* Description */}
          <div {...textAnimation} className="description-section">
            <p className="description-text">
              Experience the difference in quality, service, and values.
            </p>
            <p className="description-text">
              We're committed to delivering excellence in every detail, from the products we offer to the care we provide. With a foundation built on trust and integrity, we aim to exceed your expectations at every step.
            </p>
          </div>

          {/* More About */}
          <div {...linkAnimation} className="link-section">
            <a href="#" className="more-link more-link-hover">
              More About <span className="arrow">→</span>
            </a>
          </div>

          <div className="divider"></div>
        </div>

        {/* Stats */}
        <div className="stats-grid">
          <div {...stat1Animation} className="stat-card stat-card-hover">
            <AnimatedCounter end={10} />
            <p className="stat-text">Years of Experience in Modest Fashion</p>
          </div>

          <div {...stat2Animation} className="stat-card stat-card-hover">
            <AnimatedCounter end={5000} suffix="+" />
            <p className="stat-text">Happy Customers Around the World</p>
          </div>

          <div {...stat3Animation} className="stat-card stat-card-hover">
            <AnimatedCounter end={100} suffix="%" />
            <p className="stat-text">Premium Quality & Ethical Fabric</p>
          </div>

          <div {...stat4Animation} className="stat-card stat-card-hover">
            <AnimatedCounter end={200} suffix="+" />
            <p className="stat-text">Exclusive High & Abaya Designs</p>
          </div>
        </div>

        {/* Floating Background */}
        <div className="floating-elements">
          <div className="floating-circle circle1"></div>
          <div className="floating-circle circle2"></div>
          <div className="floating-circle circle3"></div>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;