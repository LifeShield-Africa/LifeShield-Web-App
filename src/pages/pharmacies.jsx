import { Helmet } from 'react-helmet-async';

import { PharmacyView } from 'src/sections/pharmacies/view';

export default function PharmacyPage() {
  return (
    <>
      <Helmet>
        <title> LifeLine | Pharmacies </title>
      </Helmet>

      <PharmacyView />
    </>
  );
}
