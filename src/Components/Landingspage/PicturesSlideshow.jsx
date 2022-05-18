import React from 'react';
import p1 from "../../Images/LandingspaginaFotos/p1.jpg";
import p2 from "../../Images/LandingspaginaFotos/p2.jpg";
import p3 from "../../Images/LandingspaginaFotos/p3.jpg";
import p4 from "../../Images/LandingspaginaFotos/p4.jpg";
import p5 from "../../Images/LandingspaginaFotos/p5.jpg";
import p6 from "../../Images/LandingspaginaFotos/p6.jpg";
import p7 from "../../Images/LandingspaginaFotos/p7.jpg";
import p8 from "../../Images/LandingspaginaFotos/p8.jpg";

const photos = [
  {
    src: p1,
    cols: 1,
  },
  {
    src: p2,
    cols: 1,
  },
  {
    src: p4,
    cols: 1,
  },
  {
    src: p5,
    cols: 1,
  },
  {
    src: p3,
    cols: 1,
  },
  {
    src: p6,
    cols: 1,
  },
  {
    src: p7,
    cols: 2,
  },
  {
    src: p8,
    cols: 1,
  },
];

const PicturesSlideshow = () => {
  return (
    <>
      <a href="https://instagram.com/hoyspain" target="_blank" rel="noreferrer" className='py-3 grid grid-rows-2 grid-flow-col overflow-x-scroll overflow-scroll container-snap justify-center'>
      {
        photos.map((photo, index) =>
        { 
          return (
            <img src={photo.src} key={index} alt="" draggable="false" className={`h-60 pl-2 py-2 rounded-lg object-cover w-96 col-span-${photo.cols} rounded-big`}/>
          );
        })
      }
      </a>
    </>
  )
}

export default PicturesSlideshow