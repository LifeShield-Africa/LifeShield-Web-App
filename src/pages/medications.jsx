import { Helmet } from 'react-helmet-async';

import { MedicationsView } from 'src/sections/medications/view';

export default function UserPage() {
  return (
    <>
      <Helmet>
        <title> LifeLine | Medications </title>
      </Helmet>

      <MedicationsView />
    </>
  );
}
