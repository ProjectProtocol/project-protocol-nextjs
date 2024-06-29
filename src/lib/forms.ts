type ErrorState = {
  error?: string;
  isInvalid: boolean;
};

export function getErrorState(fieldName: string, errors: any): ErrorState {
  return {
    error: errors?.[fieldName],
    isInvalid: !!errors?.[fieldName],
  };
}
