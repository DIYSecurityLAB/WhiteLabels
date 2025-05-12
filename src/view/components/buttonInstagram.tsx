import { useWhiteLabel } from '@/context/WhiteLabelContext';
import { FaInstagram } from 'react-icons/fa';

function InstagramButton() {
  const { config } = useWhiteLabel();

  return (
    <button
      onClick={() => window.open(config.socialMedia.instagram, '_blank')}
      title="Instagram Button"
      className="fixed bottom-8 right-20 text-pink-500 rounded-full p-4 text-3xl cursor-pointer hover:text-pink-600"
    >
      <FaInstagram />
    </button>
  );
}

export default InstagramButton;
