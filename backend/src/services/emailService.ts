import transport from "../email/transport";

const sendResetPasswordEmail = async (
  email: string,
  token: string,
  userId: number,
): Promise<void> => {
  const resetLink = `${process.env.BASE_URL}/api/v1/auth/reset-password?token=${token}&id=${userId}`;
  const message = `Copy this link to reset your password: ${resetLink}`;

  await transport.sendEmail({
    to: email,
    subject: "Reset password",
    text: message,
  });
};

export default { sendResetPasswordEmail };
