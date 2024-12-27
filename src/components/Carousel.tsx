import { useRef, useState } from "react";
import Image from "next/image";
import styles from "../styles/Carousel.module.css";

// map index to link
const indexToPage = ["time", ""];

const Carousel = ({ totalSlides = 4 }: { totalSlides: number }) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const handleControlHover = (index: number) => {
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
                transform: `rotate(${adjustedAngle}deg) translateY(-50vh) rotate(${
                  isActive ? -adjustedAngle : 0
                }deg)`,
                transformOrigin: "center center",
              }}
            >
              <Image
                // src={`/images/carousel-img/${i + 1}.png`}
                src={`/images/placeholder.png`}
                alt={`Slide ${i + 1}`}
                layout="intrinsic"
                width={isActive ? 350 : 50}
                height={isActive ? 350 : 50}
                style={{
                  width: isActive ? "35vh" : "5vh",
                  height: isActive ? "35vh" : "5vh",
                  transition: "all 1.5s",
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
            href={`/${indexToPage[i]}`}
            onMouseOver={() => handleControlHover(i)}
            className={`${i === activeSlide ? styles.active : ""}`}
          >
            <Image
              // src={`/images/control-img/${i + 1}.png`}
              src={`/images/placeholder.png`}
              alt={`Control ${i + 1}`}
              width={20}
              height={20}
            />
          </a>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
