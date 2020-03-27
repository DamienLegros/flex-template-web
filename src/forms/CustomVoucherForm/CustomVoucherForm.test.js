import React from 'react';
import { renderDeep } from '../../util/test-helpers';
import { fakeIntl } from '../../util/test-data';
import CustomVoucherForm from './CustomVoucherForm';

const noop = () => null;

describe('CustomVoucherForm', () => {
  it('matches snapshot', () => {
    const tree = renderDeep(<CustomVoucherForm intl={fakeIntl} onSubmit={noop} />);
    expect(tree).toMatchSnapshot();
  });
});
