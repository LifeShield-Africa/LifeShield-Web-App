import { Helmet } from 'react-helmet-async';

import { OrdersView } from 'src/sections/Orders/view';

export default function LoginPage() {
  return (
    <>
      <Helmet>
        <title> Orders | LifeLine </title>
      </Helmet>

      <OrdersView />
    </>
  );
}
