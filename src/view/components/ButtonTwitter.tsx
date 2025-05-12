import { useWhiteLabel } from '@/context/WhiteLabelContext';
import { FaXTwitter } from 'react-icons/fa6';

function TwitterButton() {
  const { config } = useWhiteLabel();

  return (
    <button
      onClick={() => window.open(config.socialMedia.twitter, '_blank')}
      title="X Button"
      className="fixed bottom-8 right-36 text-white rounded-full p-4 text-3xl cursor-pointer hover:text-gray-400"
    >
      <FaXTwitter />
    </button>
  );
}

export default TwitterButton;
