import { useWhiteLabel } from '../../context/WhiteLabelContext';

export function Background() {
  const { config } = useWhiteLabel();

  return (
    <>
      <div
        className={`fixed inset-0 -z-10 w-full h-full bg-cover`}
        style={{
          backgroundImage: `url('${config.background.hero}')`,
          backgroundColor: config.colors.background,
          opacity: (config.background.opacity || 90) / 100,
        }}
      />
      <div
        className="fixed inset-0 -z-10 w-full h-full opacity-40"
        style={{ backgroundColor: config.colors.background }}
      />
    </>
  );
}
