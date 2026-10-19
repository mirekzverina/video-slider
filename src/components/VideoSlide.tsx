import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import type { Slide } from '../data/slides';

interface VideoSlideProps {
    slide: Slide;
    active: boolean;
    onEnded: () => void;
    onProgress: (progress: number) => void;
    paused: boolean;
}

export default function VideoSlide({
    slide,
    active,
    onEnded,
    onProgress,
    paused,
}: VideoSlideProps) {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        if (!active) {
            video.pause();
            return;
        }

        video.currentTime = 0;
        onProgress(0);
    }, [active, onProgress]);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        if (active && !paused) {
            void video.play().catch(() => {});
        } else {
            video.pause();
        }
    }, [active, paused]);

    const handleTimeUpdate = () => {
        const video = videoRef.current;

        if (!video || !active || !video.duration) return;

        onProgress(video.currentTime / video.duration);
    };

    return (
        <div className={`video-slide ${active ? 'is-active' : ''}`}>
            <video
                ref={videoRef}
                className="video-slide__video"
                src={slide.video}
                muted
                playsInline
                preload={active ? 'auto' : 'metadata'}
                onTimeUpdate={handleTimeUpdate}
                onEnded={onEnded}
            />

            <div className="video-slide__overlay" />

            <div className="video-slide__content">
                <motion.span
                    className="video-slide__label"
                    initial={false}
                    animate={{
                        opacity: active ? 1 : 0,
                        y: active ? 0 : 20,
                    }}
                    transition={{ duration: 0.65, delay: active ? 0.25 : 0 }}
                >
                    {slide.label}
                </motion.span>

                <motion.h1
                    className="video-slide__title"
                    initial={false}
                    animate={{
                        opacity: active ? 1 : 0,
                        y: active ? 0 : 55,
                        filter: active ? 'blur(0px)' : 'blur(8px)',
                    }}
                    transition={{
                        duration: 1,
                        delay: active ? 0.35 : 0,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                >
                    {slide.title}
                </motion.h1>
            </div>
        </div>
    );
}
