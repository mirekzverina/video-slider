import { Pause, Play } from 'lucide-react';

interface VideoControlsProps {
    paused: boolean;
    onToggle: () => void;
}

export default function VideoControls({
    paused,
    onToggle,
}: VideoControlsProps) {
    return (
        <button
            className="video-controls"
            type="button"
            onClick={onToggle}
            aria-label={paused ? 'Play video' : 'Pause video'}
        >
            {paused ? <Play size={17} /> : <Pause size={17} />}
            <span>{paused ? 'PLAY' : 'PAUSE'}</span>
        </button>
    );
}
