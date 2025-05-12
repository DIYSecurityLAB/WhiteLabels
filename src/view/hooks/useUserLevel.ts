import { useWhiteLabel } from '@/context/WhiteLabelContext';
import { useEffect, useState } from 'react';
import { useAuth } from './useAuth';

export interface UserLevelRestrictions {
  dailyLimit: number;
  totalTransactionsLimit: number;
  canUseTed: boolean;
  canUseWhatsApp: boolean;
  canUseCash: boolean;
  canUseAllPaymentMethods: boolean;
}

export function useUserLevel() {
  const { user } = useAuth();
  const { getLevelName } = useWhiteLabel();
  const [restrictions, setRestrictions] = useState<UserLevelRestrictions>({
    dailyLimit: 500,
    totalTransactionsLimit: 2,
    canUseTed: false,
    canUseWhatsApp: false,
    canUseCash: false,
    canUseAllPaymentMethods: false,
  });

  // Obter apenas o número do nível do usuário
  const userLevel = user?.level || 0;

  useEffect(() => {
    // Define as restrições com base no nível do usuário (número)
    switch (userLevel) {
      case 0: // Nível 0 (Iniciante na config)
        setRestrictions({
          dailyLimit: 500,
          totalTransactionsLimit: 2,
          canUseTed: false,
          canUseWhatsApp: false,
          canUseCash: false,
          canUseAllPaymentMethods: false,
        });
        break;
      case 1: // Nível 1 (Básico na config)
        setRestrictions({
          dailyLimit: 5000,
          totalTransactionsLimit: 999, // Sem limite prático
          canUseTed: false,
          canUseWhatsApp: false,
          canUseCash: false,
          canUseAllPaymentMethods: false,
        });
        break;
      case 2: // Nível 2 (Intermediário na config)
        setRestrictions({
          dailyLimit: 10000,
          totalTransactionsLimit: 999,
          canUseTed: true,
          canUseWhatsApp: true,
          canUseCash: false,
          canUseAllPaymentMethods: false,
        });
        break;
      case 3: // Nível 3 (Avançado na config)
        setRestrictions({
          dailyLimit: 35000,
          totalTransactionsLimit: 999,
          canUseTed: true,
          canUseWhatsApp: true,
          canUseCash: true,
          canUseAllPaymentMethods: false,
        });
        break;
      case 4: // Nível 4 (Expert na config)
        setRestrictions({
          dailyLimit: 50000,
          totalTransactionsLimit: 999,
          canUseTed: true,
          canUseWhatsApp: true,
          canUseCash: true,
          canUseAllPaymentMethods: true,
        });
        break;
      case 5: // Nível 5 (Master na config)
        setRestrictions({
          dailyLimit: 150000,
          totalTransactionsLimit: 999,
          canUseTed: true,
          canUseWhatsApp: true,
          canUseCash: true,
          canUseAllPaymentMethods: true,
        });
        break;
      default:
        // Padrão para níveis desconhecidos (mesmo que nível 0)
        setRestrictions({
          dailyLimit: 500,
          totalTransactionsLimit: 2,
          canUseTed: false,
          canUseWhatsApp: false,
          canUseCash: false,
          canUseAllPaymentMethods: false,
        });
    }
  }, [userLevel]);

  // Função para verificar se um valor está dentro do limite diário
  const isWithinDailyLimit = (amount: number): boolean => {
    if (!user) return false;
    return amount <= restrictions.dailyLimit;
  };

  // Função para verificar se o usuário pode usar TED
  const canUseTed = (): boolean => {
    return restrictions.canUseTed;
  };

  // Função para verificar se o usuário pode fazer depósito em espécie
  const canUseCash = (): boolean => {
    return restrictions.canUseCash;
  };

  // Função para verificar se um método de pagamento está disponível para o nível do usuário
  const isPaymentMethodAllowed = (method: string): boolean => {
    if (restrictions.canUseAllPaymentMethods) return true;

    switch (method) {
      case 'PIX':
        return true; // PIX disponível para todos os níveis
      case 'TICKET':
        return true; // Boleto disponível para todos os níveis
      case 'TED':
      case 'BANK_TRANSFER':
        return restrictions.canUseTed;
      case 'CASH':
        return restrictions.canUseCash;
      case 'WISE':
      case 'SWIFT':
      case 'PAYPAL':
        return true; // Métodos internacionais disponíveis para todos
      default:
        return false;
    }
  };

  // Função para obter informações formatadas sobre o nível
  const getUserLevelInfo = () => {
    if (!user) return null;

    return {
      level: userLevel,
      levelName: getLevelName(userLevel),
      dailyLimit: restrictions.dailyLimit,
      formattedDailyLimit: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(restrictions.dailyLimit),
      restrictions,
    };
  };

  return {
    userLevel,
    userLevelName: getLevelName(userLevel),
    restrictions,
    isWithinDailyLimit,
    canUseTed,
    canUseCash,
    isPaymentMethodAllowed,
    getUserLevelInfo,
  };
}
