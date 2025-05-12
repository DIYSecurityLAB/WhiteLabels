import { useWhiteLabel } from '@/context/WhiteLabelContext';
import { Popover, Transition } from '@headlessui/react';
import {
  ChevronDoubleUpIcon,
  LockClosedIcon,
  LockOpenIcon,
} from '@heroicons/react/24/outline';
import { Fragment, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useUserLevel } from '../hooks/useUserLevel';

interface UserLevelBadgeProps {
  compact?: boolean;
}

export function UserLevelBadge({ compact = false }: UserLevelBadgeProps) {
  const { userLevel, userLevelName, getUserLevelInfo } = useUserLevel();
  const { config, getLevelName } = useWhiteLabel();
  const levelInfo = getUserLevelInfo();
  const { t } = useTranslation();
  const [showDetails, setShowDetails] = useState(false);

  if (!levelInfo) return null;

  // Estrutura para definir os próximos níveis e seus requisitos
  const levelProgression = [0, 1, 2, 3, 4, 5].map((level) => {
    const levelName = getLevelName(level).toLowerCase();
    return {
      level,
      name: getLevelName(level),
      description: t(`userLevels.${levelName}.description`),
      requirements: t(
        `userLevels.${levelName}.${level === 0 ? 'validation' : 'requirements'}`,
      ),
      icon: config.userLevels.icons[
        `level${level}` as keyof typeof config.userLevels.icons
      ],
      colors:
        config.userLevels.colors[
          `level${level}` as keyof typeof config.userLevels.colors
        ],
    };
  });

  // Encontra o próximo nível (se não for o último)
  const nextLevel = userLevel < 5 ? levelProgression[userLevel + 1] : null;
  const currentLevelData = levelProgression[userLevel];

  if (compact) {
    return (
      <div className="flex items-center justify-center">
        <div
          className="px-2 py-0.5 rounded-full text-white text-xs flex items-center gap-1 shadow-lg"
          style={{
            background: `linear-gradient(to right, ${currentLevelData.colors.primary}, ${currentLevelData.colors.secondary})`,
          }}
        >
          <span>{currentLevelData.icon}</span>
          <span>{userLevelName}</span>
        </div>
      </div>
    );
  }

  return (
    <Popover className="relative w-full max-w-xs mx-auto">
      {({ open }) => (
        <>
          <Popover.Button
            className="px-4 py-2 rounded-full text-white text-sm font-medium w-full text-center flex items-center justify-center gap-2 hover:shadow-lg hover:opacity-90 transition-all duration-300 border border-gray-700"
            style={{
              background: `linear-gradient(to right, ${currentLevelData.colors.primary}, ${currentLevelData.colors.secondary})`,
            }}
            onClick={() => setShowDetails(!showDetails)}
          >
            <span className="flex items-center gap-2">
              <span>{currentLevelData.icon}</span>
              <span>Nível {userLevelName}</span>
            </span>
            <ChevronDoubleUpIcon
              className={`h-4 w-4 transition-transform duration-300 ${open ? 'transform rotate-180' : ''}`}
              aria-hidden="true"
            />
          </Popover.Button>

          <div
            className="text-xs mt-2 mb-2 text-center flex justify-between items-center px-1"
            style={{ color: config.colors.text }}
          >
            <span>{currentLevelData.icon}</span>
            <span>Limite diário: {levelInfo.formattedDailyLimit}</span>
            <span>{nextLevel ? nextLevel.icon : '🔝'}</span>
          </div>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-300"
            enterFrom="opacity-0 -translate-y-2"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 -translate-y-2"
          >
            <Popover.Panel className="absolute z-50 w-full sm:w-[350px] mt-2 transform -translate-x-1/2 left-1/2 sm:left-auto sm:translate-x-0">
              <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 backdrop-blur-sm">
                <div
                  className="relative p-4"
                  style={{
                    backgroundColor: `${config.colors.backgroundSecondary}f0`,
                  }}
                >
                  <div className="space-y-4 text-sm">
                    {/* Seu nível atual */}
                    <div>
                      <h3
                        className="font-bold border-b pb-1 flex items-center justify-between"
                        style={{
                          color: config.colors.text,
                          borderColor: `${config.colors.text}33`,
                        }}
                      >
                        <span>
                          {t('userLevels.title')} - {userLevelName}
                        </span>
                        <span className="text-xl">{currentLevelData.icon}</span>
                      </h3>
                      <div className="mt-3">
                        <div
                          className="relative h-2.5 w-full rounded-full overflow-hidden"
                          style={{ backgroundColor: `${config.colors.text}33` }}
                        >
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${(userLevel / 5) * 100}%`,
                              transition: 'width 1.5s ease-in-out',
                              background: `linear-gradient(to right, ${currentLevelData.colors.primary}, ${currentLevelData.colors.secondary})`,
                            }}
                          />
                          {/* Marcadores de níveis na barra */}
                          {levelProgression.map((level) => (
                            <div
                              key={level.level}
                              className="absolute top-0 bottom-0 flex items-center justify-center w-2 h-2 rounded-full transform -translate-x-1/2"
                              style={{
                                left: `${(level.level / 5) * 100}%`,
                                backgroundColor:
                                  level.level <= userLevel
                                    ? config.colors.text
                                    : `${config.colors.text}66`,
                              }}
                            />
                          ))}
                        </div>
                        <div
                          className="flex justify-between mt-1 text-[10px]"
                          style={{ color: `${config.colors.text}99` }}
                        >
                          {levelProgression.map((level) => (
                            <span key={level.level} className="relative">
                              {level.level <= userLevel ? (
                                <LockOpenIcon
                                  className="w-3 h-3"
                                  style={{ color: config.colors.success }}
                                />
                              ) : (
                                <LockClosedIcon
                                  className="w-3 h-3"
                                  style={{ color: config.colors.error }}
                                />
                              )}
                            </span>
                          ))}
                        </div>
                        <p
                          className="mt-2 text-sm"
                          style={{ color: `${config.colors.text}cc` }}
                        >
                          {currentLevelData.description}
                        </p>
                      </div>
                    </div>

                    {/* Seus benefícios atuais */}
                    <div
                      className="rounded-lg p-3"
                      style={{
                        backgroundColor: `${config.colors.secondary}80`,
                      }}
                    >
                      <h4
                        className="font-semibold mb-2"
                        style={{ color: config.colors.text }}
                      >
                        Seus benefícios:
                      </h4>
                      <ul className="mt-1 space-y-2">
                        <li
                          className="flex items-center gap-2"
                          style={{ color: `${config.colors.text}cc` }}
                        >
                          <span
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ backgroundColor: config.colors.success }}
                          ></span>
                          Limite diário: {levelInfo.formattedDailyLimit}
                        </li>
                        {userLevel >= 2 && (
                          <li
                            className="flex items-center gap-2"
                            style={{ color: `${config.colors.text}cc` }}
                          >
                            <span
                              className="w-1.5 h-1.5 rounded-full"
                              style={{ backgroundColor: config.colors.success }}
                            ></span>
                            Acesso a TED
                          </li>
                        )}
                        {userLevel >= 3 && (
                          <li
                            className="flex items-center gap-2"
                            style={{ color: `${config.colors.text}cc` }}
                          >
                            <span
                              className="w-1.5 h-1.5 rounded-full"
                              style={{ backgroundColor: config.colors.success }}
                            ></span>
                            Acesso a depósito em espécie
                          </li>
                        )}
                        {userLevel >= 4 && (
                          <li
                            className="flex items-center gap-2"
                            style={{ color: `${config.colors.text}cc` }}
                          >
                            <span
                              className="w-1.5 h-1.5 rounded-full"
                              style={{ backgroundColor: config.colors.success }}
                            ></span>
                            Acesso a todos os métodos de pagamento
                          </li>
                        )}
                      </ul>
                    </div>

                    {/* Próximo nível */}
                    {nextLevel && (
                      <div
                        className="rounded-lg p-3"
                        style={{
                          backgroundColor: `${config.colors.secondary}80`,
                        }}
                      >
                        <h4
                          className="font-semibold mb-2 flex items-center justify-between"
                          style={{ color: config.colors.text }}
                        >
                          <span>Próximo nível: {nextLevel.name}</span>
                          <span className="text-xl">{nextLevel.icon}</span>
                        </h4>
                        <div className="space-y-2 mt-1">
                          <p style={{ color: `${config.colors.text}cc` }}>
                            {nextLevel.description}
                          </p>
                          <p className="text-sm mt-2">
                            <span
                              className="font-medium"
                              style={{ color: config.colors.warning }}
                            >
                              Requisitos:
                            </span>
                            <span
                              style={{ color: `${config.colors.text}99` }}
                              className="ml-1"
                            >
                              {nextLevel.requirements}
                            </span>
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}
