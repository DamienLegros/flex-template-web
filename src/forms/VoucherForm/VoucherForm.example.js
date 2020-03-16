/* eslint-disable no-console */
import VoucherForm from './VoucherForm';

export const Empty = {
  component: VoucherForm,
  props: {
    formId: 'VoucherFormExample',
    onSubmit(values) {
      console.log('log in with form values:', values);
    },
  },
  group: 'forms',
};
