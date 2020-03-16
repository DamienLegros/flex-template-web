import React from 'react';
import { renderDeep } from '../../util/test-helpers';
import { fakeIntl } from '../../util/test-data';
import VoucherForm from './VoucherForm';

const noop = () => null;

describe('VoucherForm', () => {
  it('matches snapshot', () => {
    const tree = renderDeep(<VoucherForm intl={fakeIntl} onSubmit={noop} />);
    expect(tree).toMatchSnapshot();
  });
});
