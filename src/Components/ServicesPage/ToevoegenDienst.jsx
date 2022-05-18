import React, { useCallback, useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useSession } from "../../contexts/AuthProvider";
import { BedrijfContext } from "../../contexts/BedrijfProvider";
import CreatableSelect from 'react-select/creatable';
import { useTranslation } from "react-i18next";

const ToevoegenDienst = () => {
  const { token } = useSession();
  const [openToevoegen, setOpenToevoegen] = React.useState(false);
  const [images, setImages] = useState([]);
  const [imageURLs, setImageURLs] = useState([]);
  const { addBedrijf } = useContext(BedrijfContext);
  const { DIENSTEN_DATA, GETBedrijven, GETDiensten } = useContext(BedrijfContext);
  const [diensten, setDiensten] = useState([]);
  const [thisDienst, setThisDienst] = useState(null);

  const getDiensten = useCallback(async () => {
    await GETDiensten;
    try {
      const diensten = DIENSTEN_DATA;
      let newArray = [];
      diensten.data?.forEach((el) => newArray.push({ value: el.dienstID, label: el.dienstNaam }));
      setDiensten(newArray);
    } catch (error) {
      console.error(error)
    }
  }, [DIENSTEN_DATA, GETDiensten]);

  const changeTheDienst = useCallback((e) => {
    setThisDienst(e?.label);
  }, [])

    useEffect(() => {
      getDiensten();
    }, [DIENSTEN_DATA]);
  

  const onImageChange = (e) => {
    setImages([...e.target.files]);
  };

  useEffect(() => {
    if (images.length < 1) return;
    const newImageUrls = [];
    images.forEach((image) => newImageUrls.push(URL.createObjectURL(image)));
    setImageURLs(newImageUrls);
  }, [images]);

  const sluitFunctie = useCallback(() => {
    setOpenToevoegen(!openToevoegen);
  }, [openToevoegen]);
  
  const closeFunctie = useCallback(() => {
    setImages([]);
    setImageURLs([]);
    setOpenToevoegen(false);
  }, []);

  const { register, handleSubmit, reset } = useForm();

  const submit = useCallback(async (data) => {
    reset();
    let formData = new FormData();
    formData.append("naam", data.naam);
    formData.append("tekst", data.tekst);
    formData.append("link", data.link);
    formData.append("image", images[0]);
    formData.append("dienst", thisDienst);

    closeFunctie();
    await addBedrijf({ formData, token });
    toast.success(`${data.naam} toegevoegd.`, {
      position: toast.POSITION.BOTTOM_RIGHT,
      pauseOnHover: false,
      pauseOnFocusLoss:false,
      autoClose:2000,
      });
    await GETBedrijven();

  }, [addBedrijf, closeFunctie, images, token, thisDienst, GETBedrijven]);
  const {t} = useTranslation();
  return (
    <>
      <div
        className="group mx-auto bg-webwit cursor-pointer hover:bg-weblichtoranje border-[1px] border-gray-300 shadow-md w-60 h-72 rounded-very-big duration-300 group relative"
        onClick={sluitFunctie}
      >
        <div className="relative w-60 h-40 mx-auto rounded-very-big bg-weboranje group-hover:border-2 duration-100 border-weblichtoranje">
          <div className="z-20 group-hover:opacity-100 group-hover:w-20 absolute bg-orange-200 duration-700 h-3 w-0 rounded-md top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 opacity-0" />
          <div className="z-20 group-hover:opacity-100 group-hover:w-20 absolute bg-orange-200 duration-700 rotate-90 h-3 w-0 rounded-md top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 opacity-0" />
          <div className="z-10 absolute bg-webwit h-3 w-20 rounded-md top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2" />
          <div className="z-10 absolute rotate-90 bg-webwit h-3 w-20 rounded-md top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2" />
        </div>
        <div className="flex flex-row justify-start ml-5 mt-1" />
        <p className="text-2xl font-semibold text-center mt-7 group-hover:text-weboranje duration-500">
          {t('diensten.add')}
        </p>
      </div>
      {openToevoegen && (
        <>
        <div className="fixed bg-black z-[60] w-full h-full top-0 opacity-40" onClick={sluitFunctie}/>
        <div className="overflow-x-hidden overflow-y-auto fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-[61]">
        <form
          onSubmit={handleSubmit(submit)}
          className=" inset-0 outline-none focus:outline-none"
        >
          <div className="h-full overflow-y-scroll mt-[100px] -mb-[500px] py-6 lg:mt-0 lg:mb-0 flex flex-col justify-center sm:py-12">
            <div className="py-3 sm:max-w-xl sm:mx-auto ">
              <div className="bg-white min-w-1xl flex flex-col shadow-lg rounded-lg relative">
                <div className="px-12 py-5">
                  <h2 className="text-webgrijs text-3xl font-semibold">
                    {t('diensten.addhere')}
                  </h2>
                </div>
                <div className="bg-gray-200 w-full flex flex-col items-center rounded-b-xl p-5">
                  <div className="grid grid-cols-2 grid-flow-row  gap-4 items-center py-6">
                    <div className="grid col-span-2 lg:col-span-1">
                      <label className="text-lg text-gray-800" htmlFor="naam">{t('diensten.name')}</label>

                      <input
                        rows="4"
                        className="p-4 text-gray-500 rounded-xl resize-none"
                        type="text"
                        name="naam"
                        id="naam"
                        {...register("naam")}
                        required
                      />
                    </div>

                    <div className="grid col-span-2 lg:col-span-1">
                      <label className="text-lg text-gray-800" htmlFor="link">{t('diensten.link')}</label>

                      <input
                        rows="4"
                        className="p-4 text-gray-500 rounded-xl resize-none"
                        type="text"
                        name="link"
                        id="link"
                        {...register("link")}
                        required
                      />
                    </div>

                    <div className="grid col-span-2 mt-3 text-center">
                      <label className="text-lg text-gray-800" htmlFor="tekst">
                      {t('diensten.omschr')}
                      </label>
                      <textarea
                        rows="4"
                        className="p-4 text-gray-500 rounded-xl resize-none"
                        id="tekst"
                        name="tekst"
                        placeholder={t('diensten.omschrpl')}
                        required
                        {...register("tekst")}
                      />
                    </div>

                    <div className="grid col-span-2 mt-3 text-center">
                      <label className="text-lg text-gray-800">
                      {t('diensten.create')}
                      </label>
                        <CreatableSelect
                          isClearable
                          onChange={(e) => changeTheDienst(e)}
                          options={diensten}
                          placeholder={t('diensten.createpl')}
                        />
                    </div>


                      <div className='flex flex-col col-span-2 w-full justify-center text-center'>
                      <label className="text-lg text-gray-800" htmlFor="afbeelding">
                      {t('diensten.afbeelding')}
                      </label>
                        <div className='border-2 col-span-2 border-dashed border-gray-500 rounded-md w-full h-full p-2'>
                          <input
                            type='file'
                            name='afbeelding'
                            id='afbeelding'
                            multiple={false}
                            accept='image/*'
                            onChange={onImageChange}
                          />
                          <div className='flex justify-center mt-4 gap-[6px] max-h-44 overflow-y-scroll before:absolute bg-gradient-to-br'>
                            {imageURLs.map((imageSrc) => (
                              <div className='w-[48%] h-[130px]' key={imageSrc}>
                                <img
                                  src={imageSrc}
                                  alt=''
                                  draggable={false}
                                  className='w-full h-full object-cover rounded-md'
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>


                    <button
                      type="submit"
                      className=" py-3 my-8 text-lg col-span-2 cursor-pointer bg-weboranje m-10 -mb-2 rounded-md text-white hover:shadow-inner
                    hover:shadow-orange-700"
                    >{t('diensten.place')}</button>
                  </div>
                  <div className="h-12 flex items-center justify-center">
                    <p href="#" className="text-gray-600 m-4 mb-0 pb-0 p-4 pt-0 mt-0 cursor-pointer" onClick={sluitFunctie}>
                    {t('diensten.later')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
        </div>
        </>
      )}
    </>
  );
};

export default ToevoegenDienst;
