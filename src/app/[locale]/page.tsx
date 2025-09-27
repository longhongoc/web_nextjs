'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Link as SwitchLang } from '@/i18n/navigation';
import { useRef, useState } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import clsx from 'clsx';
import Slider from 'react-slick';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { infor, picArrays, navigation } from '@/utils/constants';

export default function Home() {
  const t = useTranslations('TravellingPage');
  const path = useLocale();
  const sliderRef = useRef<Slider | null>(null);
  const [active, setActive] = useState(0);

  const settings = {
    className: 'center',
    infinite: true,
    centerPadding: '60px',
    slidesToShow: 5,
    swipeToSlide: true,
  };

  return (
    <div className=" w-[calc(100vw-16px)] font-sans flex flex-col items-center justify-items-center bg-[#FAF8ED]">
      <main className=" w-full flex flex-col gap-[32px] items-center px-44">
        <div className=" w-full h-screen">
          <div className=" w-full h-1/8 flex justify-around items-center">
            <div className=" w-1/8 flex  items-center">
              <Image src="/Logo.png" alt="Salty Logo" width={125} height={90} />
            </div>
            <div className=" h-full w-7/8 flex justify-around items-center font-poppins">
              <div className=" h-full w-3/4 flex justify-start items-center gap-20 text-xl pl-4">
                {navigation.map((res, index) => (
                  <Link
                    key={index}
                    href="#"
                    onClick={() => setActive(index)}
                    className={clsx({
                      ' border-b-2 border-[#F66F4D]': index === active,
                    })}
                  >
                    {t(`${res}`)}
                  </Link>
                ))}
              </div>
              <Link
                href={'/registration'}
                className=" h-1/2 w-1/8 flex items-center justify-center border-2 border-[#F66F4D] rounded-2xl cursor-pointer"
              >
                <p className=" text-[#F66F4D]">{t('Book Now')}</p>
                <Image
                  src="/Vector.svg"
                  alt="Vector Icon"
                  width={30}
                  height={30}
                ></Image>
              </Link>
              <div className=" h-full w-1/8 m-auto p-6">
                <div className=" h-full w-full flex items-center justify-around bg-white shadow rounded-2xl">
                  <SwitchLang
                    href="/"
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
                    href="/"
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
            </div>
          </div>
          <div className=" w-full h-7/8 flex justify-around items-center">
            <section className=" h-full w-1/2 flex flex-col justify-center gap-4">
              <h1 className=" text-6xl font-semibold  text-[#2D3134] font-sen">
                {t('title')}
              </h1>
              <p className=" text-[#5B5F62] text-xl">{t('description')}</p>
              <div className=" h-[15%] w-full flex justify-around rounded-full items-center p-2 bg-[#FFFFFFB2] font-inter">
                <div className=" w-2/5 h-full flex flex-col justify-center border-r-2 border-[#F66F4D0D]">
                  <span className=" text-[#2D3134] text-xl font-medium">
                    {t('where')}
                  </span>
                  <div className=" w-full flex">
                    <input type="text" placeholder={t('input')} />
                    <Image
                      src="/VectorLocation.svg"
                      alt="VectorLocation"
                      width={15}
                      height={15}
                    />
                  </div>
                </div>
                <div className=" w-2/5 h-full flex flex-col justify-center">
                  <span className=" text-[#2D3134] text-xl font-medium">
                    {t('date')}
                  </span>
                  <input type="date" className=" font-light" />
                </div>
                <button className=" cursor-pointer">
                  <Image
                    src="/IconSearch.svg"
                    alt="IconSearch"
                    width={45}
                    height={45}
                  />
                </button>
              </div>
            </section>
            <div className=" h-full w-1/2 flex justify-center items-center">
              <Image src="/Image.png" alt="Image" width={550} height={550} />
            </div>
          </div>
        </div>
        <div className=" h-screen w-full flex flex-col justify-center font-inter">
          <div className=" flex">
            <section className=" h-full w-3/5 flex flex-col justify-center gap-4">
              <h1 className=" text-5xl font-semibold text-[#2D3134]">
                {t('title_categories')}
              </h1>
              <p className=" w-2/3 text-xl text-[#5B5F62]">
                {t('description_categories')}
              </p>
            </section>
            <div className=" h-full w-2/5 flex gap-6 justify-end pr-[3%]">
              <button
                className=" cursor-pointer"
                onClick={() => sliderRef.current?.slickPrev()}
              >
                <Image
                  src="/Arrowleft.svg"
                  alt="Arrowleft"
                  width={60}
                  height={60}
                />
              </button>
              <button
                className=" cursor-pointer"
                onClick={() => sliderRef.current?.slickNext()}
              >
                <Image
                  src="/Arrowright.svg"
                  alt="Arrowright"
                  width={60}
                  height={60}
                />
              </button>
            </div>
          </div>
          <div className=" h-3/5 w-full flex justify-between items-center">
            <div className="slider-container w-full">
              <Slider ref={sliderRef} {...settings}>
                {picArrays.map((res, index) => (
                  <div
                    key={index}
                    className=" text-2xl font-semibold text-center !flex flex-col justify-center items-center"
                  >
                    <Image
                      src={res.pic}
                      alt={res.alt}
                      className=" block object-cover"
                      width={125}
                      height={125}
                    />
                    <h2 className=" font-medium">{t(`${res.alt}`)}</h2>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
        <div className=" w-full h-screen flex items-center">
          <div className=" relative flex flex-3/5 justify-center items-center">
            <Image src="/Images.png" alt="Images" width={500} height={500} />
            <div className=" h-1/4 w-1/6 absolute left-10 bottom-32 bg-white rounded-2xl flex flex-col items-center justify-around ">
              <Image
                src="/IConImages.svg"
                alt="Images"
                width={50}
                height={50}
              />
              <h2 className=" text-[#F66F4D] text-3xl font-semibold">600%</h2>
              <p className=" text-[#5B5F62]">{t('DestinationsFeature')}</p>
            </div>
            <div className=" h-1/6 w-1/4 absolute right-24 bottom-6 flex bg-white rounded-2xl ">
              <Image
                src="/IConImages2.svg"
                alt="Images"
                width={55}
                height={55}
              />
              <div className=" h-full w-full flex flex-col items-center justify-center gap-2">
                <h2 className=" text-[#2D3134] text-3xl font-semibold">
                  5000+
                </h2>
                <span className=" text-[#5B5F62]">{t('Customers')}</span>
              </div>
            </div>
          </div>
          <div className=" h-full flex flex-2/5 flex-col gap-4 justify-center font-inter">
            <span className=" text-3xl text-[#F66F4D]">Our Experience</span>
            <h2 className=" text-5xl font-semibold text-[#2D3134]">
              {t('title_feature')}
            </h2>
            <p className=" text-[#5B5F62] text-xl">
              {t('description_feature')}
            </p>
            <div className=" h-1/6 flex justify-between items-center">
              {infor.map((res, index) => (
                <div
                  key={index}
                  className=" h-full w-1/4 flex flex-col justify-around rounded-2xl items-center bg-[#FFFFFFB2]"
                >
                  <p className=" font-semibold text-3xl text-[#F66F4D]">
                    {res.numbers}
                  </p>
                  <p className=" font-medium text-xl text-center text-[#939597]">
                    {t(`${res.text}`)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <footer className=" w-full flex p-6 font-inter">
        <div className=" flex flex-col flex-1/4 justify-center items-center gap-4">
          <Image src="/Logo.png" alt="Salty Logo" width={150} height={100} />
          <p className=" text-[#5B5F62]">{t('Enjoy the touring with Salty')}</p>
          <div className=" flex gap-4">
            <button>
              <Image
                src="/IConFB.svg"
                alt="Facebook Icon"
                width={50}
                height={50}
              />
            </button>
            <button>
              <Image
                src="/IConIG.svg"
                alt="Instagram Icon"
                width={50}
                height={50}
              />
            </button>
            <button>
              <Image src="/IConX.svg" alt="X Icon" width={50} height={50} />
            </button>
          </div>
        </div>
        <div className=" flex flex-3/4 justify-around">
          <section className=" h-2/3 flex flex-col gap-4">
            <h3>{t('Resources')}</h3>
            <Link href="#">{t('Download')}</Link>
            <Link href="#">{t('Help Center')}</Link>
            <Link href="#">{t('Guide Book')}</Link>
            <Link href="#">{t('App Directory')}</Link>
          </section>
          <section className=" h-2/3 flex flex-col gap-4">
            <h3>{t('Travellers')}</h3>
            <Link href="#">{t('Why Travellers')}</Link>
            <Link href="#">{t('Enterprice')}</Link>
            <Link href="#">{t('Customer Stories')}</Link>
            <Link href="#">{t('Instagram Post')}</Link>
          </section>
          <section className=" h-2/3 flex flex-col gap-4">
            <h3>{t('Company')}</h3>
            <Link href="#">{t('Travelling')}</Link>
            <Link href="#">{t('About Locato')}</Link>
            <Link href="#">{t('Success')}</Link>
            <Link href="#">{t('Information')}</Link>
          </section>
          <section className=" h-2/3 flex flex-col gap-4">
            <h3>{t('Get Apps')}</h3>
            <Link href="#">{t('App Store')}</Link>
            <Link href="#">{t('Google Play')}</Link>
          </section>
        </div>
      </footer>
    </div>
  );
}
