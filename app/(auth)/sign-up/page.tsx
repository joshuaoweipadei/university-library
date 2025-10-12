"use client";

import { signUpSchema } from "@/lib/validations";
import { signUp } from "@/lib/actions/auth";
import AuthForm from "@/components/AuthForm";

const Page = () => {
  return (
    <AuthForm
      type="SIGN_UP"
      schema={signUpSchema}
      defaultValues={{
        email: "",
        password: "",
        fullName: "",
        universityId: 0,
        universityCard: "",
      }}
      onSubmit={signUp}
    />
  );
};
export default Page;
