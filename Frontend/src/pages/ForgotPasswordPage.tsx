import { useMutation } from "@tanstack/react-query";
import { forgotPasswordAPI } from "../api/authApi";
import { forgotPasswordSchema } from "../schemas/authSchemas";

export default function ForgotPasswordPage() {
  const mutation = useMutation({
    mutationFn: forgotPasswordAPI,
    onSuccess: (data) => alert("Reset token: " + data.resetToken),
    onError: () => alert("Error sending reset email"),
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const email = e.target.email.value;

    const parsed = forgotPasswordSchema.safeParse({ email });
    if (!parsed.success) {
      alert(parsed.error.issues[0].message);
      return;
    }

    mutation.mutate(email);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Forgot Password</h2>

      <input name="email" placeholder="Email" />
      <button type="submit">Send Reset Link</button>
    </form>
  );
}
