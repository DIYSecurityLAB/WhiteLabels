import { useWhiteLabel } from '@/context/WhiteLabelContext';
import WhatsAppButton from '@/view/components/buttonWhatsApp';
import { useTranslation } from 'react-i18next';

export function AboutBuyBitcoin() {
  const { t } = useTranslation();
  const { config } = useWhiteLabel();

  const titles: string[] = t('about.titles', {
    returnObjects: true,
  }) as string[];

  const paragraphs: string[] = t('about.paragraphs', {
    returnObjects: true,
  }) as string[];

  return (
    <>
      <div className="container mx-auto p-6 pt-[10%] sm:pt-16 pb-16 px-8">
        <div className="pb-4 text-center">
          <h1
            className="text-3xl font-bold"
            style={{ color: config.colors.text }}
          >
            {t('about.title')}
          </h1>
        </div>

        <div className="text-justify" style={{ color: config.colors.text }}>
          {titles.map((title, index) => (
            <div key={index}>
              <h2 className="text-xl font-semibold pt-6">{title}</h2>
              <p className={`${index === 3 ? 'font-semibold' : ''} py-4`}>
                {paragraphs[index]}
              </p>
            </div>
          ))}
        </div>
      </div>
      <WhatsAppButton />
    </>
  );
}
