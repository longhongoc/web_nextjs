'use client';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useEffect, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Link as SwitchLang } from '@/i18n/navigation';
import clsx from 'clsx';

export default function Page() {
  const t = useTranslations('Registration');
  const path = useLocale();

  type RegistrationData = {
    id: number;
    full_name: string;
    email: string;
    password: string;
    age: number;
    gender: string;
    terms: boolean;
  };

  type RegisterFormData = z.infer<typeof registerSchema>;

  const [totalData, setTotalData] = useState<RegistrationData[]>([]);
  const [tableRow, setTableRow] = useState<number | null>(null);
  const [serverError, setServerError] = useState('');
  const [serverDelete, setServerDelete] = useState(false);

  const fetchTotalData = useCallback(() => {
    fetch('/api/registration')
      .then((res) => res.json())
      .then((data) => setTotalData(data));
  }, []);

  useEffect(() => {
    fetchTotalData();
  }, [fetchTotalData]);

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
      await fetch('/api/registration', {
        method: 'POST',
        body: JSON.stringify(data),
      });
      alert('Đăng ký thành công!');
      fetchTotalData();
    } catch (err: unknown) {
      setServerError('Có lỗi xảy ra, vui lòng thử lại.' + err);
    }
  };

  const deleteSubmit = async (id: number) => {
    setServerDelete(true);
    const res = await fetch(`/api/registration/${id}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      setServerDelete(false);
      setTotalData((prev) => prev.filter((u) => u.id !== id));
      alert('User deleted!');
    } else {
      alert('Failed to delete user');
    }
  };

  return (
    <div className=" w-sceen flex flex-col items-center justify-items-center bg-[#FAF8ED]">
      <main className=" relative w-[1440px] flex flex-col gap-[32px] items-center p-12">
        <button className=" absolute top-2 left-2 h-[40px] w-[70px] flex rounded-2xl shadow-2xl text-xl bg-white border-2 border-red-400 hover:bg-red-400 hover:text-white ">
          <Link
            href={'/'}
            className=" h-full w-full flex items-center justify-center"
          >
            {t('Back')}
          </Link>
        </button>
        <div className=" absolute right-2 top-2 h-[50px] w-[100px] m-auto p-2">
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
        <section className=" h-[620px] w-[600px] shadow-2xl rounded-2xl bg-white p-4 overflow-y-scroll hide-scrollbar">
          <h1 className=" text-center text-20-20-600 text-[#2D3134]">
            {t('Registration Form')}
          </h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className=" flex flex-col gap-[15px]"
          >
            <div>
              <label>{t('Fullname')}</label>
              <input
                type="text"
                {...register('fullName')}
                className="w-full border rounded-md p-2"
                placeholder="ex: Nguyen Van A,..."
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
                placeholder="ex: Anguyen@gmai.com,..."
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
                placeholder="ex: 18, 19, 20,...."
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
        <section className=" h-[550px] w-[800px] shadow-2xl rounded-2xl bg-white p-4 overflow-y-scroll hide-scrollbar mt-12">
          <h1 className=" text-20-20-600 text-center">{t('Data Table')}</h1>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  {t('ID')}
                </th>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  {t('Fullname')}
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  {t('Email')}
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  {t('Age')}
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  {t('Gender')}
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  {t('Terms')}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white text-center">
              {totalData?.map((res, index) => (
                <tr
                  key={index}
                  className={clsx(
                    ' relative w-full hover:bg-amber-100 cursor-pointer border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg',
                    { ' bg-blue-300': index === tableRow }
                  )}
                  onClick={() => setTableRow(index)}
                >
                  <td className="whitespace-nowrap px-2 py-3">{res.id}</td>
                  <td className="whitespace-nowrap px-2 py-3">
                    {res.full_name}
                  </td>
                  <td className="whitespace-nowrap px-2 py-3">{res.email}</td>
                  <td className="whitespace-nowrap px-2 py-3">{res.age}</td>
                  <td className="whitespace-nowrap px-2 py-3">
                    {t(`${res.gender}`)}
                  </td>
                  <td className="whitespace-nowrap px-2 py-3">
                    <input type="checkbox" checked={res.terms} disabled />
                  </td>
                  {index === tableRow && (
                    <td className="whitespace-nowrap px-2 py-3">
                      <button
                        className=" bg-red-500 p-[10px] rounded-2xl cursor-pointer text-16-26-400 hover:bg-red-300"
                        onClick={() => deleteSubmit(res.id)}
                      >
                        {serverDelete ? 'Loading...' : 'Delete'}
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}
