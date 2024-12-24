import { useRef, useState } from "react";
import Image from "next/image"; // Import the Next.js Image component
import styles from "../styles/Carousel.module.css";

const Carousel = ({ totalSlides = 4 }: { totalSlides: number }) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const handleControlClick = (index: number) => {
    setActiveSlide(index);
  };

  return (
    <div className={styles.slideshow}>
      <div className={styles.carousel} ref={carouselRef}>
        {Array.from({ length: totalSlides }).map((_, i) => {
          const angle = (180 / (totalSlides - 1)) * i; // Evenly distribute slides
          const isActive = i === activeSlide;

          let adjustedAngle = 180;
          if (i !== activeSlide && i < activeSlide) {
            adjustedAngle = angle - 90;
          } else if (i !== activeSlide && i > activeSlide) {
            adjustedAngle = angle - 90 - 360;
          }

          return (
            <div
              key={i}
              className={`${styles.slide} ${isActive ? styles.active : ""}`}
              style={{
                transform: `rotate(${adjustedAngle}deg) translateY(-50vh) rotate(${isActive ? -adjustedAngle : 0}deg)`,
                transformOrigin: "center center",
              }}
            >
              <Image
                src={`/images/food-img-${i + 1}.png`}
                alt={`Slide ${i + 1}`}
                width={isActive ? 350 : 50} // Adjusted width for active and inactive slides
                height={isActive ? 350 : 50} // Adjusted height for active and inactive slides
                style={{
                  transition: "all 1s",
                }}
              />
            </div>
          );
        })}
      </div>
      <div className={styles.controls}>
        {Array.from({ length: totalSlides }).map((_, i) => (
          <a
            key={i}
            onClick={() => handleControlClick(i)}
            className={`${i === activeSlide ? styles.active : ""}`}
          >
            <Image
              src={`/images/control-img-${i + 1}.png`}
              alt={`Control ${i + 1}`}
              width={50}
              height={50}
            />
          </a>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
