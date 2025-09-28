import { z } from 'zod';
export const registerSchema = z
  .object({
    fullName: z
      .string()
      .min(3, 'Fullname must be at least 3 characters')
      .max(50, 'Fullname up to 50 characters'),
    email: z.email('Invalid Email'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/,
        'Password must contain uppercase, lowercase, numbers and special characters'
      ),
    confirmPassword: z.string().min(1, 'Password must not be empty'),
    age: z
      .number({ message: 'Age must be numbers' })
      .min(18, 'Age must be greater than or equal to 18')
      .max(100, 'Age must be less than or equal to 100'),
    gender: z.enum(['male', 'female', 'other'], {
      message: 'Please choose gender',
    }),
    terms: z.literal(true, {
      message: 'You must agree with terms',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Invalid Password',
  });
