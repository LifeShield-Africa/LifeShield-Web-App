import { Helmet } from 'react-helmet-async';

import { PasswordNew } from 'src/sections/PasswordNew';

export default function ResetPasswordNewPage() {
  return (
    <>
      <Helmet>
        <title> Password | Pharmacy </title>
      </Helmet>

      <PasswordNew />
    </>
  );
}
