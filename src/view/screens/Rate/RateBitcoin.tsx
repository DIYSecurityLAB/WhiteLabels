import { useWhiteLabel } from '@/context/WhiteLabelContext';
import WhatsAppButton from '@/view/components/buttonWhatsApp';
import { useTranslation } from 'react-i18next';

export function Fees() {
  const { t } = useTranslation();
  const { config } = useWhiteLabel();

  return (
    <>
      <div className="container mx-auto p-6 pt-[10%] sm:pt-16 pb-16">
        <h1
          className="text-2xl font-bold pb-6"
          style={{ color: config.colors.text }}
        >
          {t('fees.title')}
        </h1>

        <section className="pb-8">
          <h2
            className="text-xl font-semibold mb-4"
            style={{ color: config.colors.text }}
          >
            {t('fees.dailyLimit1')}
          </h2>

          <p style={{ color: config.colors.text }}>{t('fees.above1000')}</p>
        </section>

        <section className="pb-8">
          <h2
            className="text-xl font-semibold mb-4"
            style={{ color: config.colors.text }}
          >
            {t('fees.dailyLimit2')}
          </h2>
          <p style={{ color: config.colors.text }}>{t('fees.fixedRate')}</p>
        </section>

        <section className="pb-8">
          <h2
            className="text-xl font-semibold mb-4"
            style={{ color: config.colors.text }}
          >
            {t('fees.couponsTitle')}
          </h2>
          <p style={{ color: config.colors.text }}>{t('fees.coupons')}</p>
        </section>

        <section className="pb-8">
          <h2
            className="text-xl font-semibold mb-4"
            style={{ color: config.colors.text }}
          >
            {t('fees.convertibilityRatesTile')}
          </h2>
          <p style={{ color: config.colors.text }}>
            {t('fees.convertibilityRates')}
          </p>
        </section>

        <section className="pb-8">
          <h2
            className="text-xl font-semibold mb-4"
            style={{ color: config.colors.text }}
          >
            {t('fees.reflectionTitle')}
          </h2>
          <p style={{ color: config.colors.text }}>{t('fees.reflection1')}</p>
          <p style={{ color: config.colors.text }} className="pt-4">
            {t('fees.reflection2')}
          </p>
          <p style={{ color: config.colors.text }} className="pt-4">
            {t('fees.reflection3')}
          </p>
          <p style={{ color: config.colors.text }} className="pt-4">
            {t('fees.reflection4')}
          </p>
        </section>

        <section className="pb-8">
          <h2
            className="text-xl font-semibold mb-4"
            style={{ color: config.colors.text }}
          >
            {t('fees.privacyTitle')}
          </h2>
          <p style={{ color: config.colors.text }}>{t('fees.privacy1')}</p>
          <p style={{ color: config.colors.text }} className="pt-4">
            {t('fees.privacy2')}
          </p>
        </section>
      </div>
      <WhatsAppButton />
    </>
  );
}
