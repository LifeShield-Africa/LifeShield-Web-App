import { Helmet } from 'react-helmet-async';

import { UserView } from 'src/sections/customers/view';

export default function UserPage() {
  return (
    <>
      <Helmet>
        <title> LifeLine | Customers </title>
      </Helmet>

      <UserView />
    </>
  );
}
