import React from "react";
import BevestigingsBericht from "../Components/BoekingAlgemeneItems/BevestigingsBericht";
import Title from "../Components/Extra components/Title";
import NavBar from "../Components/Global Components/NavBar";


const Home = () => {
  return (
    <>
      <Title
        title="Boeking"
        description="Boekingspagina van Hoyspain"
      />

        <NavBar selected="2" />

        <BevestigingsBericht/>

      {/* <Footer /> */}
    </>
  );
};

export default Home;
