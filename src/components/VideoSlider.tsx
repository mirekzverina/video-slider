import { useCallback, useEffect, useRef, useState } from 'react';
import { slides } from '../data/slides';
import VideoSlide from './VideoSlide';
import SlideNavigation from './SlideNavigation';
import VideoControls from './VideoControls';
import TechStack from './TechStack';

export default function VideoSlider() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const [paused, setPaused] = useState(false);

    const touchStart = useRef<{ x: number; y: number } | null>(null);

    const handleTouchStart = (event: React.TouchEvent<HTMLElement>) => {
        if (event.touches.length !== 1) return;

        touchStart.current = {
            x: event.touches[0].clientX,
            y: event.touches[0].clientY,
        };
    };

    const handleTouchEnd = (event: React.TouchEvent<HTMLElement>) => {
        const start = touchStart.current;
        touchStart.current = null;

        if (!start || event.changedTouches.length !== 1) return;

        const deltaX = event.changedTouches[0].clientX - start.x;
        const deltaY = event.changedTouches[0].clientY - start.y;

        // Minimálně 60 px horizontálně a výrazně více než vertikálně.
        if (Math.abs(deltaX) < 60) return;
        if (Math.abs(deltaX) < Math.abs(deltaY) * 1.5) return;

        if (deltaX < 0) {
            nextSlide();
        } else {
            previousSlide();
        }
    };

    const selectSlide = useCallback((index: number) => {
        setActiveIndex(index);
        setProgress(0);
    }, []);

    const nextSlide = useCallback(() => {
        setActiveIndex((current) => (current + 1) % slides.length);
        setProgress(0);
    }, []);

    const previousSlide = useCallback(() => {
        setActiveIndex(
            (current) => (current - 1 + slides.length) % slides.length,
        );
        setProgress(0);
    }, []);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'ArrowRight') nextSlide();
            if (event.key === 'ArrowLeft') previousSlide();

            if (event.code === 'Space' && event.target === document.body) {
                event.preventDefault();
                setPaused((current) => !current);
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [nextSlide, previousSlide]);

    return (
        <main
            className="video-slider"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onTouchCancel={() => {
                touchStart.current = null;
            }}
        >
            <TechStack />
            {slides.map((slide, index) => (
                <VideoSlide
                    key={slide.id}
                    slide={slide}
                    active={index === activeIndex}
                    paused={paused}
                    onProgress={setProgress}
                    onEnded={() => {
                        if (index === activeIndex) nextSlide();
                    }}
                />
            ))}

            <div className="video-slider__counter">
                {String(activeIndex + 1).padStart(2, '0')}
                <span> / </span>
                {String(slides.length).padStart(2, '0')}
            </div>

            <div className="video-slider__arrows">
                <button
                    type="button"
                    onClick={previousSlide}
                    aria-label="Previous slide"
                >
                    ←
                </button>

                <button
                    type="button"
                    onClick={nextSlide}
                    aria-label="Next slide"
                >
                    →
                </button>
            </div>

            <VideoControls
                paused={paused}
                onToggle={() => setPaused((current) => !current)}
            />

            <SlideNavigation
                slides={slides}
                activeIndex={activeIndex}
                progress={progress}
                onSelect={selectSlide}
            />
        </main>
    );
}
