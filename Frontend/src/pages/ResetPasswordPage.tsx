import { useMutation } from "@tanstack/react-query";
import { resetPasswordAPI } from "../api/authApi";
import { resetPasswordSchema } from "../schemas/authSchemas";
import { useParams } from "react-router-dom";

export default function ResetPasswordPage() {
  const { token } = useParams();

  const mutation = useMutation({
    mutationFn: (newPassword: string) =>
      resetPasswordAPI(token!, newPassword),
    onSuccess: () => alert("Password reset successful!"),
    onError: () => alert("Error resetting password"),
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const newPassword = e.target.newPassword.value;

    const parsed = resetPasswordSchema.safeParse({ newPassword });
    if (!parsed.success) {
      alert(parsed.error.issues[0].message);
      return;
    }

    mutation.mutate(newPassword);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Reset Password</h2>
      <input name="newPassword" placeholder="New Password" />
      <button type="submit">Reset</button>
    </form>
  );
}
