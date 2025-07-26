// 'use client';

// import React from 'react';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { useRouter } from 'next/navigation';
// import { motion } from 'framer-motion';
// import { Mail, RefreshCw } from 'lucide-react';

// import { Button } from '@/components/ui/Button';
// import { Input } from '@/components/ui/Input';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
// // import { useVerifyEmail, useResendOtp } from '@/hooks/{api}/useAuth'
// import { useAuthStore } from '@/store/auth';
// import { verifyEmailSchema, VerifyEmailFormData } from '@/lib/validations/auth';

// export default function VerifyEmailPage() {
//   const router = useRouter();
//   const user = useAuthStore((state) => state.user);
//   const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
// //   const verifyMutation = useVerifyEmail();
//   const resendMutation = useResendOtp();
  
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<VerifyEmailFormData>({
//     resolver: zodResolver(verifyEmailSchema),
//   });

//   React.useEffect(() => {
//     if (isAuthenticated) {
//       router.push('/dashboard');
//     }
//     if (!user?.email) {
//       router.push('/register');
//     }
//   }, [isAuthenticated, user, router]);

//   const onSubmit = (data: VerifyEmailFormData) => {
//     verifyMutation.mutate(data, {
//       onSuccess: (response: { status: boolean }) => {
//         if (response.status) {
//           router.push('/dashboard');
//         }
//       },
//     });
//   };

//   const handleResendOtp = () => {
//     if (user?.email) {
//       resendMutation.mutate(user.email);
//     }
//   };

//   if (!user?.email) {
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
//               <Mail className="h-8 w-8 text-purple-600" />
//             </div>
//             <CardTitle className="text-2xl font-bold text-gray-900">
//               Verify Your Email
//             </CardTitle>
//             <p className="text-gray-600 mt-2">
//               Please enter the 4-digit code sent to{' '}
//               <span className="font-medium">{user.email}</span>
//             </p>
//           </CardHeader>
          
//           <CardContent>
//             <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//               <Input
//                 {...register('otp_code')}
//                 type="text"
//                 placeholder="Enter 4-digit code"
//                 maxLength={4}
//                 className="text-center text-lg tracking-widest"
//                 error={errors.otp_code?.message}
//               />

//               <Button
//                 type="submit"
//                 className="w-full"
//                 loading={verifyMutation.isPending}
//               >
//                 Verify Email
//               </Button>
//             </form>

//             <div className="mt-6 text-center">
//               <p className="text-sm text-gray-600 mb-2">
//                 Didn't receive the code?
//               </p>
//               <Button
//                 variant="ghost"
//                 onClick={handleResendOtp}
//                 loading={resendMutation.isPending}
//                 className="text-purple-600 hover:text-purple-500"
//               >
//                 <RefreshCw className="h-4 w-4 mr-2" />
//                 Resend Code
//               </Button>
//             </div>
//           </CardContent>
//         </Card>
//       </motion.div>
//     </div>
//   );
// }
