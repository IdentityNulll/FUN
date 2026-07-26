import { motion } from 'framer-motion';
import { HiMiniSpeakerWave, HiMiniSpeakerXMark } from 'react-icons/hi2';
import { useAudio } from '../../context/AudioProvider';

/** Fixed mute/unmute control, always available once the dive begins. */
export function MuteButton() {
  const { muted, toggleMute } = useAudio();
  return (
    <motion.button
      onClick={toggleMute}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label={muted ? 'Unmute' : 'Mute'}
      className="glass fixed right-5 top-5 z-50 flex h-11 w-11 items-center justify-center rounded-full text-glow-cyan"
    >
      {muted ? (
        <HiMiniSpeakerXMark size={20} />
      ) : (
        <HiMiniSpeakerWave size={20} />
      )}
    </motion.button>
  );
}
