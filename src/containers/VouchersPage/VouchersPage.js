import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import { TopbarContainer } from '..';
import { FormattedMessage, injectIntl, intlShape } from '../../util/reactIntl';
import {
  Page,
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LinkTabNavHorizontal,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
} from '../../components';
import { propTypes } from '../../util/types';
import { CustomVoucherForm, VoucherForm } from '../../forms';
import { voucher } from '../../ducks/Voucher.duck';
import { isScrollingDisabled } from '../../ducks/UI.duck';
import { manageDisableScrolling } from '../../ducks/UI.duck';
import css from './VouchersPage.css';

export class VouchersPageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { tosModalOpen: false };
  }
  render() {
    const {
      scrollingDisabled,
      submitVoucher,
      location,
      tab
    } = this.props;
    
    const tabs = [
      {
        text: (
          <h1 className={css.tab}>
            <FormattedMessage id="VouchersPage.50LinkText" defaultMessage="50€" />
          </h1>
        ),
        selected: tab === '50Page',
        linkProps: {
          name: '50Page',
        },
      },
      {
        text: (
          <h1 className={css.tab}>
            <FormattedMessage id="VouchersPage.100LinkText" defaultMessage="100€" />
          </h1>
        ),
        selected: tab === '100Page',
        linkProps: {
          name: '100Page',
        },
      },
      {
        text: (
          <h1 className={css.tab}>
            <FormattedMessage id="VouchersPage.200LinkText" defaultMessage="200€" />
          </h1>
        ),
        selected: tab === '200Page',
        linkProps: {
          name: '200Page',
        },
      },
      {
        text: (
          <h1 className={css.tab}>
            <FormattedMessage id="VouchersPage.customLinkText" defaultMessage="Custom" />
          </h1>
        ),
        selected: tab === 'CustomPage',
        linkProps: {
          name: 'customPage',
        },
      },
    ];

    const handleSubmitVoucher = values => {
      const { email } = values;
      const param = { email: email.trim() };
      submitVoucher(param);
    };

    const vouchersChoice = (
      <div className={css.content}>
        <LinkTabNavHorizontal className={css.tabs} tabs={tabs} />
        {
           (() => {
               if (tab === '50Page')
                  return <VoucherForm className={css.form} onSubmit={handleSubmitVoucher} amount={'50'}/>
               if (tab === '100Page')
                  return <VoucherForm className={css.form} onSubmit={handleSubmitVoucher} amount={'100'}/>
               if (tab === '200Page')
                  return <VoucherForm className={css.form} onSubmit={handleSubmitVoucher} amount={'200'}/>
               if (tab === 'customPage')
                  return <CustomVoucherForm className={css.form} onSubmit={handleSubmitVoucher}/>
           })()
        }
      </div>
    );

    return (
      <Page
        title='Vouchers'
        scrollingDisabled={scrollingDisabled}
        schema={{
          '@context': 'http://schema.org',
          '@type': 'WebPage',
          name: 'Vouchers',
        }}
      >
        <LayoutSingleColumn>
        <LayoutWrapperTopbar>
          <TopbarContainer />
        </LayoutWrapperTopbar>

        <LayoutWrapperMain className={css.staticPageWrapper}>
          <h1 className={css.pageTitle}>Vouchers</h1>
          <div className={css.content}>
            { vouchersChoice }
          </div>
        </LayoutWrapperMain>

        <LayoutWrapperFooter>
          <Footer />
        </LayoutWrapperFooter>
        </LayoutSingleColumn>
      </Page>
    );
  }
}
  
  const { bool, func, object, oneOf, shape } = PropTypes;
  
  VouchersPageComponent.propTypes = {
    submitSignup: func.isRequired,
    scrollingDisabled: bool.isRequired,
    tab: oneOf(['50Page', '100Page', '200Page', 'customPage']),
    onManageDisableScrolling: func.isRequired,
    // from withRouter
    location: shape({ state: object }).isRequired,
    // from injectIntl
    intl: intlShape.isRequired,
  };

  const mapStateToProps = state => {
    return {
      scrollingDisabled: isScrollingDisabled(state),
    };
  };
  
  const mapDispatchToProps = dispatch => ({
    submitVoucher: param => dispatch(voucher(param)),
    onManageDisableScrolling: (componentId, disableScrolling) =>
      dispatch(manageDisableScrolling(componentId, disableScrolling)),
  });

// Note: it is important that the withRouter HOC is **outside** the
// connect HOC, otherwise React Router won't rerender any Route
// components since connect implements a shouldComponentUpdate
// lifecycle hook.
//
// See: https://github.com/ReactTraining/react-router/issues/4671
const VouchersPage = compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  injectIntl
)(VouchersPageComponent);


export default VouchersPage;
