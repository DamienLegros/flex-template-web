import React from 'react';
import config from '../../config';
import { StaticPage, TopbarContainer } from '..';
import {
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
} from '../../components';

import { VoucherForm } from '../../forms';
import css from './VouchersPage.css';

const VouchersPage = () => {

  // prettier-ignore
  return (
    <StaticPage
      title="Vouchers"
      schema={{
        '@context': 'http://schema.org',
        '@type': 'VouchersPage',
        description: 'Vouchers',
        name: 'Vouchers',
      }}
    >
      <LayoutSingleColumn>
        <LayoutWrapperTopbar>
          <TopbarContainer />
        </LayoutWrapperTopbar>

        <LayoutWrapperMain className={css.staticPageWrapper}>
          <h1 className={css.pageTitle}>Vouchers</h1>
          {VoucherForm}
        </LayoutWrapperMain>

        <LayoutWrapperFooter>
          <Footer />
        </LayoutWrapperFooter>
      </LayoutSingleColumn>
    </StaticPage>
  );
};

export default VouchersPage;
