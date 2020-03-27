/* eslint-disable no-console */
import CustomVoucherForm from './CustomVoucherForm';

export const Empty = {
  component: CustomVoucherForm,
  props: {
    formId: 'CustomVoucherFormExample',
    onSubmit(values) {
      console.log('log in with form values:', values);
    },
  },
  group: 'forms',
};
