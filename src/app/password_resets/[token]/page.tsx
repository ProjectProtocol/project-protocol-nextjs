import PasswordResetForm from "./_components/PasswordResetForm";

export default async function Page({ params }: { params: { token: string } }) {
  // Get token from url param
  // Pass to form
  // On success, redirect to login
  // On failure, show error

  return <PasswordResetForm token={params.token} />;
}
