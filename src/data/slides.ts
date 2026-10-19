export interface Slide {
    id: number;
    label: string;
    title: string;
    video: string;
}

export const slides: Slide[] = [
    {
        id: 1,
        label: 'THE EXPERIENCE',
        title: 'BEYOND THE LIMITS.',
        video: '/videos/experience.mp4',
    },
    {
        id: 2,
        label: 'THE JOURNEY',
        title: 'CHASE THE UNSEEN.',
        video: '/videos/journey.mp4',
    },
    {
        id: 3,
        label: 'THE MACHINE',
        title: 'POWER IN ITS PUREST FORM.',
        video: '/videos/machine.mp4',
    },
    {
        id: 4,
        label: 'THE FEELING',
        title: 'DRIVEN BY INSTINCT.',
        video: '/videos/feeling.mp4',
    },
];
