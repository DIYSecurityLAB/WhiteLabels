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
  transactionNumber,
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
      style={{ backgroundColor: `${config.colors.background}80` }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
        className="p-6 rounded-xl max-w-lg shadow-lg relative w-full max-h-[90vh] overflow-y-auto"
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: `${config.colors.secondary} ${config.colors.backgroundSecondary}`,
          backgroundColor: config.colors.secondary,
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 hover:opacity-80 transition"
          style={{ color: config.colors.text }}
        >
          <XMarkIcon className="w-6 h-6" />
        </button>

        <div className="text-center mb-6">
          <h2
            className="text-2xl font-semibold"
            style={{ color: config.colors.text }}
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

        <div className="space-y-6" style={{ color: config.colors.text }}>
          {/* Seção de Valor */}
          <div
            className="p-4 rounded-lg"
            style={{ backgroundColor: config.colors.backgroundSecondary }}
          >
            <div className="flex items-center space-x-2">
              <CurrencyDollarIcon
                className="w-6 h-6"
                style={{ color: config.colors.primary }}
              />
              <h3 className="text-lg font-semibold">
                {t('confirm_infos.amount_section.title')}
              </h3>
            </div>
            <p>
              <span className="text-xl font-bold">{fiatAmount}</span>{' '}
              {fiatType.toUpperCase()}
            </p>
            <p>
              {t('confirm_infos.amount_section.crypto_label')}{' '}
              <span className="text-xl font-bold">
                {cryptoAmount} {cryptoType.toUpperCase()}
              </span>
            </p>
          </div>

          {/* Toggle Meus Dados */}
          <div
            className="p-4 rounded-lg cursor-pointer"
            style={{ backgroundColor: config.colors.backgroundSecondary }}
            onClick={() => setIsDataVisible(!isDataVisible)}
          >
            <div className="flex items-center space-x-2">
              <InformationCircleIcon
                className="w-6 h-6"
                style={{ color: config.colors.primary }}
              />
              <h3 className="text-lg font-semibold">
                {t('confirm_infos.user_data_section.title')}
              </h3>
              {isDataVisible ? (
                <ChevronUpIcon
                  className="w-5 h-5"
                  style={{ color: config.colors.primary }}
                />
              ) : (
                <ChevronDownIcon
                  className="w-5 h-5"
                  style={{ color: config.colors.primary }}
                />
              )}
            </div>
            {isDataVisible && (
              <div className="mt-4 space-y-2">
                <p>
                  <strong>
                    {t('confirm_infos.user_data_section.wallet')}:
                  </strong>{' '}
                  {coldWallet}
                </p>
                <p>
                  <strong>
                    {t('confirm_infos.user_data_section.contact_number')}:
                  </strong>{' '}
                  {transactionNumber}
                </p>
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
            className="p-4 rounded-lg cursor-pointer"
            style={{ backgroundColor: config.colors.backgroundSecondary }}
            onClick={() => setIsTaxVisible(!isTaxVisible)}
          >
            <div className="flex items-center space-x-2">
              <ArrowPathIcon
                className="w-6 h-6"
                style={{ color: config.colors.primary }}
              />
              <h3 className="text-lg font-semibold">
                {t('confirm_infos.fees_section.title')}
              </h3>
              {isTaxVisible ? (
                <ChevronUpIcon
                  className="w-5 h-5"
                  style={{ color: config.colors.primary }}
                />
              ) : (
                <ChevronDownIcon
                  className="w-5 h-5"
                  style={{ color: config.colors.primary }}
                />
              )}
            </div>
            {isTaxVisible && (
              <div className="mt-4 space-y-2">
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
            className="p-4 rounded-lg"
            style={{ backgroundColor: config.colors.backgroundSecondary }}
          >
            <div className="flex items-center space-x-2">
              <ArrowPathIcon
                className="w-6 h-6"
                style={{ color: config.colors.primary }}
              />
              <h3 className="text-lg font-semibold">
                {t('confirm_infos.final_summary.title')}
              </h3>
            </div>
            <p>
              <strong>
                {t('confirm_infos.final_summary.expected_amount')}:
              </strong>{' '}
              R$ {expectedAmount.toFixed(2)}
            </p>
            <p>
              <strong>
                {t('confirm_infos.final_summary.expected_amount_crypto')}:
              </strong>{' '}
              {expectedAmountCrypto} {cryptoType.toUpperCase()}
            </p>
          </div>

          {/* Botões */}
          <div className="flex justify-between space-x-4 mt-6">
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
