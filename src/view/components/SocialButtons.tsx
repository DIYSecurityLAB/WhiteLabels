import { useWhiteLabel } from '@/context/WhiteLabelContext';
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTelegram,
  FaWhatsapp,
} from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

function SocialButtons() {
  const { config } = useWhiteLabel();

  // Array dos botões sociais para facilitar renderização condicional
  const socialButtons = [
    {
      url: config.socialMedia.instagram,
      icon: <FaInstagram />,
      title: 'Instagram',
      className: 'text-pink-500 hover:text-pink-600',
    },
    {
      url: config.socialMedia.twitter,
      icon: <FaXTwitter />,
      title: 'X (Twitter)',
      className: 'text-white hover:text-gray-400',
    },
    {
      url: config.socialMedia.facebook,
      icon: <FaFacebook />,
      title: 'Facebook',
      className: 'text-blue-500 hover:text-blue-600',
    },
    {
      url: config.socialMedia.telegram,
      icon: <FaTelegram />,
      title: 'Telegram',
      className: 'text-blue-400 hover:text-blue-500',
    },
    {
      url: config.socialMedia.linkedin,
      icon: <FaLinkedin />,
      title: 'LinkedIn',
      className: 'text-blue-600 hover:text-blue-700',
    },
    {
      url: `https://api.whatsapp.com/send?phone=${config.supportWhatsapp}&text=Ol%C3%A1,%20Tudo%20bem?%0A%0APreciso%20de%20ajuda%20sobre%20os%20produtos...`,
      icon: <FaWhatsapp />,
      title: 'WhatsApp',
      className: 'text-green-500 hover:text-green-600',
    },
  ].filter((button) => button.url && button.url.trim() !== '');

  if (socialButtons.length === 0) return null;

  return (
    <>
      {/* Exibição normal para telas grandes */}
      <div className="hidden lg:flex flex-col fixed bottom-8 right-5 gap-1">
        {socialButtons.map((button, index) => (
          <button
            key={index}
            onClick={() => window.open(button.url, '_blank')}
            title={button.title}
            className={`rounded-full p-4 text-3xl cursor-pointer ${button.className}`}
          >
            {button.icon}
          </button>
        ))}
      </div>

      {/* Centralizado para telas menores */}
      <div className="flex lg:hidden justify-center gap-4 mt-8">
        {socialButtons.map((button, index) => (
          <button
            key={index}
            onClick={() => window.open(button.url, '_blank')}
            title={button.title}
            className={`rounded-full p-4 text-3xl cursor-pointer ${button.className}`}
          >
            {button.icon}
          </button>
        ))}
      </div>
    </>
  );
}

export default SocialButtons;
