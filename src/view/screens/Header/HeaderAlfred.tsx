import { useWhiteLabel } from '@/context/WhiteLabelContext';
import { useLanguage } from '@/domain/locales/Language';
import { Bot } from 'lucide-react'; // Importa o ícone do robô
import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LanguageSwitcher } from '../../components/LanguageSwitcher/LanguageSwitcher';
import { UserLevelBadge } from '../../components/UserLevelBadge';
import { AuthContext } from '../../context/AuthContext';
import { ROUTES } from '../../routes/Routes';
import { NavLinks } from './NavLinks';

export default function Header() {
  const { user, logout } = useContext(AuthContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const { currentLang } = useLanguage();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { config, loadHeaderFont, getLevelName } = useWhiteLabel();

  useEffect(() => {
    // Carregar a fonte do cabeçalho ao montar o componente
    loadHeaderFont();
  }, [loadHeaderFont]);

  const handleLogout = () => {
    logout();
  };

  const renderLevelIcon = () => {
    if (config.id === 'alfred') {
      return <Bot size={20} style={{ color: config.colors.text }} />; // Ícone do robô para Alfred
    }
    return (
      <img
        src={config.logo.levelIcon}
        alt="Level Icon"
        className="w-5 h-5"
        style={{
          filter: config.logo.applyLevelIconFilter
            ? 'brightness(0) invert(1)'
            : 'none',
        }}
      />
    );
  };

  // Fecha o dropdown ao clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header
      className="flex flex-col items-center justify-center w-full max-w-[100vw] transition-all duration-300 bg-transparent px-2 sm:px-4 py-2 sm:py-4 text-center z-50 relative"
      style={{ fontFamily: `var(--font-headings, ${config.fonts.headings})` }}
    >
      <nav
        aria-label="Global"
        className="w-full flex flex-row items-center justify-center flex-wrap gap-y-2 gap-x-8"
      >
        <NavLinks isVisible={true} isLargeScreen={false} />
        <LanguageSwitcher
          className="flex justify-center"
          LabelClassName="text-xl sm:text-2xl lg:text-3xl font-orbitron items-center justify-center gap-x-2 font-extralight leading-6"
        />
        <div className="relative" ref={dropdownRef}>
          {user ? (
            <>
              <button
                onClick={() => setIsDropdownOpen((prev) => !prev)}
                className="flex items-center gap-x-2 transition-all"
                style={{ color: config.colors.text }}
              >
                {renderLevelIcon()}
                <div className="flex flex-col items-start">
                  <span className="inline text-lg font-semibold">
                    {user.username}
                  </span>
                  <div className="text-xs -mt-1">
                    {user.level !== undefined && (
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs`}
                        style={{
                          backgroundColor:
                            (
                              config.userLevels.colors as Record<
                                string,
                                { primary: string; secondary: string }
                              >
                            )[`level${user.level}`]?.primary || '#718096',
                          color: config.colors.text,
                        }}
                      >
                        Nível {getLevelName(user.level)}
                      </span>
                    )}
                  </div>
                </div>
              </button>
              {isDropdownOpen && (
                <div
                  className="absolute top-14 right-0 shadow-lg rounded-lg p-4 flex flex-col items-center z-50 min-w-[200px]"
                  style={{
                    backgroundColor: config.colors.backgroundSecondary,
                    color: config.colors.text,
                  }}
                >
                  <div className="mb-3 w-full">
                    <UserLevelBadge />
                  </div>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 rounded transition-all w-full hover:opacity-90"
                    style={{
                      backgroundColor: config.colors.error,
                      color: config.colors.text,
                    }}
                  >
                    Logout
                  </button>
                </div>
              )}
            </>
          ) : (
            <button
              onClick={() => navigate(ROUTES.auth.login.call(currentLang))}
              className="flex items-center gap-x-2 bg-transparent transition-all px-4 py-2 rounded hover:text-primary"
              style={{
                color: config.colors.text,
              }}
            >
              <img
                src={config.logo.icon}
                alt="Logo"
                className="w-6 h-6 filter brightness-0 invert"
              />
              Faça login
            </button>
          )}
        </div>
      </nav>
    </header>
  );
}
