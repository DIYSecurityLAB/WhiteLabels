import { useWhiteLabel } from '@/context/WhiteLabelContext';
import {
  ArrowPathIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  CurrencyDollarIcon,
  InformationCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { t } from 'i18next';
import React, { useState } from 'react';
import { useConfirmInfos } from './useConfirmInfos';

const Button = ({
  onClick,
  children,
  variant,
}: {
  onClick: () => void;
  children: React.ReactNode;
  variant?: string;
}) => {
  const { config } = useWhiteLabel();

  return (
    <button
      onClick={onClick}
      className={`px-6 py-3 rounded-3xl font-bold text-sm sm:text-base transition duration-300 ${
        variant === 'outline' ? `border-2` : ``
      }`}
      style={
        variant === 'outline'
          ? {
              borderColor: config.colors.primary,
              color: config.colors.primary,
              backgroundColor: 'transparent',
            }
          : {
              backgroundColor: config.colors.primary,
              color: 'white',
            }
      }
    >
      {children}
    </button>
  );
};

interface ConfirmInfosModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  fiatAmount: string;
  fiatType: string;
  cryptoAmount: string;
  cryptoType: string;
  network: string;
  coldWallet: string;
  paymentMethod: string;
  transactionNumber: string;
  cupom: string;
  alfredFeePercentage: number;
}

export default function ConfirmInfosModal({
  isOpen,
  onClose,
  onConfirm,
  fiatAmount,
  fiatType,
  cryptoAmount,
  cryptoType,
  network,
  coldWallet,
  paymentMethod,
  cupom,
  alfredFeePercentage,
}: ConfirmInfosModalProps) {
  const { config } = useWhiteLabel();
  const {
    onchainFee,
    btcToBrl,
    swapFee,
    totalFees,
    expectedAmount,
    expectedAmountCrypto,
    alfredFee,
    alfredFeeRate,
    conversionFeeUsdBrl,
  }: {
    onchainFee: number | null;
    btcToBrl: number | null;
    swapFee: number;
    totalFees: number;
    expectedAmount: number;
    expectedAmountCrypto: string;
    alfredFee: number;
    alfredFeeRate: number;
    conversionFeeUsdBrl: number | null;
  } = useConfirmInfos(
    network,
    fiatAmount,
    fiatType,
    alfredFeePercentage,
    cryptoType,
    paymentMethod,
    cupom,
  );

  const [isDataVisible, setIsDataVisible] = useState(false);
  const [isTaxVisible, setIsTaxVisible] = useState(false);

  if (!isOpen) return null;

  if (
    network.toLowerCase() === 'onchain' &&
    onchainFee === null &&
    btcToBrl === null
  )
    return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 overflow-y-auto"
      style={{ backgroundColor: `${config.colors.background}CC` }} // Mais escuro
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.22 }}
        className="p-0 rounded-2xl max-w-lg shadow-2xl relative w-full max-h-[90vh] overflow-y-auto border"
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: `${config.colors.secondary} ${config.colors.backgroundSecondary}`,
          backgroundColor: config.colors.secondary,
          borderColor: config.colors.primary,
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 hover:opacity-80 transition"
          style={{ color: config.colors.primary }}
        >
          <XMarkIcon className="w-6 h-6" />
        </button>

        <div
          className="text-center py-7 px-6 border-b"
          style={{ borderColor: config.colors.primary }}
        >
          <h2
            className="text-2xl font-bold tracking-tight"
            style={{ color: config.colors.primary }}
          >
            {t('confirm_infos.title')}
          </h2>
          <p
            className="text-sm mt-2"
            style={{ color: `${config.colors.text}99` }}
          >
            {t('confirm_infos.description')}
          </p>
        </div>

        <div
          className="space-y-6 px-6 py-7"
          style={{ color: config.colors.text }}
        >
          {/* Seção de Valor */}
          <div
            className="p-4 rounded-xl flex flex-col gap-2 border"
            style={{
              backgroundColor: config.colors.backgroundSecondary,
              borderColor: config.colors.primary,
            }}
          >
            <div className="flex items-center gap-2 mb-1">
              <CurrencyDollarIcon
                className="w-5 h-5"
                style={{ color: config.colors.primary }}
              />
              <h3 className="text-base font-semibold">
                {t('confirm_infos.amount_section.title')}
              </h3>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
              <span className="text-xl font-bold">{fiatAmount}</span>
              <span className="text-base font-medium">
                {fiatType.toUpperCase()}
              </span>
            </div>
            <div className="text-sm mt-1">
              {t('confirm_infos.amount_section.crypto_label')}{' '}
              <span className="font-bold">
                {cryptoAmount} {cryptoType.toUpperCase()}
              </span>
            </div>
          </div>

          {/* Toggle Meus Dados */}
          <div
            className="p-4 rounded-xl border cursor-pointer"
            style={{
              backgroundColor: config.colors.backgroundSecondary,
              borderColor: config.colors.primary,
            }}
            onClick={() => setIsDataVisible(!isDataVisible)}
          >
            <div className="flex items-center gap-2">
              <InformationCircleIcon
                className="w-5 h-5"
                style={{ color: config.colors.primary }}
              />
              <h3 className="text-base font-semibold">
                {t('confirm_infos.user_data_section.title')}
              </h3>
              {isDataVisible ? (
                <ChevronUpIcon
                  className="w-4 h-4"
                  style={{ color: config.colors.primary }}
                />
              ) : (
                <ChevronDownIcon
                  className="w-4 h-4"
                  style={{ color: config.colors.primary }}
                />
              )}
            </div>
            {isDataVisible && (
              <div className="mt-3 space-y-1 text-sm pl-1">
                <p>
                  <strong>
                    {t('confirm_infos.user_data_section.wallet')}:
                  </strong>{' '}
                  {coldWallet}
                </p>
                <p></p>
                <p>
                  <strong>
                    {t('confirm_infos.user_data_section.coupon')}:
                  </strong>{' '}
                  {cupom || t('confirm_infos.user_data_section.coupon_none')}
                </p>
                <p>
                  <strong>
                    {t('confirm_infos.user_data_section.network')}:
                  </strong>{' '}
                  {network}
                </p>
                <p>
                  <strong>
                    {t('confirm_infos.user_data_section.payment_method')}:
                  </strong>{' '}
                  {paymentMethod}
                </p>
              </div>
            )}
          </div>

          {/* Toggle Taxas */}
          <div
            className="p-4 rounded-xl border cursor-pointer"
            style={{
              backgroundColor: config.colors.backgroundSecondary,
              borderColor: config.colors.primary,
            }}
            onClick={() => setIsTaxVisible(!isTaxVisible)}
          >
            <div className="flex items-center gap-2">
              <ArrowPathIcon
                className="w-5 h-5"
                style={{ color: config.colors.primary }}
              />
              <h3 className="text-base font-semibold">
                {t('confirm_infos.fees_section.title')}
              </h3>
              {isTaxVisible ? (
                <ChevronUpIcon
                  className="w-4 h-4"
                  style={{ color: config.colors.primary }}
                />
              ) : (
                <ChevronDownIcon
                  className="w-4 h-4"
                  style={{ color: config.colors.primary }}
                />
              )}
            </div>
            {isTaxVisible && (
              <div className="mt-3 space-y-1 text-sm pl-1">
                {cryptoType.toLowerCase() === 'usdt' ? (
                  <p>
                    <strong>
                      {t('confirm_infos.fees_section.conversion_fee')}:
                    </strong>{' '}
                    R$ {swapFee.toFixed(2)}
                  </p>
                ) : (
                  <p>
                    <strong>
                      {t('confirm_infos.fees_section.conversion_fee')}:
                    </strong>{' '}
                    R$ {swapFee.toFixed(2)} (
                    {t('confirm_infos.fees_section.conversion_fee_value')} + R${' '}
                    {conversionFeeUsdBrl?.toFixed(2)})
                  </p>
                )}
                {network.toLowerCase() === 'onchain' && (
                  <p>
                    <strong>
                      {t('confirm_infos.fees_section.onchain_fee')}:
                    </strong>{' '}
                    R$ {onchainFee?.toFixed(2)}{' '}
                    {t('confirm_infos.fees_section.onchain_fee_variable')}
                  </p>
                )}
                <p>
                  <strong>
                    {t('confirm_infos.fees_section.john_galt_fee')}:
                  </strong>{' '}
                  R$ {alfredFee.toFixed(2)} ({(alfredFeeRate * 100).toFixed(2)}
                  %)
                </p>
                <p>
                  <strong>{t('confirm_infos.fees_section.total_fees')}:</strong>{' '}
                  R$ {totalFees.toFixed(2)}
                </p>
              </div>
            )}
          </div>

          {/* Resumo Final */}
          <div
            className="p-4 rounded-xl border"
            style={{
              backgroundColor: config.colors.backgroundSecondary,
              borderColor: config.colors.primary,
            }}
          >
            <div className="flex items-center gap-2 mb-1">
              <ArrowPathIcon
                className="w-5 h-5"
                style={{ color: config.colors.primary }}
              />
              <h3 className="text-base font-semibold">
                {t('confirm_infos.final_summary.title')}
              </h3>
            </div>
            <div className="flex flex-col gap-1 text-sm">
              <span>
                <strong>
                  {t('confirm_infos.final_summary.expected_amount')}:
                </strong>{' '}
                R$ {expectedAmount.toFixed(2)}
              </span>
              <span>
                <strong>
                  {t('confirm_infos.final_summary.expected_amount_crypto')}:
                </strong>{' '}
                {expectedAmountCrypto} {cryptoType.toUpperCase()}
              </span>
            </div>
          </div>

          {/* Botões */}
          <div className="flex justify-between gap-4 mt-7">
            <Button variant="outline" onClick={onClose}>
              {t('confirm_infos.buttons.cancel')}
            </Button>
            <Button onClick={onConfirm}>
              {t('confirm_infos.buttons.confirm')}
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
