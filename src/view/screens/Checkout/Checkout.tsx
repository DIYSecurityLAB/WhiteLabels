import { useWhiteLabel } from '@/context/WhiteLabelContext';
import SocialButtons from '@/view/components/SocialButtons';
import { useState } from 'react';
import { FormProvider } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useCheckout } from './useCheckout';
import { ValuesForm } from './ValuesForm/ValuesForm';

export default function Checkout() {
  const { t } = useTranslation();
  const { form, steps, isTransactionAllowed, ValidateValues } = useCheckout();
  const { config, getLogoByTheme } = useWhiteLabel();

  const [transactionType, setTransactionType] = useState<'buy' | 'sell'>('buy');
  const [isMaintenanceMode] = useState(false); // modo de manutenção

  const toggleTransactionType = () => {
    setTransactionType((prevType) => (prevType === 'buy' ? 'sell' : 'buy'));
  };

  const handleProceedClick = () => {
    if (transactionType === 'sell') {
      const checkoutData = form.getValues();
      const message = `Olá! Estou interessado em realizar uma venda de ${checkoutData.cryptoType}.
Valor em ${checkoutData.fiatType}: ${checkoutData.fiatAmount}
Quantidade de ${checkoutData.cryptoType}: ${checkoutData.cryptoAmount}`;
      const whatsappNumber = config.salesWhatsapp.replace(/\+/, '');
      const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
      window.open(whatsappLink, '_blank');
    } else {
      ValidateValues(form.getValues());
    }
  };

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center -mt-8 pt-20">
      {isMaintenanceMode && (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center bg-opacity-90 text-center p-6 z-10"
          style={{
            backgroundColor: config.colors.background,
            color: config.colors.text,
          }}
        >
          <h1
            className="text-4xl font-bold mb-4"
            style={{ color: config.colors.warning }}
          >
            🚧 {config.name} em Manutenção 🚧
          </h1>
          <p className="text-lg max-w-lg">
            Estamos realizando melhorias para oferecer um serviço ainda melhor.
            Voltaremos em algumas horas! Agradecemos sua paciência.
          </p>
          <p>
            Para qualquer dúvida, contate-nos no suporte, ou em nossas redes.
          </p>
        </div>
      )}

      <main className="flex flex-col justify-center items-center w-full max-w-screen-xl px-6 sm:px-12 md:px-20 lg:px-28 xl:px-36 py-16 mx-auto">
        <section className="w-full max-w-screen-lg flex flex-col lg:flex-row items-center justify-center mx-auto">
          <article className="w-full lg:w-3/5 flex flex-col items-center justify-center gap-y-6">
            <img
              src={getLogoByTheme('default', 'type')}
              alt={`${config.name} Logo`}
              className="w-64 sm:w-96"
            />

            <FormProvider {...form}>
              <form className="flex flex-col justify-center items-center w-full max-w-2xl space-y-4">
                {!isTransactionAllowed && (
                  <span
                    className="text-center font-bold pb-2"
                    style={{ color: config.colors.error }}
                  >
                    {t('checkout.transaction_error')}
                  </span>
                )}

                <div className="flex justify-center w-full items-center">
                  {/* 24H removido daqui */}
                </div>

                {steps.current === 1 && (
                  <ValuesForm
                    transactionType={transactionType}
                    toggleTransactionType={toggleTransactionType}
                  />
                )}

                {steps.current === 1 && (
                  <>
                    <div className="w-full flex justify-center items-center pt-4">
                      <button
                        type="button"
                        onClick={handleProceedClick}
                        className="w-full h-12 sm:h-14 rounded-3xl font-bold text-base sm:text-lg border-2 transition-colors duration-200 bg-[var(--color-primary)] text-brand-text hover:opacity-90"
                      >
                        {isMaintenanceMode
                          ? `🚧 Site em Manutenção 🚧`
                          : t('checkout.proceed_button')}
                      </button>
                    </div>

                    <section className="hidden lg:flex items-center justify-center text-center">
                      <p className="text-brand-text">
                        {t('checkout.bitcoin_message')}
                      </p>
                    </section>

                    {/* Seção com horário de funcionamento removida */}
                  </>
                )}
              </form>
            </FormProvider>
          </article>

          <article className="w-full lg:w-2/5 flex justify-center items-center mt-10 lg:mt-0 lg:pl-12">
            <img
              src={getLogoByTheme('default', 'main')}
              alt={`Imagem ${config.name}`}
              className="w-full max-w-sm lg:max-w-full scale-100 lg:scale-110 image-step"
            />
          </article>

          <section className="lg:hidden mt-4 mb-4 text-center">
            <p className="text-brand-text">{t('checkout.bitcoin_message')}</p>
          </section>
        </section>

        {/* Seção mobile com horário de funcionamento removida */}

        <div className="flex justify-center w-full">
          <SocialButtons />
        </div>
      </main>
    </div>
  );
}
