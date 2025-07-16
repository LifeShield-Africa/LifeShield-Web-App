import { Helmet } from 'react-helmet-async';

import { ClaimsView } from 'src/sections/claims/view';

export default function UserPage() {
  return (
    <>
      <Helmet>
        <title> LifeLine | Claims </title>
      </Helmet>

      <ClaimsView />
    </>
  );
}
