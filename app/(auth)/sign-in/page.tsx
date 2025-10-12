"use client";

import { signInSchema } from "@/lib/validations";
import { signInWithCredentials } from "@/lib/actions/auth";
import AuthForm from "@/components/AuthForm";

const Page = () => {
  return (
    <AuthForm
      type="SIGN_IN"
      schema={signInSchema}
      defaultValues={{
        email: "",
        password: "",
      }}
      onSubmit={signInWithCredentials}
    />
  );
};
export default Page;
