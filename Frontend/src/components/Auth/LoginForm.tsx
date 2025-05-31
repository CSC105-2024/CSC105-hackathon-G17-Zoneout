import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "../Form/FormInput";

const loginSchema = z.object({
  email: z.string().email("❌ Invalid Email Format"),
  password: z
    .string()
    .min(8, "❌ Password must be at least 8 characters")
    .regex(/[A-Z]/, "❌ Must contain at least one uppercase letter")
    .regex(/[a-z]/, "❌ Must contain at least one lowercase letter")
    .regex(/[0-9]/, "❌ Must contain at least one number")
    .regex(/[@$!%*?&]/, "❌ Must contain at least one special character (@$!%*?&)"),
});

type LoginInput = z.infer<typeof loginSchema>;

const LoginForm = ({ onSubmit }: { onSubmit: (data: LoginInput) => void }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <FormInput
        label="Email"
        type="email"
        placeholder="Enter your email"
        error={errors.email?.message}
        {...register("email")}
      />
      <FormInput
        label="Password"
        type="password"
        placeholder="Enter your password"
        error={errors.password?.message}
        {...register("password")}
      />
      <button
        type="submit"
        className="w-full bg-purple-600 text-white py-2 rounded mt-4"
      >
        Log In
      </button>
    </form>
  );
};

export default LoginForm;