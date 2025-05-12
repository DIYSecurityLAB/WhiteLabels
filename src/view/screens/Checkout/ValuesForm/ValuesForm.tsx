import { useWhiteLabel } from '@/context/WhiteLabelContext';
import { useEffect, useState } from 'react';
import { FaQuestionCircle } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Btc from '../../../assets/bitcoin.svg';
import Brl from '../../../assets/brl.svg';
import DepixIcon from '../../../assets/depix-logo.png';
import Mao from '../../../assets/SITE_MAO_ALFRED.png';
import Usdt from '../../../assets/usdt.svg';
import { useValuesForm } from './useValuesForm';

interface ValuesFormProps {
  transactionType: 'buy' | 'sell';
  toggleTransactionType: () => void;
}

export function ValuesForm({
  transactionType,
  toggleTransactionType,
}: ValuesFormProps) {
  const { t, form, handleFiatChange, toggleFiatType, toggleCryptoType } =
    useValuesForm();
  const [hasShownToast, setHasShownToast] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const { config } = useWhiteLabel();

  // Controle dos valores do formulário
  const fiatAmount = form.watch('fiatAmount');
  const fiatType = form.watch('fiatType');
  const cryptoAmount = form.watch('cryptoAmount');
  const cryptoType = form.watch('cryptoType');

  // Salva automaticamente no localStorage
  useEffect(() => {
    localStorage.setItem('fiatAmount', fiatAmount);
    localStorage.setItem('fiatType', fiatType);
    localStorage.setItem('cryptoAmount', cryptoAmount);
    localStorage.setItem('cryptoType', cryptoType);
  }, [fiatAmount, fiatType, cryptoAmount, cryptoType]);

  useEffect(() => {
    if (!hasShownToast) {
      toast.info('A primeira compra tem um limite de R$ 500');
      setHasShownToast(true);
    }
  }, [hasShownToast]);

  const toggleTooltip = () => {
    setShowTooltip((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const tooltip = document.getElementById('tooltip-container');
      const icon = document.getElementById('question-icon');
      if (
        tooltip &&
        !tooltip.contains(event.target as Node) &&
        icon &&
        !icon.contains(event.target as Node)
      ) {
        setShowTooltip(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Estado que controla qual ícone de mão está ativo (0, 1 ou 2)
  // Após mostrar os 3 (cada um por 2 segundos), ele é removido (null)
  const [activeMao, setActiveMao] = useState<number | null>(0);
  useEffect(() => {
    let counter = 0;
    const timer = setInterval(() => {
      counter++;
      if (counter > 2) {
        setActiveMao(null);
        clearInterval(timer);
      } else {
        setActiveMao(counter);
      }
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full">
      <div className="space-y-1">
        {/* Seção Fiat */}
        <div className="w-full flex justify-center items-center brl-step">
          <div className="relative w-full">
            <input
              {...form.register('fiatAmount', { required: true })}
              onChange={handleFiatChange}
              placeholder={
                fiatType === 'BRL'
                  ? t('checkout.brl_placeholder')
                  : t('checkout.usd_placeholder')
              }
              className="border-2 px-16 py-3 rounded-3xl text-base sm:text-lg text-brand-text placeholder-brand-text text-center w-full"
              style={{ backgroundColor: config.colors.secondary }}
            />
            <button
              type="button"
              onClick={toggleFiatType}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-brand-text"
            >
              <img
                src={fiatType === 'BRL' ? Brl : Usdt}
                alt={
                  fiatType === 'BRL'
                    ? t('checkout.brl_label')
                    : t('checkout.usd_label')
                }
                className="w-6 h-6 sm:w-10 sm:h-10"
              />
              {/* Exibe a mão na seção Fiat se activeMao for 0 */}
              {activeMao === 0 && (
                <img
                  src={Mao}
                  alt="Mão"
                  className="w-6 animate-fadeInPop transition-transform duration-500 hover:scale-110"
                />
              )}
            </button>
          </div>
        </div>

        <div className="w-full flex justify-center items-center pt-4">
          <div className="relative w-full">
            <button
              type="button"
              onClick={toggleTransactionType}
              className={`absolute left-2 top-1/2 -translate-y-1/2 text-brand-text px-4 py-2 rounded-full text-sm`}
              style={{
                backgroundColor:
                  transactionType === 'buy'
                    ? config.colors.success
                    : config.colors.error,
              }}
            >
              {transactionType === 'buy'
                ? t('checkout.buy')
                : t('checkout.sell')}
              {activeMao === 2 && (
                <img
                  src={Mao}
                  alt="Mão"
                  className="absolute bottom-0 right-0 w-6 animate-fadeInPop transition-transform duration-500 hover:scale-110"
                />
              )}
            </button>

            <input
              {...form.register('cryptoAmount', { required: true })}
              readOnly
              placeholder={
                cryptoType === 'BITCOIN'
                  ? t('checkout.btc_placeholder')
                  : cryptoType === 'DEPIX'
                    ? t('checkout.depix_placeholder')
                    : t('checkout.usdt_placeholder')
              }
              className="border-2 px-16 py-3 rounded-3xl text-base sm:text-lg text-brand-text placeholder-brand-text text-center w-full"
              style={{ backgroundColor: config.colors.secondary }}
            />
            <button
              type="button"
              onClick={toggleCryptoType}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-brand-text"
            >
              <img
                src={
                  cryptoType === 'BITCOIN'
                    ? Btc
                    : cryptoType === 'DEPIX'
                      ? DepixIcon
                      : Usdt
                }
                alt={
                  cryptoType === 'BITCOIN'
                    ? t('checkout.btc_label')
                    : cryptoType === 'DEPIX'
                      ? t('checkout.depix_label')
                      : t('checkout.usdt_label')
                }
                className="w-6 h-6 sm:w-10 sm:h-10"
              />
              {/* Exibe a mão dentro do botão da Cripto se activeMao for 2 */}
              {activeMao === 1 && (
                <img
                  src={Mao}
                  alt="Mão"
                  className="w-6 animate-fadeInPop transition-transform duration-500 hover:scale-110"
                />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Tooltip */}
      <div className="absolute top-[-2rem] left-2">
        <div className="relative">
          <FaQuestionCircle
            id="question-icon"
            className="cursor-pointer"
            size={24}
            onClick={toggleTooltip}
            style={{ color: config.colors.text }}
          />
          {showTooltip && (
            <div
              id="tooltip-container"
              className="absolute z-20 w-72 p-4 text-brand-text text-sm rounded shadow-lg left-full top-full ml-2 mt-2"
              style={{ backgroundColor: config.colors.backgroundSecondary }}
            >
              <p>
                <strong>{t('checkout.tooltip_btc.title')}</strong>
              </p>
              <p>{t('checkout.tooltip_btc.minimum_value')}</p>
              <br />
              <p>
                <strong>{t('checkout.tooltip_usdt.title')}</strong>
              </p>
              <p>{t('checkout.tooltip_usdt.minimum_value')}</p>
              <hr className="my-2 border-gray-500" />
              <p>{t('checkout.tooltip_usdt.maximum_value')}</p>
              <hr className="my-2 border-gray-500" />
              <p>{t('checkout.tooltip_btc.pix_limit')}</p>
              <hr className="my-2 border-gray-500" />
              <p>
                <strong>{t('checkout.tooltip_attention.title')}</strong>
              </p>
              <p>{t('checkout.tooltip_attention.message')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
