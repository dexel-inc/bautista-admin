import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import SignInForm from "../../components/auth/SignInForm";

export default function SignIn() {
  return (
    <>
      <PageMeta
        title="Iglesia Bautista fundamental"
        description="Consola administrativa"
      />
      <AuthLayout>
        <SignInForm />
      </AuthLayout>
    </>
  );
}
