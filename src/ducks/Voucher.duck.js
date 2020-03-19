export const voucher = params => (dispatch, getState, sdk) => {
    const { email, amount } = params;
  
    const createVoucherParams = { protectedData: { email }, amount };
  
    // We must login the user if signup succeeds since the API doesn't
    // do that automatically.
  };