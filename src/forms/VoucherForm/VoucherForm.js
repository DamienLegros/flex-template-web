import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { FormattedMessage, injectIntl, intlShape } from '../../util/reactIntl';
import { Form as FinalForm } from 'react-final-form';
import classNames from 'classnames';
import { Form, PrimaryButton, FieldTextInput, NamedLink } from '../../components';
import * as validators from '../../util/validators';

import css from './VoucherForm.css';

const VoucherFormComponent = props => (
  <FinalForm
    {...props}
    render={fieldRenderProps => {
      const {
        rootClassName,
        className,
        formId,
        handleSubmit,
        inProgress,
        amountSelected,
        intl,
        invalid,
      } = fieldRenderProps;

       // amount
      const amountLabel = intl.formatMessage({
        id: 'VoucherForm.amountLabel',
      });
      const amountPlaceholder = intl.formatMessage({
        id: 'VoucherForm.amountPlaceholder',
      });
      const amountRequiredMessage = intl.formatMessage({
        id: 'VoucherForm.amountRequired',
      });
      const amountRequired = validators.requiredIntNoTrim(amountRequiredMessage);
      const amountValidators = validators.composeValidators(amountRequired);

      // email
      const emailLabel = intl.formatMessage({
        id: 'VoucherForm.emailLabel',
      });
      const emailPlaceholder = intl.formatMessage({
        id: 'VoucherForm.emailPlaceholder',
      });
      const emailRequiredMessage = intl.formatMessage({
        id: 'VoucherForm.emailRequired',
      });
      const emailRequired = validators.required(emailRequiredMessage);
      const emailInvalidMessage = intl.formatMessage({
        id: 'VoucherForm.emailInvalid',
      });
      const emailValid = validators.emailFormatValid(emailInvalidMessage);
      
      const classes = classNames(rootClassName || css.root, className);
      const submitInProgress = inProgress;
      const submitDisabled = invalid || submitInProgress;

      return (
        <Form className={classes} onSubmit={handleSubmit} amount={amountSelected}>
          <FieldTextInput
            type="amount"
            id={formId ? `${formId}.amount` : 'amount'}
            name="amount"
            autoComplete="amount"
            label={amountLabel}
            placeholder={amountPlaceholder}
            validate={amountValidators}
          />
          <div>
            <FieldTextInput
              type="email"
              id={formId ? `${formId}.email` : 'email'}
              name="email"
              autoComplete="email"
              label={emailLabel}
              placeholder={emailPlaceholder}
              validate={validators.composeValidators(emailRequired, emailValid)}
            />
          </div>
          <div className={css.bottomWrapper}>
            <PrimaryButton type="submit" inProgress={submitInProgress} disabled={submitDisabled}>
              <FormattedMessage id="VoucherForm.buy" />
            </PrimaryButton>
          </div>
        </Form>
      );
    }}
  />
);

VoucherFormComponent.defaultProps = {
  rootClassName: null,
  className: null,
  form: null,
  inProgress: false,
};

const { string, bool } = PropTypes;

VoucherFormComponent.propTypes = {
  rootClassName: string,
  className: string,
  form: string,
  inProgress: bool,
  intl: intlShape.isRequired,
};

const VoucherForm = compose(injectIntl)(VoucherFormComponent);
VoucherForm.displayName = 'VoucherForm';


export default VoucherForm;
