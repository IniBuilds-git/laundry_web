// 'use client';

// import React from 'react';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { useSearchParams, useRouter } from 'next/navigation';
// import { motion } from 'framer-motion';
// import { Lock, Eye, EyeOff } from 'lucide-react';

// import { Button } from '@/components/ui/Button';
// import { Input } from '@/components/ui/Input';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
// import { useResetPassword } from '@/hooks/{api}/useAuth';
// import { resetPasswordSchema, ResetPasswordFormData } from '@/lib/validations/auth';

// export default function ResetPasswordPage() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const email = searchParams.get('email') || '';
//   const resetPasswordMutation = useResetPassword();
// //   const [showPassword, setShowPassword] = React.useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<ResetPasswordFormData>({
//     resolver: zodResolver(resetPasswordSchema),
//   });

//   const onSubmit = (data: ResetPasswordFormData) => {
//     resetPasswordMutation.mutate(
//       { ...data, email },
//       {
//         onSuccess: (response) => {
//           if (response.status) {
//             router.push('/login');
//           }
//         },
//       }
//     );
//   };

//   if (!email) {
//     router.push('/forgot-password');
//     return null;
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="max-w-md w-full"
//       >
//         <Card className="shadow-lg">
//           <CardHeader className="text-center pb-4">
//             <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
//               <Lock className="h-8 w-8 text-purple-600" />
//             </div>
//             <CardTitle className="text-2xl font-bold text-gray-900">
//               Reset Password
//             </CardTitle>
//             <p className="text-gray-600 mt-2">
//               Enter the reset code and your new password
//             </p>
//           </CardHeader>
          
//           <CardContent>
//             <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//               <Input
//                 {...register('token')}
//                 type="text"
//                 placeholder="Enter 4-digit reset code"
//                 maxLength={4}
//                 className="text-center text-lg tracking-widest"
//                 error={errors.token?.message}
//               />

//               <div className="relative">
//                 <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//                 <Input
//                   {...register('password')}
//                   type={showPassword ? 'text' : 'password'}
//                   placeholder="New Password"
//                   className="pl-10 pr-10"
//                   error={errors.password?.message}
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
//                 >
//                   {showPassword ? (
//                     <EyeOff className="h-4 w-4" />
//                   ) : (
//                     <Eye className="h-4 w-4" />
//                   )}
//                 </button>
//               </div>

//               <div className="relative">
//                 <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//                 <Input
//                   {...register('confirmPassword')}
//                   type={showConfirmPassword ? 'text' : 'password'}
//                   placeholder="Confirm New Password"
//                   className="pl-10 pr-10"
//                   error={errors.confirmPassword?.message}
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                   className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
//                 >
//                   {showConfirmPassword ? (
//                     <EyeOff className="h-4 w-4" />
//                   ) : (
//                     <Eye className="h-4 w-4" />
//                   )}
//                 </button>
//               </div>

//               <Button
//                 type="submit"
//                 className="w-full"
//                 loading={resetPasswordMutation.isPending}
//               >
//                 Reset Password
//               </Button>
//             </form>
//           </CardContent>
//         </Card>
//       </motion.div>
//     </div>
//   );
// }
