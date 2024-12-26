import { ResetPasswordForm } from "@/components/ResetPasswordForm";

function Page({ params }) {
  const { token } = params;

  return <ResetPasswordForm token={token} />;
}

export default Page;
