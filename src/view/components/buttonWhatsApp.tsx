import { useWhiteLabel } from '@/context/WhiteLabelContext';
import { FaWhatsapp } from 'react-icons/fa';

function WhatsAppButton() {
  const { config } = useWhiteLabel();

  return (
    <button
      onClick={() =>
        window.open(
          `https://api.whatsapp.com/send?phone=${config.supportWhatsapp}&text=Ol%C3%A1,%20Tudo%20bem?%0A%0APreciso%20de%20ajuda%20sobre%20os%20produtos...`,
          '_blank',
        )
      }
      title="Whatsapp Button"
      className="fixed bottom-8 right-5 text-green-500 rounded-full p-4 text-3xl cursor-pointer hover:text-green-600"
    >
      <FaWhatsapp />
    </button>
  );
}

export default WhatsAppButton;
