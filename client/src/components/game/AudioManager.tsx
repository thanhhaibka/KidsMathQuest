import { useEffect } from "react";
import { useAudio } from "@/lib/stores/useAudio";
import { Howl } from "howler";

const AudioManager = () => {
  const { 
    setBackgroundMusic, 
    setHitSound, 
    setSuccessSound, 
    isMuted, 
    toggleMute 
  } = useAudio();

  useEffect(() => {
    // Create background music
    const bgMusic = new Howl({
      src: ['/sounds/background.mp3'],
      loop: true,
      volume: 0.3,
      autoplay: false
    });

    // Create hit sound
    const hitSound = new Howl({
      src: ['/sounds/hit.mp3'],
      volume: 0.5,
      autoplay: false
    });

    // Create success sound
    const successSound = new Howl({
      src: ['/sounds/success.mp3'],
      volume: 0.5,
      autoplay: false
    });

    // Set the sounds in the store
    setBackgroundMusic(bgMusic);
    setHitSound(hitSound);
    setSuccessSound(successSound);

    // Start playing background music
    if (!isMuted) {
      bgMusic.play();
    }

    // Cleanup on unmount
    return () => {
      bgMusic.stop();
      hitSound.stop();
      successSound.stop();
    };
  }, [setBackgroundMusic, setHitSound, setSuccessSound, isMuted]);

  // Toggle mute button - positioned absolute in bottom left corner
  return (
    <button
      className="fixed bottom-4 left-4 z-50 p-3 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
      onClick={toggleMute}
      aria-label={isMuted ? "Unmute" : "Mute"}
    >
      {isMuted ? (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clipRule="evenodd" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
        </svg>
      )}
    </button>
  );
};

export default AudioManager;
