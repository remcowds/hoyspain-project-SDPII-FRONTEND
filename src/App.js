import "./App.css";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Hulppagina from "./pages/Hulppagina";
import MijnGegevens from "./pages/MijnGegevens";
import Services from "./pages/Services";
import AdvertentiePage from "./pages/AdvertentiePage";

import { WoningProvider } from "./contexts/WoningProvider";
import { VerhuurderProvider } from "./contexts/VerhuurderProvider";
import { ThemeProvider } from "@mui/material";
import ThemeObject from "./Components/MUITheme/ThemeObject";

import BoekingStep1 from "./pages/BoekingStep1.jsx";
import InformatieWoningPage from "./pages/InformatieWoningPage";
import BevestigingsPage from "./pages/BevestigingsPage";

import RegistratiePage from "./pages/RegistratiePage";
import { AuthProvider } from "./contexts/AuthProvider";
import { BookingProvider } from "./contexts/BookingProvider";
import { ImageProvider } from "./contexts/ImageProvider";
import { BedrijfProvider } from "./contexts/BedrijfProvider";
import PrivateRoute from "./Components/Routes/TypeOfRoute/PrivateRoute";

import ReservatiesPage from "./pages/ReservatiesPage";
import { BookingMainProvider } from "./contexts/BookingMainProvider";
import SwitchRouteHome from "./Components/Routes/TypeOfRoute/SwitchRouteHome";
import AdvertentiePlaatsenPage from "./pages/AdvertentiePlaatsenPage";
import MijnFavorietenPage from "./pages/MijnFavorietenPage";

import EnkelHuurderRoute from "./Components/Routes/TypeOfRoute/EnkelHuurderRoute";
import EnkelVerhuurderRoute from "./Components/Routes/TypeOfRoute/EnkelVerhuurderRoute";
import IngelogdEnHuurderRoute from "./Components/Routes/TypeOfRoute/IngelogdEnHuurderRoute";
import { CurrentWoningProvider } from "./contexts/CurrentWoningProvider";
import RechtenBeheren from "./pages/RechtenBeheren";
import { FavorietenProvider } from "./contexts/FavorietenProvider";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <VerhuurderProvider>
          <Router>
            <ThemeProvider theme={ThemeObject}>
              <WoningProvider>
                <ImageProvider>
                  <BookingProvider>
                    <BookingMainProvider>
                      <CurrentWoningProvider>
                        <FavorietenProvider>
                          <Routes>
                            {/* GLOBALE ROUTES */}

                            {/* HUREN DETAILPAGINA */}

                            <Route
                              path="/huren/:id"
                              element={<InformatieWoningPage />}
                            />

                            {/* HOME */}
                            <Route exact path="/" element={<SwitchRouteHome />}>
                              <Route path="/" element={<Home />} />
                            </Route>

                            {/* REGISTRATIE */}
                            <Route
                              path="/register"
                              element={<RegistratiePage />}
                            />

                            {/* NOTFOUND */}
                            <Route path="*" element={<NotFound />} />

                            {/* HULP */}
                            <Route
                              exact
                              path="/hulp"
                              element={<EnkelHuurderRoute link="/hulp" />}
                            >
                              <Route path="/hulp" element={<Hulppagina />} />
                            </Route>
                            {/* HUREN DETAILPAGINA */}

                            {/* ACCOUNT */}

                            <Route
                              exact
                              path="/account"
                              element={<PrivateRoute link="/" />}
                            >
                              <Route
                                path="/account"
                                element={<MijnGegevens />}
                              />
                            </Route>

                            {/* EINDE GLOBALE ROUTES */}

                            {/* VERHUURDER ROUTES */}

                            <Route
                              exact
                              path="/plaatsadvertentie"
                              element={<EnkelVerhuurderRoute />}
                            >
                              
                              <Route
                                path="/plaatsadvertentie"
                                element={<AdvertentiePlaatsenPage />}
                              />
                            </Route>
                            {/* EINDE VERHUURDER ROUTES */}

                            {/* HUURDER ROUTES */}

                            {/* SERVICES */}
                            <Route
                              exact
                              path="/services"
                              element={<EnkelHuurderRoute />}
                            >
                              <Route
                                path="/services"
                                element={
                                  <BedrijfProvider>
                                    <Services />
                                  </BedrijfProvider>
                                }
                              />
                            </Route>

                            {/* HUREN */}
                            <Route
                              exact
                              path="/huren"
                              element={<EnkelHuurderRoute />}
                            >
                              <Route
                                path="/huren"
                                element={<AdvertentiePage />}
                              />
                            </Route>

                            {/* BOEKEN KIEZEN */}
                            <Route
                              exact
                              path="/boeken/:id"
                              element={<EnkelHuurderRoute />}
                            >
                              <Route
                                path="/boeken/:id"
                                element={<BoekingStep1 />}
                              />
                            </Route>

                            {/* RESERVATIES */}
                            <Route
                              exact
                              path="/reservaties"
                              element={<EnkelHuurderRoute />}
                            >
                              <Route
                                path="/reservaties"
                                element={<ReservatiesPage />}
                              />
                            </Route>

                            {/* Bevestiging boeking */}
                            <Route
                              exact
                              path="/boeken/bevestiging"
                              element={<IngelogdEnHuurderRoute />}
                            >
                              <Route
                                path="/boeken/bevestiging"
                                element={<BevestigingsPage />}
                              />
                            </Route>

                            <Route
                              exact
                              path="/rechten"
                              element={<PrivateRoute role="owner" link="/" />}
                            >
                              <Route
                                path="/rechten"
                                element={<RechtenBeheren />}
                              />
                            </Route>

                            <Route
                              exact
                              path="/mijn-favorieten"
                              element={<IngelogdEnHuurderRoute />}
                            >
                              <Route
                                path="/mijn-favorieten"
                                element={<MijnFavorietenPage />}
                              />
                            </Route>
                            {/* EINDE HUURDER ROUTES */}
                          </Routes>
                        </FavorietenProvider>
                      </CurrentWoningProvider>
                    </BookingMainProvider>
                  </BookingProvider>
                </ImageProvider>
              </WoningProvider>
            </ThemeProvider>
          </Router>
        </VerhuurderProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
