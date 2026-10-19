import { useEffect, useRef, useState } from 'react';
import { SiReact, SiTypescript, SiSass, SiFramer } from 'react-icons/si';

const technologies = [
    {
        name: 'React',
        icon: SiReact,
        className: 'react',
    },
    {
        name: 'TypeScript',
        icon: SiTypescript,
        className: 'typescript',
    },
    {
        name: 'SCSS',
        icon: SiSass,
        className: 'scss',
    },
    {
        name: 'Motion',
        icon: SiFramer,
        className: 'motion',
    },
];

export default function TechStack() {
    const [isOpen, setIsOpen] = useState(false);
    const techStackRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isOpen) return;

        const handlePointerDown = (event: PointerEvent) => {
            if (
                techStackRef.current &&
                !techStackRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setIsOpen(false);
            }
        };

        document.addEventListener('pointerdown', handlePointerDown);
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('pointerdown', handlePointerDown);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen]);

    const handlePointerEnter = (event: React.PointerEvent<HTMLDivElement>) => {
        if (event.pointerType === 'mouse') {
            setIsOpen(true);
        }
    };

    const handlePointerLeave = (event: React.PointerEvent<HTMLDivElement>) => {
        if (event.pointerType === 'mouse') {
            setIsOpen(false);
        }
    };

    return (
        <div
            ref={techStackRef}
            className={`tech-stack${isOpen ? ' tech-stack--open' : ''}`}
            onPointerEnter={handlePointerEnter}
            onPointerLeave={handlePointerLeave}
        >
            <button
                type="button"
                className="tech-stack__trigger"
                aria-expanded={isOpen}
                aria-controls="tech-stack-panel"
                onClick={() => setIsOpen((current) => !current)}
            >
                <span className="tech-stack__dot" />
                Built With
            </button>

            <div
                className="tech-stack__panel"
                id="tech-stack-panel"
                aria-hidden={!isOpen}
            >
                {technologies.map((technology) => {
                    const Icon = technology.icon;

                    return (
                        <div
                            className={`tech-stack__technology tech-stack__technology--${technology.className}`}
                            key={technology.name}
                        >
                            <Icon aria-hidden="true" />
                            <span>{technology.name}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
