import type { Slide } from '../data/slides';

interface SlideNavigationProps {
    slides: Slide[];
    activeIndex: number;
    progress: number;
    onSelect: (index: number) => void;
}

export default function SlideNavigation({
    slides,
    activeIndex,
    progress,
    onSelect,
}: SlideNavigationProps) {
    return (
        <nav className="slide-navigation" aria-label="Video scenes">
            {slides.map((slide, index) => {
                const fill =
                    index < activeIndex
                        ? 100
                        : index === activeIndex
                          ? progress * 100
                          : 0;

                return (
                    <button
                        key={slide.id}
                        type="button"
                        className={`slide-navigation__item ${
                            index === activeIndex ? 'is-active' : ''
                        }`}
                        onClick={() => onSelect(index)}
                        aria-label={`Show ${slide.label}`}
                        aria-current={
                            index === activeIndex ? 'step' : undefined
                        }
                    >
                        <span className="slide-navigation__top">
                            <span>{String(slide.id).padStart(2, '0')}</span>
                            <span>{slide.label}</span>
                        </span>

                        <span className="slide-navigation__track">
                            <span
                                className="slide-navigation__fill"
                                style={{ width: `${fill}%` }}
                            />
                        </span>
                    </button>
                );
            })}
        </nav>
    );
}
