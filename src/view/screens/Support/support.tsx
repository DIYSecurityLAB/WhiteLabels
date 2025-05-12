import { useWhiteLabel } from '@/context/WhiteLabelContext';
import { Loader } from '@/view/components/Loader';
import { useScaleFactor } from '@/view/hooks/useScaleFactor';
import { useWindowSize } from '@/view/utils/useWindowSize';
import axios from 'axios';
import classNames from 'classnames';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTelegram,
  FaWhatsapp,
} from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { toast } from 'react-toastify';

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
};

export function Support() {
  const { t } = useTranslation();
  const { width } = useWindowSize();
  const { scaleFactor } = useScaleFactor();
  const { config, getLogoByTheme } = useWhiteLabel();

  const IS_LARGE_SCREEN = width >= 768;
  const IS_ZOOM_BIGGER_THAN_100 = scaleFactor > 1 && IS_LARGE_SCREEN;

  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, reset } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/support`,
        data,
      );

      if (response.status === 200 || response.status === 201) {
        toast.success(t('support.successMessage'), {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        reset();
      } else {
        toast.error(t('support.errorMessage'), {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
        });
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error(t('support.errorMessage'), {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <section
        className={classNames(
          'min-h-screen flex items-center justify-center',
          IS_ZOOM_BIGGER_THAN_100 && 'pt-16',
        )}
      >
        <div className="w-full max-w-4xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <aside className="col-span-full md:col-span-6 flex flex-col items-center">
              <img
                src={getLogoByTheme('default', 'type')}
                alt={`${config.name} Logo`}
                className="pb-8 w-3/4"
              />

              <div className="flex flex-col gap-6 w-full max-w-[368px]">
                {config.supportWhatsapp && (
                  <a
                    href={`https://api.whatsapp.com/send?phone=${config.supportWhatsapp}&text=Ol%C3%A1,%20Tudo%20bem?%0A%0APreciso%20de%20ajuda%20sobre%20os%20produtos...`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-[24px] shadow-sm transition hover:bg-opacity-20"
                    style={{
                      borderColor: `${config.colors.text}33`,
                      borderWidth: '1px',
                      borderStyle: 'solid',
                      backgroundColor: 'transparent',
                      color: config.colors.text,
                    }}
                  >
                    <FaWhatsapp size={32} className="text-green-500" />
                    <span className="font-semibold text-lg">WhatsApp</span>
                  </a>
                )}

                {config.socialMedia.instagram &&
                  config.socialMedia.instagram.trim() !== '' && (
                    <a
                      href={config.socialMedia.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-4 rounded-[24px] shadow-sm transition hover:bg-opacity-20"
                      style={{
                        borderColor: `${config.colors.text}33`,
                        borderWidth: '1px',
                        borderStyle: 'solid',
                        backgroundColor: 'transparent',
                        color: config.colors.text,
                      }}
                    >
                      <FaInstagram size={32} className="text-pink-500" />
                      <span className="font-semibold text-lg">Instagram</span>
                    </a>
                  )}

                {config.socialMedia.twitter &&
                  config.socialMedia.twitter.trim() !== '' && (
                    <a
                      href={config.socialMedia.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-4 rounded-[24px] shadow-sm transition hover:bg-opacity-20"
                      style={{
                        borderColor: `${config.colors.text}33`,
                        borderWidth: '1px',
                        borderStyle: 'solid',
                        backgroundColor: 'transparent',
                        color: config.colors.text,
                      }}
                    >
                      <FaXTwitter
                        size={32}
                        style={{ color: config.colors.text }}
                      />
                      <span className="font-semibold text-lg">X</span>
                    </a>
                  )}

                {config.socialMedia.facebook &&
                  config.socialMedia.facebook.trim() !== '' && (
                    <a
                      href={config.socialMedia.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-4 rounded-[24px] shadow-sm transition hover:bg-opacity-20"
                      style={{
                        borderColor: `${config.colors.text}33`,
                        borderWidth: '1px',
                        borderStyle: 'solid',
                        backgroundColor: 'transparent',
                        color: config.colors.text,
                      }}
                    >
                      <FaFacebook size={32} className="text-blue-500" />
                      <span className="font-semibold text-lg">Facebook</span>
                    </a>
                  )}

                {config.socialMedia.telegram &&
                  config.socialMedia.telegram.trim() !== '' && (
                    <a
                      href={config.socialMedia.telegram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-4 rounded-[24px] shadow-sm transition hover:bg-opacity-20"
                      style={{
                        borderColor: `${config.colors.text}33`,
                        borderWidth: '1px',
                        borderStyle: 'solid',
                        backgroundColor: 'transparent',
                        color: config.colors.text,
                      }}
                    >
                      <FaTelegram size={32} className="text-blue-400" />
                      <span className="font-semibold text-lg">Telegram</span>
                    </a>
                  )}

                {config.socialMedia.linkedin &&
                  config.socialMedia.linkedin.trim() !== '' && (
                    <a
                      href={config.socialMedia.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-4 rounded-[24px] shadow-sm transition hover:bg-opacity-20"
                      style={{
                        borderColor: `${config.colors.text}33`,
                        borderWidth: '1px',
                        borderStyle: 'solid',
                        backgroundColor: 'transparent',
                        color: config.colors.text,
                      }}
                    >
                      <FaLinkedin size={32} className="text-blue-600" />
                      <span className="font-semibold text-lg">LinkedIn</span>
                    </a>
                  )}
              </div>
            </aside>

            <article className="col-span-full md:col-span-6 flex items-center justify-center">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full max-w-[370px] p-8 rounded-lg flex flex-col gap-y-6"
              >
                <h3
                  className="font-bold text-lg md:text-2xl text-center"
                  style={{ color: config.colors.text }}
                >
                  {t('support.sendMessage')}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <input
                    type="text"
                    {...register('firstName', { required: true })}
                    placeholder={t('support.firstName')}
                    className="p-3 rounded-lg focus:outline-none"
                    style={{
                      backgroundColor: config.colors.secondary,
                      color: config.colors.text,
                      borderColor: `${config.colors.text}33`,
                      borderWidth: '1px',
                      borderStyle: 'solid',
                    }}
                  />
                  <input
                    type="text"
                    {...register('lastName', { required: true })}
                    placeholder={t('support.lastName')}
                    className="p-3 rounded-lg focus:outline-none"
                    style={{
                      backgroundColor: config.colors.secondary,
                      color: config.colors.text,
                      borderColor: `${config.colors.text}33`,
                      borderWidth: '1px',
                      borderStyle: 'solid',
                    }}
                  />
                </div>
                <input
                  type="email"
                  {...register('email', { required: true })}
                  placeholder={t('support.email')}
                  className="p-3 rounded-lg focus:outline-none"
                  style={{
                    backgroundColor: config.colors.secondary,
                    color: config.colors.text,
                    borderColor: `${config.colors.text}33`,
                    borderWidth: '1px',
                    borderStyle: 'solid',
                  }}
                />
                <textarea
                  {...register('message', { required: true })}
                  placeholder={t('support.message')}
                  className="p-3 rounded-lg focus:outline-none"
                  style={{
                    backgroundColor: config.colors.secondary,
                    color: config.colors.text,
                    borderColor: `${config.colors.text}33`,
                    borderWidth: '1px',
                    borderStyle: 'solid',
                  }}
                ></textarea>

                <button
                  type="submit"
                  className="w-full p-3 rounded-lg font-bold transition flex items-center justify-center hover:opacity-90"
                  style={{
                    backgroundColor: config.colors.primary,
                    color: config.colors.text,
                  }}
                  disabled={isLoading}
                >
                  {t('support.send')}
                </button>
              </form>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
