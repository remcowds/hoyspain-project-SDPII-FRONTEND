import React from "react";
import Title from "../Components/Extra components/Title";
import NavBar from "../Components/Global Components/NavBar";
import Timeline from "../Components/BoekingAlgemeneItems/TimeLine";

const Home = () => {
  return (
    <>
      <Title
        title="Boeking"
        description="Boekingspagina van Hoyspain"
      />

        <NavBar selected="2" />

        <Timeline />

      {/* <Footer /> */}
    </>
  );
};

export default Home;
