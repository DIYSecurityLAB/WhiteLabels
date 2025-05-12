import { useWhiteLabel } from '@/context/WhiteLabelContext';

export function LogoJohngalth() {
  const { config } = useWhiteLabel();

  return (
    <div>
      <h1 className="font-lexend text-[var(--color-primary)] dark:text-[var(--color-primary)] font-black text-5xl sm:text-6xl lg:text-7xl flex items-center ">
        {config.name}
      </h1>
    </div>
  );
}
