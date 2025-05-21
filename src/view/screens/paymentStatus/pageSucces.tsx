import { useWhiteLabel } from '@/context/WhiteLabelContext';
import { Background } from '@/view/components/BackgroundAnimatedProduct';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FaWhatsapp } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import logoSucces from '../../assets/Check_Tela_Alfred.png';
import { ROUTES } from '../../routes/Routes';
import { useCurrentLang } from '../../utils/useCurrentLang';

export function PaymentAlfredSuccess() {
  const { t } = useTranslation();
  const { currentLang } = useCurrentLang();
  const navigate = useNavigate();
  const { config } = useWhiteLabel();

  const handleOnLink = (path: string, callback?: () => void) => {
    if (callback) {
      callback();
    }
    navigate(path);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col justify-center items-center px-6 text-center relative"
      style={{ color: config.colors.text }}
    >
      <Background />

      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5, type: 'spring' }}
      >
        <img src={logoSucces} alt="check" className="w-60" />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="text-3xl md:text-5xl font-bold drop-shadow-lg mb-4"
        style={{ color: config.colors.text }}
      >
        {t('paymentSuccess.title')}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="text-lg md:text-xl mb-8 max-w-xl"
        style={{ color: `${config.colors.text}cc` }}
      >
        {t('paymentSuccess.description')}{' '}
        <strong>{t('paymentSuccess.transactionTime')}</strong>
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="flex flex-col md:flex-row gap-4"
      >
        <button
          onClick={() => handleOnLink(ROUTES.buyBitcoin.call(currentLang))}
          className="w-[200px] h-[50px] rounded-[40px] border-[3px]"
          style={{
            backgroundColor: config.colors.primary,
            color: config.colors.text,
            borderColor: config.colors.text,
          }}
        >
          {t('paymentSuccess.redirectButton')}
        </button>
        <button
          onClick={() =>
            window.open(
              `https://api.whatsapp.com/send?phone=${config.supportWhatsapp.replace(/\+/, '')}&text=Meu%20pagamento%20no%20${encodeURIComponent(config.name)}%20foi%20conclu%C3%ADdo%20e%20tenho%20algumas%20d%C3%BAvidas.%20Poderia%20me%20ajudar%3F`,
              '_blank',
            )
          }
          className="w-[200px] h-[50px] rounded-[40px] flex items-center justify-center gap-2 border-[3px]"
          style={{
            backgroundColor: config.colors.background,
            color: '#00FC00',
            borderColor: '#00FC00',
          }}
        >
          {t('paymentSuccess.whatsapp')} <FaWhatsapp />
        </button>
      </motion.div>
    </motion.div>
  );
}
