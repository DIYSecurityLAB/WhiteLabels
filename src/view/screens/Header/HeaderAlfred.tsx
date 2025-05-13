import { useWhiteLabel } from '@/context/WhiteLabelContext';
import { useLanguage } from '@/domain/locales/Language';
import { useContext, useEffect, useRef, useState } from 'react';
import { HiMenu, HiX } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { LanguageSwitcher } from '../../components/LanguageSwitcher/LanguageSwitcher';
import { UserLevelBadge } from '../../components/UserLevelBadge';
import { AuthContext } from '../../context/AuthContext';
import { ROUTES } from '../../routes/Routes';
import { NavLinks } from './NavLinks';

// Enum e helpers para cores de nível
enum UserLevel {
  MADEIRA = 0,
  BRONZE = 1,
  PRATA = 2,
  OURO = 3,
  DIAMANTE = 4,
  PLATINA = 5,
}
interface LevelColors {
  bg: string;
  text: string;
  badge: string;
  dot: string;
}
const LEVEL_COLORS: Record<UserLevel, LevelColors> = {
  [UserLevel.MADEIRA]: {
    bg: 'bg-gray-500',
    text: 'text-gray-300',
    badge: 'bg-gray-700',
    dot: 'bg-gray-400',
  },
  [UserLevel.BRONZE]: {
    bg: 'bg-amber-600',
    text: 'text-amber-300',
    badge: 'bg-amber-800',
    dot: 'bg-amber-400',
  },
  [UserLevel.PRATA]: {
    bg: 'bg-gray-300',
    text: 'text-gray-200',
    badge: 'bg-gray-600',
    dot: 'bg-gray-200',
  },
  [UserLevel.OURO]: {
    bg: 'bg-yellow-400',
    text: 'text-yellow-300',
    badge: 'bg-yellow-700',
    dot: 'bg-yellow-300',
  },
  [UserLevel.DIAMANTE]: {
    bg: 'bg-blue-400',
    text: 'text-blue-300',
    badge: 'bg-blue-700',
    dot: 'bg-blue-300',
  },
  [UserLevel.PLATINA]: {
    bg: 'bg-violet-400',
    text: 'text-violet-300',
    badge: 'bg-violet-700',
    dot: 'bg-violet-300',
  },
};
function getLevelStyle(level: number, styleType: keyof LevelColors): string {
  const validLevel =
    level >= 0 && level <= 5 ? (level as UserLevel) : UserLevel.MADEIRA;
  return LEVEL_COLORS[validLevel][styleType];
}
function getLevelTextColor(level: number): string {
  return getLevelStyle(level, 'text');
}

function getLevelDotColor(level: number): string {
  return getLevelStyle(level, 'dot');
}

export default function Header() {
  const { user, logout } = useContext(AuthContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { currentLang } = useLanguage();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const { config, getLevelName, loadHeaderFont } = useWhiteLabel();

  useEffect(() => {
    loadHeaderFont();
  }, [loadHeaderFont]);

  const handleLogout = () => {
    logout();
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Fecha dropdown e menu mobile ao clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node) &&
        isMobileMenuOpen
      ) {
        setIsMobileMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  return (
    <header
      className="flex flex-col items-center justify-center w-full max-w-[100vw] transition-all duration-300 bg-transparent px-2 sm:px-4 py-4 sm:py-4 text-center"
      style={{ fontFamily: `var(--font-headings, ${config.fonts.headings})` }}
    >
      <nav
        aria-label="Global"
        className="w-full flex flex-row items-center justify-between md:justify-center flex-wrap gap-y-2 gap-x-8"
      >
        {/* Botão de menu para dispositivos móveis */}
        <button
          className="md:hidden"
          style={{ color: config.colors.text, background: 'transparent' }}
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <HiMenu size={28} />
        </button>

        {/* Links de navegação para desktop */}
        <div className="hidden md:flex flex-row items-center gap-4">
          <NavLinks isVisible={true} isLargeScreen={true} />
        </div>

        <div className="flex items-center gap-4">
          <LanguageSwitcher
            className="flex justify-center"
            LabelClassName="text-xl sm:text-2xl lg:text-3xl font-pixelade items-center justify-center gap-x-2 font-extralight leading-6"
          />
          <div className="relative" ref={dropdownRef}>
            {user ? (
              <>
                <button
                  onClick={() => setIsDropdownOpen((prev) => !prev)}
                  className="flex items-center gap-x-2"
                  style={{ color: config.colors.text }}
                >
                  {/* Logo fixa com filtro condicional */}
                  <img
                    src={config.logo.icon}
                    alt="Logo"
                    className={`w-6 h-6${config.logo.applyLevelIconFilter ? ' filter brightness-0 invert' : ''}`}
                  />
                  <div className="flex flex-col items-start">
                    <span className="font-pixelade inline text-2xl font-semibold">
                      {user.username}
                    </span>
                    {user.level !== undefined && (
                      <div className="flex items-center mt-0.5">
                        <div
                          className={`w-2 h-2 rounded-full mr-1.5 ${getLevelDotColor(user.level)}`}
                        ></div>
                        <span
                          className={`text-xs font-medium ${getLevelTextColor(user.level)}`}
                        >
                          {getLevelName(user.level)}
                        </span>
                      </div>
                    )}
                  </div>
                </button>
                {isDropdownOpen && (
                  <div
                    className="absolute top-14 right-0 shadow-xl rounded-xl p-4 flex flex-col z-50 w-[280px] sm:w-[320px] max-w-[95vw] transition-all duration-300 ease-in-out transform origin-top-right animate-slideInDown backdrop-blur-md"
                    style={{
                      backgroundColor: config.colors.backgroundSecondary,
                      color: config.colors.text,
                      border: `1px solid ${config.colors.primary}`,
                    }}
                  >
                    <div className="flex flex-col items-center mb-3">
                      <div
                        className={`mb-3 w-20 h-20 rounded-full flex items-center justify-center border-2 shadow-lg text-5xl`}
                        style={{
                          background: `linear-gradient(135deg, ${config.colors.primary} 0%, ${config.colors.secondary} 100%)`,
                          borderColor: config.colors.primary,
                        }}
                      >
                        {/* Logo fixa com filtro condicional */}
                        <img
                          src={config.logo.icon}
                          alt="Logo"
                          className={`w-16 h-16${config.logo.applyLevelIconFilter ? ' filter brightness-0 invert' : ''}`}
                        />
                      </div>
                      <span className="font-bold text-xl mb-1">
                        {user.username}
                      </span>
                      <div
                        className={`px-4 py-1.5 rounded-full font-medium text-sm flex items-center gap-2 shadow-md`}
                        style={{
                          backgroundColor: config.colors.primary,
                          color: config.colors.text,
                        }}
                      >
                        <div
                          className={`w-3 h-3 rounded-full animate-pulse`}
                          style={{ backgroundColor: config.colors.secondary }}
                        ></div>
                        Nível {getLevelName(user.level)}
                      </div>
                    </div>
                    <div className="mb-3 w-full">
                      <UserLevelBadge />
                    </div>
                    <button
                      onClick={handleLogout}
                      className="mt-2 bg-gradient-to-r from-red-600 to-red-700 text-white py-2.5 rounded-md hover:from-red-700 hover:to-red-800 transition-all w-full font-medium flex items-center justify-center gap-2 shadow-md text-sm"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1H3zm11 4a1 1 0 10-2 0v4a1 1 0 102 0V7zm-3 1a1 1 0 10-2 0v3a1 1 0 102 0V8zM8 9a1 1 0 00-2 0v2a1 1 0 102 0V9z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Sair
                    </button>
                  </div>
                )}
              </>
            ) : (
              <button
                onClick={() => navigate(ROUTES.auth.login.call(currentLang))}
                className="flex items-center gap-x-2 bg-transparent transition-all px-4 py-2 rounded hover:text-amber-400"
                style={{
                  color: config.colors.text,
                  border: `1px solid transparent`,
                }}
              >
                {/* Logo fixa com filtro condicional */}
                <img
                  src={config.logo.icon}
                  alt="Logo"
                  className={`w-6 h-6${config.logo.applyLevelIconFilter ? ' filter brightness-0 invert' : ''}`}
                />
                Faça login
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Menu móvel */}
      {isMobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-start justify-center pt-16"
        >
          <div className="w-full max-w-xs">
            <NavLinks
              isVisible={true}
              isLargeScreen={false}
              isMobileMenu={true}
              LinkCallBack={closeMobileMenu}
              closeButton={
                <button
                  onClick={closeMobileMenu}
                  className="text-white hover:text-red-500 transition-all"
                >
                  <HiX size={28} />
                </button>
              }
            />
          </div>
        </div>
      )}
    </header>
  );
}
