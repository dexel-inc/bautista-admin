import PageMeta from "@/presentation/components/common/PageMeta.tsx";
import AuthLayout from "./AuthPageLayout.tsx";
import SignInForm from "@/presentation/components/auth/SignInForm.tsx";

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
