'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import clsx from 'clsx';
import Slider from 'react-slick';
import { useTranslations } from 'next-intl';
import { infor, picArrays, navigation } from '@/utils/constants';
import { useCurrentLocale, useCurrentLanguage } from './provider';

export default function Home() {
  const t = useTranslations('TravellingPage');
  const setLocale = useCurrentLocale();
  const currentLanguage = useCurrentLanguage();
  const sliderRef = useRef<Slider | null>(null);
  const [active, setActive] = useState(0);

  const settings = {
    className: 'center',
    infinite: true,
    centerPadding: '60px',
    slidesToShow: 6,
    swipeToSlide: true,
  };

  return (
    <div className=" w-sceen flex flex-col items-center justify-items-center bg-[#FAF8ED]">
      <main className=" w-[1440px] flex flex-col gap-[32px] items-center">
        <div className=" w-full h-[720px]">
          <div className=" w-[1440px] h-[102px] flex items-center  px-[135px] py-[24px]">
            <Image
              src="/png/Logo.png"
              alt="Salty Logo"
              width={98}
              height={35}
              className=" max-w-[98px] max-h-fit object-cover py-[9px]"
            />
            <div className=" w-[519px] h-[24px] ml-[72px] flex gap-[36px] text-16-16-400">
              {navigation.map((res, index) => (
                <Link
                  key={index}
                  href={'/#'}
                  onClick={() => setActive(index)}
                  className={clsx('', {
                    'border-b-[2px] border-[#F66F4D]': index === active,
                  })}
                >
                  {t(`${res}`)}
                </Link>
              ))}
            </div>
            <Link
              href={'/registration'}
              className=" h-[54px] w-[170px] ml-[233px] flex items-center justify-center border-[1.4px] border-[#F66F4D] text-[16px] font-medium leading-[16px] rounded-full cursor-pointer"
            >
              <p className=" text-[#F66F4D]">{t('Book Now')}</p>
              <Image
                src="/svg/Vector.svg"
                alt="Vector Icon"
                width={16}
                height={15}
                className=" max-w-[16px] max-h-fit object-cover"
              ></Image>
            </Link>
            {/* <div className=" h-[90px] w-[150px] p-6">
              <div className=" h-full w-full flex items-center justify-around bg-white shadow rounded-2xl">
                <SwitchLang
                  href="/"
                  locale="en"
                  className={clsx(
                    'h-full w-1/2 rounded-l-2xl flex items-center justify-center',
                    {
                      'bg-[#FFD482] text-white': path === 'en',
                    }
                  )}
                >
                  EN
                </SwitchLang>
                <SwitchLang
                  href="/"
                  locale="ja"
                  className={clsx(
                    'h-full w-1/2 rounded-r-2xl flex items-center justify-center',
                    {
                      'bg-[#FFD482] text-white': path === 'ja',
                    }
                  )}
                >
                  JA
                </SwitchLang>
              </div>
            </div> */}
            <div className="h-[90px] w-[150px] p-6">
              <div className=" h-full w-full flex items-center justify-around bg-white shadow rounded-2xl">
                <button
                  onClick={() => setLocale('en')}
                  className={clsx(
                    'h-full w-1/2 rounded-l-2xl flex items-center justify-center',
                    {
                      'bg-[#FFD482] text-white': currentLanguage === 'en',
                    }
                  )}
                >
                  EN
                </button>
                <button
                  onClick={() => setLocale('ja')}
                  className={clsx(
                    'h-full w-1/2 rounded-r-2xl flex items-center justify-center',
                    {
                      'bg-[#FFD482] text-white': currentLanguage === 'ja',
                    }
                  )}
                >
                  JA
                </button>
              </div>
            </div>
          </div>
          <div className=" h-[618px] w-full flex gap-[67px]">
            <section className=" h-[460px] w-[577px] flex flex-col justify-center gap-4 mt-[74px] ml-[135px]">
              <h1 className=" text-84-86-700 font-sen">{t('title')}</h1>
              <p className=" w-[500px] h-[56px] text-18-28-400 font-inter mt-[26px]">
                {t('description')}
              </p>
              <div className=" h-[76px] w-[500px] flex justify-around rounded-full items-center mt-[44px] p-2 bg-[#FFFFFFB2] font-inter">
                <div className=" w-2/5 h-full flex flex-col justify-center border-r-2 border-[#F66F4D0D]">
                  <span className=" text-18-18-500">{t('where')}</span>
                  <div className=" w-full flex">
                    <input
                      type="text"
                      placeholder={t('input')}
                      className=" text-12-12-400"
                    />
                    <Image
                      src="/svg/VectorLocation.svg"
                      alt="VectorLocation"
                      width={9}
                      height={13}
                      className=" max-w-[9px] max-h-fit object-cover"
                    />
                  </div>
                </div>
                <div className=" w-2/5 h-full flex flex-col justify-center">
                  <span className=" text-18-18-500">{t('date')}</span>
                  <input type="date" className=" text-12-12-400" />
                </div>
                <button className=" cursor-pointer">
                  <Image
                    src="/svg/IconSearch.svg"
                    alt="IconSearch"
                    width={54}
                    height={54}
                    className=" max-w-[54px] max-h-fit object-cover"
                  />
                </button>
              </div>
            </section>
            <Image
              src="/png/Image.png"
              alt="Image"
              width={555}
              height={550}
              className=" max-h-[555px] max-w-fit object-cover"
            />
          </div>
        </div>
        <div className=" h-[542px] w-full flex flex-col font-inter px-[135px] gap-[60px]">
          <div className=" flex pt-[18px]">
            <section className=" h-full w-3/5 flex flex-col gap-[24px]">
              <h1 className=" text-[56px] leading-[56px] font-semibold text-[#2D3134]">
                {t('title_categories')}
              </h1>
              <p className=" w-[370px] h-[78px] text-16-26-400 text-[#5B5F62]">
                {t('description_categories')}
              </p>
            </section>
            <div className=" h-full w-2/5 flex gap-[16px] justify-end pr-[3%]">
              <button
                className=" cursor-pointer"
                onClick={() => sliderRef.current?.slickPrev()}
              >
                <Image
                  src="/svg/Arrowleft.svg"
                  alt="Arrowleft"
                  width={54}
                  height={54}
                  className=" max-w-[54px] max-h-fit object-cover "
                />
              </button>
              <button
                className=" cursor-pointer"
                onClick={() => sliderRef.current?.slickNext()}
              >
                <Image
                  src="/svg/Arrowright.svg"
                  alt="Arrowright"
                  width={54}
                  height={54}
                  className=" max-w-[54px] max-h-fit object-cover"
                />
              </button>
            </div>
          </div>
          <div className=" h-3/5 w-[1170px] flex justify-between items-center">
            <div className="slider-container w-full">
              <Slider ref={sliderRef} {...settings}>
                {picArrays.map((res, index) => (
                  <div
                    key={index}
                    className=" !w-[170px] h-[274px] !flex flex-col justify-center items-center"
                  >
                    <Image
                      src={res.pic}
                      alt={res.alt}
                      width={170}
                      height={230}
                      className=" max-w-[170px] max-h-fit object-cover m-auto"
                    />
                    <h2 className=" text-[26px] leading-[26px] font-medium mt-[18px]">
                      {t(`${res.alt}`)}
                    </h2>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
        <div className=" w-full h-[682px] flex items-center">
          <div className=" w-1/2 h-full relative flex">
            <Image
              src="/png/Images.png"
              alt="Images"
              width={490}
              height={560}
              className=" max-w-[490px] max-h-fit object-cover mt-[50px] ml-[121px]"
            />
            <div className=" h-[218px] w-[140px] absolute left-[70px] top-[307px] bg-white rounded-2xl flex flex-col items-center justify-around font-poppins">
              <Image
                src="/svg/IconImages.svg"
                alt="Images"
                width={80}
                height={80}
                className=" max-w-[80px] max-h-fit object-cover"
              />
              <h2 className=" text-[#F66F4D] text-[30px] leading-[30px] font-semibold">
                600%
              </h2>
              <p className=" text-[#5B5F62] text-[19px] leading-[30px] font-normal">
                {t('DestinationsFeature')}
              </p>
            </div>
            <div className=" h-[92px] w-[171px] absolute left-[424px] bottom-[50px] flex bg-white rounded-2xl font-poppins">
              <Image
                src="/svg/IconImages2.svg"
                alt="Images"
                width={60}
                height={60}
                className=" max-w-[60px] max-h-fit object-cover m-auto"
              />
              <div className="  flex flex-col items-center justify-center gap-2">
                <h2 className=" text-[#2D3134] text-[28px] leading-[30px] font-semibold">
                  5000+
                </h2>
                <span className=" text-[#5B5F62]">{t('Customers')}</span>
              </div>
            </div>
          </div>
          <div className=" w-1/2 h-full flex flex-col gap-4 justify-center font-inter">
            <span className=" text-20-20-600">Our Experience</span>
            <h2 className=" text-[56px] leading-[66px] font-semibold text-[#2D3134]">
              {t('title_feature')}
            </h2>
            <p className=" w-[467px] h-[104px] text-[#5B5F62] text-16-26-400">
              {t('description_feature')}
            </p>
            <div className=" flex items-center gap-[20px] mt-[40px]">
              {infor.map((res, index) => (
                <div
                  key={index}
                  className=" h-[178px] w-[166px] flex flex-col justify-around rounded-2xl items-center bg-[#FFFFFFB2] p-4"
                >
                  <p className=" text-[46px] leading-[46px] font-semibold text-[#F66F4D]">
                    {res.numbers}
                  </p>
                  <p className=" text-[21px] leading-[29px] font-normal text-center text-[#939597]">
                    {t(`${res.text}`)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <footer className=" w-[1440px] h-[339px] flex font-inter">
        <div className=" w-[141px] h-[179px] ml-[135px] mt-[79px] flex flex-col justify-between">
          <Image
            src="/png/Logo.png"
            alt="Salty Logo"
            width={98}
            height={35}
            className=" max-w-[98px] max-h-fit object-cover"
          />
          <p className=" w-[141px] h-[52px] text-[16px] leading-[26px] font-normal text-[#5B5F62]">
            {t('Enjoy the touring with Salty')}
          </p>
          <div className=" w-[124px] h-[32px] flex justify-between items-center">
            <button>
              <Image
                src="/svg/IConFB.svg"
                alt="Facebook Icon"
                width={32}
                height={32}
                className=" max-w-[32px] max-h-[32px] object-cover"
              />
            </button>
            <button>
              <Image
                src="/svg/IConIG.svg"
                alt="Instagram Icon"
                width={32}
                height={32}
                className=" max-w-[32px] max-h-[32px] object-cover"
              />
            </button>
            <button>
              <Image
                src="/svg/IConX.svg"
                alt="X Icon"
                width={32}
                height={32}
                className=" max-w-[32px] max-h-[32px] object-cover"
              />
            </button>
          </div>
        </div>
        <div className="  w-[754px] h-[176px] grid gap-[22px] mt-[84px] ml-[275px]">
          <section className=" grid grid-cols-4 gap-[114px]">
            <h3 className=" text-18-18-500">{t('Resources')}</h3>
            <h3 className=" text-18-18-500">{t('Travellers')}</h3>
            <h3 className=" text-18-18-500">{t('Company')}</h3>
            <h3 className=" text-18-18-500">{t('Get Apps')}</h3>
          </section>
          <section className=" grid grid-cols-4 gap-x-[113px] gap-y-2">
            <div>
              <Link href="#" className=" text-14-34-400">
                {t('Download')}
              </Link>
              <Link href="#" className=" text-14-34-400">
                {t('Help Center')}
              </Link>
              <Link href="#" className=" text-14-34-400">
                {t('Guide Book')}
              </Link>
              <Link href="#" className=" text-14-34-400">
                {t('Travelling')}
              </Link>
            </div>
            <div className=" w-[115px]">
              <Link href="#" className=" text-14-34-400">
                {t('Why Travellers')}
              </Link>
              <Link href="#" className=" text-14-34-400">
                {t('Enterprice')}
              </Link>
              <Link href="#" className=" w-fit text-14-34-400">
                {t('Customer Stories')}
              </Link>
              <Link href="#" className=" text-14-34-400">
                {t('Instagram Post')}
              </Link>
            </div>
            <div>
              <Link href="#" className=" text-14-34-400">
                {t('App Directory')}
              </Link>
              <Link href="#" className=" text-14-34-400">
                {t('About Locato')}
              </Link>
              <Link href="#" className=" text-14-34-400">
                {t('Success')}
              </Link>
              <Link href="#" className=" text-14-34-400">
                {t('Information')}
              </Link>
            </div>
            <div>
              <Link href="#" className=" text-14-34-400">
                {t('App Store')}
              </Link>
              <Link href="#" className=" text-14-34-400">
                {t('Google Play')}
              </Link>
            </div>
          </section>
        </div>
      </footer>
    </div>
  );
}
