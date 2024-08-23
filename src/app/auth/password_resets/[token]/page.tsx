import PasswordResetForm from "./_components/PasswordResetForm";

export default async function Page({ params }: { params: { token: string } }) {
  return <PasswordResetForm token={params.token} />;
}
