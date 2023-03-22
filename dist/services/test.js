"use strict";
// import express from 'express';
// import prisma from './prisma';
// const app = express();
// app.post('/forgot-password', async (req, res) => {
//   const { email } = req.body;
//   const user = await prisma.user.findUnique({ where: { email } });
//   if (!user) {
//     return res.status(404).send('User not found');
//   }
//   const token = generateToken();
//   await prisma.user.update({ where: { id: user.id }, data: { passwordResetToken: token } });
//   const resetUrl = `https://example.com/reset-password?token=${token}`;
//   sendResetEmail(email, resetUrl);
//   res.send('Password reset email sent');
// });
// app.get('/reset-password', async (req, res) => {
//   const { token } = req.query;
//   const user = await prisma.user.findUnique({ where: { passwordResetToken: token } });
//   if (!user) {
//     return res.status(404).send('Invalid or expired token');
//   }
//   res.send(`
//     <form method="post" action="/reset-password">
//       <label>New Password</label>
//       <input type="password" name="password" required>
//       <label>Confirm Password</label>
//       <input type="password" name="confirmPassword" required>
//       <input type="hidden" name="token" value="${token}">
//       <button type="submit">Reset Password</button>
//     </form>
//   `);
// });
// app.post('/reset-password', async (req, res) => {
//   const { token, password, confirmPassword } = req.body;
//   const user = await prisma.user.findUnique({ where: { passwordResetToken: token } });
//   if (!user) {
//     return res.status(404).send('Invalid or expired token');
//   }
//   if (password !== confirmPassword) {
//     return res.status(400).send('Passwords do not match');
//   }
//   const hashedPassword = await hashPassword(password);
//   await prisma.user.update({ where: { id: user.id }, data: { password: hashedPassword, passwordResetToken: null } });
//   res.send('Password reset successfully');
// });
// function generateToken() {
//   // Generate a random token using a library like uuid or crypto
// }
// function sendResetEmail(email: string, resetUrl: string) {
//   // Send an email to the user with the password reset link
// }
// async function hashPassword(password: string) {
//   // Hash the password using a library like bcrypt or arg
//# sourceMappingURL=test.js.map