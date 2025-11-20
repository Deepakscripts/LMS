import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home.jsx';
import HowItWorks from './pages/HowItWorks.jsx';
import CampusAmbassador from './pages/CampusAmbassador.jsx';
import Events from './pages/EventsPage.jsx';
import BrowseStreams from './pages/BrowseStreamsPage.jsx';
import Pricing from './pages/PricingPage.jsx';
import Verification from './pages/VerificationPage.jsx';
import ProgramDetails from './pages/ProgramDetailsPage.jsx';
import PublicLayout from './layout/PublicLayout.jsx';
import PrivacyPolicy from './pages/PrivacyPolicy.jsx';
import TermsOfService from './pages/TermsOfService.jsx';

const PublicPortal = () => {
  return (
    <>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/howitworks" element={<HowItWorks />} />
          <Route path="/campus" element={<CampusAmbassador />} />
          <Route path="/events" element={<Events />} />
          <Route path="/browse" element={<BrowseStreams />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/program" element={<ProgramDetails />} />
          <Route path="/verification" element={<Verification />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
        </Route>
      </Routes>
    </>
  );
};

export default PublicPortal;
