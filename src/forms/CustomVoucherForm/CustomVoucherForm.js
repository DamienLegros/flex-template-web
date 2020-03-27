import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { FormattedMessage, injectIntl, intlShape } from '../../util/reactIntl';
import { Form as FinalForm } from 'react-final-form';
import classNames from 'classnames';
import { Form, PrimaryButton, FieldTextInput, FieldCurrencyInput } from '../../components';
import * as validators from '../../util/validators';
import { currencyConfig } from '../../util/test-data';

import css from './CustomVoucherForm.css';

const CustomVoucherFormComponent = props => (
  <FinalForm
    {...props}
    render={fieldRenderProps => {
      const {
        rootClassName,
        className,
        formId,
        handleSubmit,
        inProgress,
        intl,
        invalid,
      } = fieldRenderProps;

       // amount
      const amountLabel = intl.formatMessage({
        id: 'Voucher Value',
      });
      const amountPlaceholder = intl.formatMessage({
        id: 'Value Placeholder',
      });
      const amountRequiredMessage = intl.formatMessage({
        id: 'Amount Required',
      });
      const amountRequired = validators.requiredIntNoTrim(amountRequiredMessage);
      const amountValidators = validators.composeValidators(amountRequired);
      
      const currencyConfigEUR = {
        currencyConfig,
        currency: 'EUR',
      };

      // email
      const emailLabel = intl.formatMessage({
        id: 'Recipient Email',
      });
      const emailPlaceholder = intl.formatMessage({
        id: 'Example@abc.ie',
      });
      const emailRequiredMessage = intl.formatMessage({
        id: 'Email Required',
      });
      const emailRequired = validators.required(emailRequiredMessage);
      const emailInvalidMessage = intl.formatMessage({
        id: 'Email Invalid',
      });
      const currencyInvalidMessage = intl.formatMessage({
        id: 'Currency Value Invalid',
      });
      const emailValid = validators.emailFormatValid(emailInvalidMessage);
      const required = validators.parseNum(currencyInvalidMessage);
      const classes = classNames(rootClassName || css.root, className);
      const submitInProgress = inProgress;
      const submitDisabled = invalid || submitInProgress;

      return (
        <Form className={classes} onSubmit={handleSubmit}>
          <div> 
          <FieldCurrencyInput
            id="FieldCurrencyInput.price"
            name="price"
            label="Set price:"
            placeholder="Type in amount in EUR..."
            currencyConfig={currencyConfigEUR}
            validate={amountRequired}
          />
          </div>
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
              <FormattedMessage id="CustomVoucherForm.buy" defaultMessage="Buy Voucher" />
            </PrimaryButton>
          </div>
        </Form>
      );
    }}
  />
);

CustomVoucherFormComponent.defaultProps = {
  rootClassName: null,
  className: null,
  form: null,
  inProgress: false,
};

const { string, bool } = PropTypes;

CustomVoucherFormComponent.propTypes = {
  rootClassName: string,
  className: string,
  form: string,
  inProgress: bool,
  intl: intlShape.isRequired,
};

const CustomVoucherForm = compose(injectIntl)(CustomVoucherFormComponent);
CustomVoucherForm.displayName = 'CustomVoucherForm';


export default CustomVoucherForm;
