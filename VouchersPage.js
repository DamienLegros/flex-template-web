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
import { VoucherForm } from '../../forms';
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

    var isChoosen = (tab === '50Page');

    const from = location.state && location.state.from ? location.state.from : null;

    const fromState = { state: from ? { from } : null };

    const tabs = [
      {
        text: (
          <h1 className={css.tab}>
            <FormattedMessage id="VouchersPage.50LinkText" />
          </h1>
        ),
        selected: isChoosen,
        linkProps: {
          name: '50Page',
          to: fromState,
        },
      },
      {
        text: (
          <h1 className={css.tab}>
            <FormattedMessage id="VouchersPage.customLinkText" />
          </h1>
        ),
        selected: !isChoosen,
        linkProps: {
          name: 'customPage',
          to: fromState,
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
        {isChoosen ? (
          <VoucherForm className={css.form} onSubmit={handleSubmitVoucher} amount={'50'}/>
        ) : (
          <VoucherForm className={css.form} onSubmit={handleSubmitVoucher} amount={'custom'}/>
        )}
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
  
VouchersPageComponent.defaultProps = {
  tab: '50',
};

const { bool, func, object, oneOf, shape } = PropTypes;

VouchersPageComponent.propTypes = {
  submitSignup: func.isRequired,
  scrollingDisabled: bool.isRequired,
  tab: oneOf(['50', 'custom']),

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
