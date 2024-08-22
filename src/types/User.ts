type User = {
  email: string;
  isConfirmed: boolean;
  confirmationSentAt?: string;
  isPolicyAcknowledged: boolean;
};

export default User;
