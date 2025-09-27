'use client';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Link as SwitchLang } from '@/i18n/navigation';
import clsx from 'clsx';

export default function Page() {
  const t = useTranslations('Registration');
  const path = useLocale();
  const registerSchema = z
    .object({
      fullName: z
        .string()
        .min(3, 'Fullname must be at least 3 characters')
        .max(50, 'Fullname up to 50 characters'),
      email: z.email('Invalid Email'),
      password: z
        .string()
        .min(8, 'Password must be at least 8 characters')
        .regex(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/,
          'Password must contain uppercase, lowercase, numbers and special characters'
        ),
      confirmPassword: z.string().min(1, 'Password must not be empty'),
      age: z
        .number({ message: 'Age must be numbers' })
        .min(18, 'Age must be greater than or equal to 18')
        .max(100, 'Age must be less than or equal to 100'),
      gender: z.enum(['male', 'female', 'other'], {
        message: 'Please choose gender',
      }),
      terms: z.literal(true, {
        message: 'You must agree with terms',
      }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      path: ['confirmPassword'],
      message: 'Invalid Password',
    });

  type RegisterFormData = z.infer<typeof registerSchema>;

  const [serverError, setServerError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    setServerError('');
    try {
      // Ví dụ gọi API
      console.log('Form data:', data);
      alert('Đăng ký thành công!');
    } catch (err: unknown) {
      setServerError('Có lỗi xảy ra, vui lòng thử lại.' + err);
    }
  };

  return (
    <div className=" h-screen w-screen font-inter flex flex-col items-center justify-items-center bg-[#FAF8ED]">
      <main className=" relative h-full w-full flex items-center justify-center">
        <button className=" absolute top-2 left-2 h-[7%] w-[4%] flex rounded-2xl shadow-2xl text-xl bg-white border-2 border-red-400 hover:bg-red-400 hover:text-white ">
          <Link
            href={'/'}
            className=" h-full w-full flex items-center justify-center"
          >
            {t('Back')}
          </Link>
        </button>
        <div className=" absolute right-2 top-2 h-1/12 w-1/12 m-auto p-2">
          <div className=" h-full w-full flex items-center justify-around bg-white shadow rounded-2xl">
            <SwitchLang
              href="/registration"
              locale="en"
              className={clsx(
                'h-full w-1/2 rounded-l-2xl flex items-center justify-center',
                {
                  'bg-amber-200 text-white': path === 'en',
                }
              )}
            >
              EN
            </SwitchLang>
            <SwitchLang
              href="/registration"
              locale="ja"
              className={clsx(
                'h-full w-1/2 rounded-r-2xl flex items-center justify-center',
                {
                  'bg-amber-200 text-white': path === 'ja',
                }
              )}
            >
              JA
            </SwitchLang>
          </div>
        </div>
        <section className=" h-4/5 w-2/5 shadow-2xl rounded-2xl bg-white p-4 overflow-y-scroll hide-scrollbar">
          <h1 className=" text-center text-4xl text-[#2D3134]">
            {t('Registration Form')}
          </h1>
          <form onSubmit={handleSubmit(onSubmit)} className="">
            <div>
              <label>{t('Fullname')}</label>
              <input
                type="text"
                {...register('fullName')}
                className="w-full border rounded-md p-2"
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm">
                  {t(`${errors.fullName.message}`)}
                </p>
              )}
            </div>

            <div>
              <label>{t('Email')}</label>
              <input
                type="email"
                {...register('email')}
                className="w-full border rounded-md p-2"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">
                  {t(`${errors.email.message}`)}
                </p>
              )}
            </div>

            <div>
              <label>{t('Password')}</label>
              <input
                type="password"
                {...register('password')}
                className="w-full border rounded-md p-2"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {t(`${errors.password.message}`)}
                </p>
              )}
            </div>

            <div>
              <label>{t('Confirm Password')}</label>
              <input
                type="password"
                {...register('confirmPassword')}
                className="w-full border rounded-md p-2"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">
                  {t(`${errors.confirmPassword.message}`)}
                </p>
              )}
            </div>

            <div>
              <label>{t('Age')}</label>
              <input
                type="number"
                {...register('age', { valueAsNumber: true })}
                className="w-full border rounded-md p-2"
              />
              {errors.age && (
                <p className="text-red-500 text-sm">
                  {t(`${errors.age.message}`)}
                </p>
              )}
            </div>

            <div>
              <label>{t('Gender')}</label>
              <select
                {...register('gender')}
                className="w-full border rounded-md p-2"
              >
                <option value="">{t('-- Select Gender --')}</option>
                <option value="male">{t('Male')}</option>
                <option value="female">{t('Female')}</option>
                <option value="other">{t('Others')}</option>
              </select>
              {errors.gender && (
                <p className="text-red-500 text-sm">
                  {t(`${errors.gender.message}`)}
                </p>
              )}
            </div>

            <div className="flex items-center gap-2">
              <input type="checkbox" {...register('terms')} />
              <span>
                {t('I agree with ')}
                <a href="#" className="text-blue-600">
                  {t('terms')}
                </a>
              </span>
            </div>
            {errors.terms && (
              <p className="text-red-500 text-sm">
                {t(`${errors.terms.message}`)}
              </p>
            )}

            {serverError && (
              <p className="text-red-600 text-sm mb-2">{t(`${serverError}`)}</p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {isSubmitting ? t('Loading') : t('Register')}
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}
