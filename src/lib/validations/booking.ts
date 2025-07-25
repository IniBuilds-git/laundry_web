// src/lib/validations/booking.ts
import { z } from 'zod';

export const addressSchema = z.object({
  address: z
    .string()
    .min(1, 'Address is required')
    .min(10, 'Please provide a detailed address'),
  state: z
    .string()
    .min(1, 'State is required'),
  lga: z
    .string()
    .min(1, 'Local Government Area is required'),
});

export const scheduleSchema = z.object({
  pickupDate: z
    .date()
    .refine((date) => date > new Date(), {
      message: 'Pickup date must be in the future',
    }),
  pickupTime: z
    .string()
    .min(1, 'Pickup time is required')
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Please select a valid time'),
  deliveryType: z.enum(['standard', 'express']),
  needsPickup: z.boolean(),
  needsDelivery: z.boolean(),
  specialInstructions: z
    .string()
    .max(500, 'Special instructions cannot exceed 500 characters')
    .optional(),
});

export const orderItemSchema = z.object({
  productId: z.number().min(1, 'Product is required'),
  serviceId: z.number().min(1, 'Service is required'),
  quantity: z
    .number()
    .min(1, 'Quantity must be at least 1')
    .max(50, 'Quantity cannot exceed 50'),
});

export const createOrderSchema = z.object({
  items: z
    .array(orderItemSchema)
    .min(1, 'Please select at least one item'),
  address: addressSchema,
  schedule: scheduleSchema,
  express: z.boolean().default(false),
});

// Contact form validation
export const contactFormSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .min(2, 'Name must be at least 2 characters'),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  subject: z
    .string()
    .min(1, 'Subject is required')
    .min(5, 'Subject must be at least 5 characters'),
  message: z
    .string()
    .min(1, 'Message is required')
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message cannot exceed 1000 characters'),
});

// Type exports
export type AddressFormData = z.infer<typeof addressSchema>;
export type ScheduleFormData = z.infer<typeof scheduleSchema>;
export type OrderItemFormData = z.infer<typeof orderItemSchema>;
export type CreateOrderFormData = z.infer<typeof createOrderSchema>;
export type ContactFormData = z.infer<typeof contactFormSchema>;

