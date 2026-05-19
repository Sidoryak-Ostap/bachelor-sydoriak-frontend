import { NavLink } from 'react-router';
import { IMG } from '../../assets';
import { ROUTES } from '../../constants/ROUTES';
import { useTranslation } from 'react-i18next';

const ResetComplete = () => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col items-center justify-center max-w-87.5 w-full mx-auto my-0">
      <div className="px-3.5 py-2.5 rounded-xl bg-[#F4F4F4] mb-4">
        <img src={IMG.moreImg} alt="dots" className="w-8 h-8" />
      </div>

      <div className="mb-6">
        <h2 className="font-bold text-4xl text-black text-center mb-4">
          {t('resetPassword.success.title')}
        </h2>
        <p className="text-[#6C6C6C] text-base text-center">
          {t('resetPassword.success.description')}
        </p>
      </div>

      <NavLink
        className="cursor-pointer font-medium w-full text-center bg-[#1A5E52] py-2.5 px-3 rounded-lg"
        to={ROUTES.login}
      >
        {t('resetPassword.success.actBtn')}
      </NavLink>
    </div>
  );
};

export default ResetComplete;
