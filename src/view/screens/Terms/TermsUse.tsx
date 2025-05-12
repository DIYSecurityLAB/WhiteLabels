import { useWhiteLabel } from '@/context/WhiteLabelContext';
import WhatsAppButton from '@/view/components/buttonWhatsApp';
import { useTranslation } from 'react-i18next';

export function TermsOfUse() {
  const { t } = useTranslation();
  const { config } = useWhiteLabel();

  return (
    <>
      <div className="container mx-auto p-6 pt-[10%] sm:pt-16 pb-20">
        <h1
          className="text-2xl font-bold pb-6"
          style={{ color: config.colors.text }}
        >
          {t('termsOfUse.title')}
        </h1>

        <section className="pb-8">
          <h2
            className="text-xl font-semibold pb-4"
            style={{ color: config.colors.text }}
          >
            1. {t('termsOfUse.platformTitle')}
          </h2>
          {t('termsOfUse.platformDescription')
            .split('\n\n')
            .map((paragraph, index, array) => (
              <p key={index} style={{ color: config.colors.text }}>
                {paragraph}
                {index < array.length - 1 && (
                  <>
                    <br />
                    <br />
                  </>
                )}
              </p>
            ))}
        </section>

        <section className="pb-8">
          <h2
            className="text-xl font-semibold pb-4"
            style={{ color: config.colors.text }}
          >
            2. {t('termsOfUse.transactionsTitle')}
          </h2>
          <ol
            className="list-decimal pl-5"
            style={{ color: config.colors.text }}
          >
            {(
              t('termsOfUse.transactionsSteps', {
                returnObjects: true,
              }) as string[]
            ).map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </section>

        <section className="pb-8">
          <h2
            className="text-xl font-semibold pb-4"
            style={{ color: config.colors.text }}
          >
            3. {t('termsOfUse.transactionLimitsTitle')}
          </h2>
          <p style={{ color: config.colors.text }}>
            {t('termsOfUse.transactionLimitsDescription')}
          </p>
        </section>

        <section className="pb-8">
          <h2
            className="text-xl font-semibold pb-4"
            style={{ color: config.colors.text }}
          >
            4. {t('termsOfUse.transactionDurationTitle')}
          </h2>
          <p style={{ color: config.colors.text }}>
            {t('termsOfUse.transactionDurationDescription')}
          </p>
        </section>

        <section className="pb-8">
          <h2
            className="text-xl font-semibold pb-4"
            style={{ color: config.colors.text }}
          >
            5. {t('termsOfUse.kycPoliciesTitle')}
          </h2>
          <div style={{ color: config.colors.text }}>
            {t('termsOfUse.kycPoliciesDescription')
              .split('\n\n')
              .map((paragraph, index, array) => (
                <p key={index} style={{ color: config.colors.text }}>
                  {paragraph}
                  {index < array.length - 1 && (
                    <>
                      <br />
                      <br />
                    </>
                  )}
                </p>
              ))}
          </div>
        </section>

        <section className="pb-8">
          <h2
            className="text-xl font-semibold pb-4"
            style={{ color: config.colors.text }}
          >
            5. {t('termsOfUse.globalReachTitle')}
          </h2>
          <p style={{ color: config.colors.text }}>
            {t('termsOfUse.globalReachDescription1')}
          </p>
          <p style={{ color: config.colors.text }} className="pt-4">
            {t('termsOfUse.globalReachDescription2')}
          </p>
          <p style={{ color: config.colors.text }} className="pt-4">
            {t('termsOfUse.globalReachDescription3')}
          </p>
        </section>

        <section className="pb-8">
          <h2
            className="text-xl font-semibold pb-4"
            style={{ color: config.colors.text }}
          >
            6. {t('termsOfUse.disputesTitle')}
          </h2>
          <ul className="list-disc pl-5" style={{ color: config.colors.text }}>
            <li>{t('termsOfUse.disputesStep1')}</li>
            <li>{t('termsOfUse.disputesStep2')}</li>
            <li>{t('termsOfUse.disputesStep3')}</li>
            <li>{t('termsOfUse.disputesStep4')}</li>
          </ul>
        </section>

        <section className="pb-8">
          <h2
            className="text-xl font-semibold pb-4"
            style={{ color: config.colors.text }}
          >
            7. {t('termsOfUse.conductTitle')}
          </h2>
          <p style={{ color: config.colors.text }}>
            {t('termsOfUse.conductDescription1')}
          </p>
          <ul
            className="list-disc pl-5 pt-4"
            style={{ color: config.colors.text }}
          >
            <li>{t('termsOfUse.conductPenalty1')}</li>
            <li>{t('termsOfUse.conductPenalty2')}</li>
            <li>{t('termsOfUse.conductPenalty3')}</li>
            <li>{t('termsOfUse.conductPenalty4')}</li>
          </ul>
          <p style={{ color: config.colors.text }} className="pt-4">
            {t('termsOfUse.conductDescription2')}
          </p>
        </section>

        <footer className="pt-8">
          <p style={{ color: config.colors.text }}>{t('termsOfUse.footer')}</p>
        </footer>
      </div>
      <WhatsAppButton />
    </>
  );
}
