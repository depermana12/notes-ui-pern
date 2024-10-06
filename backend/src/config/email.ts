const config = {
  host: process.env.EMAIL_HOST!,
  port: Number(process.env.EMAIL_PORT)!,
  auth: {
    user: process.env.EMAIL_USER!,
    pass: process.env.EMAIL_PASS!,
  },
};

export default config;
