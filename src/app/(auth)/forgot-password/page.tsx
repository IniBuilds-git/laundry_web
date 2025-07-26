'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft } from 'lucide-react';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { useForgotPassword } from '@/hooks/api/useAuth';
import { forgotPasswordSchema, ForgotPasswordFormData } from '@/lib/validations/auth';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const forgotPasswordMutation = useForgotPassword();
  const [emailSent, setEmailSent] = React.useState(false);
  
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = (data: ForgotPasswordFormData) => {
    forgotPasswordMutation.mutate(data, {
      onSuccess: (response) => {
        if (response.status) {
          setEmailSent(true);
        }
      },
    });
  };

  const handleGoToReset = () => {
    const email = getValues('email');
    router.push(`/reset-password?email=${encodeURIComponent(email)}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full"
      >
        <Card className="shadow-lg">
          <CardHeader className="text-center pb-4">
            <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
              <Mail className="h-8 w-8 text-purple-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              {emailSent ? 'Check Your Email' : 'Forgot Password?'}
            </CardTitle>
            <p className="text-gray-600 mt-2">
              {emailSent 
                ? 'We\'ve sent reset instructions to your email address.'
                : 'Enter your email so we can send reset instructions!'
              }
            </p>
          </CardHeader>
          
          <CardContent>
            {!emailSent ? (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <Input
                  {...register('email')}
                  type="email"
                  placeholder="Enter your email"
                  error={errors.email?.message}
                />

                <Button
                  type="submit"
                  className="w-full"
                  loading={forgotPasswordMutation.isPending}
                >
                  Send Reset Instructions
                </Button>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="text-center text-sm text-gray-600">
                  <p>If you don't see the email, check your spam folder.</p>
                </div>
                
                <Button
                  onClick={handleGoToReset}
                  className="w-full"
                >
                  Enter Reset Code
                </Button>
                
                <Button
                  variant="outline"
                  onClick={() => setEmailSent(false)}
                  className="w-full"
                >
                  Try Different Email
                </Button>
              </div>
            )}

            <div className="mt-6 text-center">
              <Link 
                href="/login"
                className="inline-flex items-center text-sm text-purple-600 hover:text-purple-500"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to Login
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}