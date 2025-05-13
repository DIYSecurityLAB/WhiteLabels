import { useWhiteLabel } from '@/context/WhiteLabelContext';
import { Link } from 'react-router-dom';
import { ROUTES } from '../routes/Routes';

export function NotFound() {
  const { config } = useWhiteLabel();

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-4"
      style={{
        background: config.colors.background,
        color: config.colors.text,
      }}
    >
      <img
        src={config.logo.main}
        alt="Logo"
        className="mb-4 w-24 h-24"
        style={
          config.logo.applyLevelIconFilter
            ? { filter: 'brightness(0) invert(1)' }
            : undefined
        }
      />
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-lg mb-6">
        It seems like you've tried to access a page that doesn't exist.
      </p>
      <Link
        to={ROUTES.home.call()}
        className="px-6 py-3 rounded-lg transition"
        style={{
          background: config.colors.primary,
          color: '#fff',
        }}
      >
        Back to {config.name.toUpperCase()}
      </Link>
    </div>
  );
}
