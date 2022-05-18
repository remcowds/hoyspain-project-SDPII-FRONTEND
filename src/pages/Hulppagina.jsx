import React from 'react'
import { FormProvider } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import Title from '../Components/Extra components/Title'
import Footer from '../Components/Global Components/Footer'
import NavBar from '../Components/Global Components/NavBar'
import Boogjes from '../Components/Landingspage/Boogjes'
import GridField from '../Components/Registratie/GridField'
import Airplan from '../Images/Hulppagina/airplan.jpg'
const Hulppagina = () => {
  const {t} = useTranslation();
  const validationRules = {
    emailAdres: {
      required: true,
    },
    vraag: {
      required: true,
    },
  };
  const titelTekst = [
    {titel: t('hulp.q1.q'),tekst:t('hulp.q1.a')},
    {titel: t('hulp.q2.q'),tekst:t('hulp.q2.a')},
    {titel: t('hulp.q3.q'),tekst:t('hulp.q3.a')},
  ]
  return (
    <>
      <NavBar selected="4"/>
			<Title title={t('titel.hulp')} description='Indien u hulp wenst' />
			<div className="pt-5 xl:mt-40 md:mt-32 flex justify-center flex-col">
        <img src={Airplan} alt="airplane" draggable='false' className='w-full max-h-screen -z-20 fixed'/>
					<p className='mt-40 md:mt-0 md:text-7xl text-5xl sm:text-6xl schuinSchrift text-white text-center unselectable w-full mb-10 fixed -z-20'>
						{t('hulp.vragen')}
					</p>

			</div>
			<div className='pt-28'/>
      <Boogjes />

      <div className='bg-white w-full flex flex-row justify-center gap-6 pt-10'>
        <div className='w-[600px] h-fit border-[1px] border-webgrijs mx-4 p-6'>
          <div className='border-t-[1px] border-webgrijs my-4 mx-3'/>
        {titelTekst.map(item => ( <div className='w-full flex flex-col mb-4'>
          <p className='text-md text-center text-black'>{item.titel}</p>
        </div>))}
          <div className='border-t-[1px] border-webgrijs my-4 mx-3'/>
        </div>

        <div className='bg-white border-[1px] border-black border-dashed p-5 mx-4 mb-10'>
          <div className='flex flex-col gap-y-8'>
            {titelTekst.map(item => (
            <>
              <h3 className='underline text-weboranje text-2xl'>{item.titel}</h3>
              <div className='flex flex-col gap-y-8'>
                <p className='text-weboranje text-lg whitespace-normal'>
                {item.tekst}
                </p>
              </div>
            </>

          ))}
          </div>


          <div className='h-[2px] bg-webgrijs my-7'/>
          <div className='flex flex-col justify-center'>
            <h3 className='text-webgrijs text-4xl text-center'>{t('hulp.other')}</h3>
                <form action="mailto:hoyspain@gmail.com" method="get">
                  <div className="flex flex-col justify-center text-weblichtgrijs">          
                    <div className="pt-3 p-4 md:rounded-xl pb-8 text-center font-bold">
                      <div className="text-sm font-semibold text-center col-span-2 text-weblichtgrijs mb-4">
                        {t('hulp.fill')}
                      </div>

                      <div className="mx-auto">
                        <div className="grid text-webgrijs text-xl grid-cols-[1fr_10fr]">
                          <label htmlFor="email" className="text-right mr-4">
                            {t('hulp.email')}
                          </label>
                          <input type="email" name="email" id="email" placeholder={t('hulp.emailpl')} className="w-full border-webgrijs border-[1px] rounded-lg p-2 mb-2"/>

                          <label htmlFor="vraag" className="text-right mr-4">
                          {t('hulp.q')}
                          </label>
                          <textarea name="vraag" id="vraag" cols="50" rows="10" className="w-full border-webgrijs border-[1px] rounded-lg p-2" placeholder={t('hulp.urq')}></textarea>
                          <br />
                          <div className="w-full flex justify-center">
                            <button
                              type="submit"
                              className="bg-weboranje text-white font-bold px-5 py-2 my-2 rounded focus:outline-none shadow hover:bg-opacity-70 transition-colors"
                            >
                              {t('hulp.send')}
                            </button>
                          </div> 
                        </div>
                      </div>
                    </div>

                    
                  </div>

                </form>
            </div>
          </div>
      </div>
			<Footer />
    </>
  )
}

export default Hulppagina