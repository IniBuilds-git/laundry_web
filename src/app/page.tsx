"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  Star, 
  Phone, 
  Mail, 
  MapPin,
  CheckCircle2,
  Sparkles,
  Users,
  Award,
  Clock,
  Shield
} from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 overflow-hidden">
      <Header />
      <main>
        <HeroSection />
        <StatsSection />
        <FeaturesSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}

// Header Component
function Header() {
  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="backdrop-blur-md bg-white/70 sticky top-0 z-50 border-b border-white/20"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <motion.div 
            className="flex items-center gap-3"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-purple-700 rounded-2xl shadow-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">LR</span>
            </div>
            <span className="text-2xl font-extrabold bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent tracking-tight">
              LaundryRoom
            </span>
          </motion.div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="#services" className="text-gray-700 hover:text-purple-600 transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-purple-600 after:transition-all after:duration-300 hover:after:w-full">
              Services
            </Link>
            <Link href="#about" className="text-gray-700 hover:text-purple-600 transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-purple-600 after:transition-all after:duration-300 hover:after:w-full">
              About
            </Link>
            <Link href="#testimonials" className="text-gray-700 hover:text-purple-600 transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-purple-600 after:transition-all after:duration-300 hover:after:w-full">
              Reviews
            </Link>
            <Link href="#contact" className="text-gray-700 hover:text-purple-600 transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-purple-600 after:transition-all after:duration-300 hover:after:w-full">
              Contact
            </Link>
          </nav>
          
          <div className="flex space-x-4">
            <Link href="/login">
              <Button
                variant="outline"
                className="hidden sm:inline-flex border-purple-300 text-purple-700 hover:bg-purple-50"
              >
                Login
              </Button>
            </Link>
            <Link href="/register">
              <Button className="bg-purple-600 text-white hover:bg-purple-700 shadow-lg hover:shadow-xl">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </motion.header>
  );
}

// Hero Section Component
function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="relative py-24 lg:py-32">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center max-w-5xl mx-auto"
        >
          <motion.div variants={itemVariants} className="mb-6">
            <Badge variant="info" className="mb-4 px-4 py-2 text-sm font-medium bg-blue-100 text-blue-800">
              <Sparkles className="h-4 w-4 mr-2" />
              Professional Laundry Services in Lagos
            </Badge>
          </motion.div>
          
          <motion.h1 
            variants={itemVariants}
            className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight mb-8"
          >
            <span className="bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent block">
              Professional Laundry
            </span>
            <span className="text-gray-900 block">
              Made Simple
            </span>
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            className="text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            Experience hassle-free laundry at your fingertips. Schedule pickup, 
            track your order, and get your clothes delivered—clean, fresh, and perfectly pressed.
          </motion.p>
          
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row justify-center gap-6 mb-16"
          >
            <Link href="/register">
              <Button
                size="lg"
                className="bg-purple-600 text-white hover:bg-purple-700 px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl group transition-all duration-200"
              >
                Book Service Now
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="#services">
              <Button
                variant="outline"
                size="lg"
                className="border-purple-300 text-purple-700 hover:bg-purple-50 px-8 py-4 text-lg"
              >
                View Services
              </Button>
            </Link>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap justify-center items-center gap-8 opacity-70"
          >
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              <span className="text-sm text-gray-600">Free Pickup & Delivery</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-blue-600" />
              <span className="text-sm text-gray-600">Insured Service</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-purple-600" />
              <span className="text-sm text-gray-600">24/7 Tracking</span>
            </div>
            <div className="flex items-center space-x-2">
              <Award className="h-5 w-5 text-orange-600" />
              <span className="text-sm text-gray-600">Premium Quality</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// Stats Section Component
function StatsSection() {
  const stats = [
    { number: "5000+", label: "Happy Customers", icon: Users },
    { number: "50,000+", label: "Items Cleaned", icon: Sparkles },
    { number: "99%", label: "Satisfaction Rate", icon: Star },
    { number: "24/7", label: "Customer Support", icon: Phone },
  ];

  return (
    <section className="py-16 bg-white/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="text-center group"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-purple-700 rounded-2xl mb-4 group-hover:shadow-lg transition-all duration-300">
                <stat.icon className="h-8 w-8 text-white" />
              </div>
              <div className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// Features Section Component
function FeaturesSection() {
  const features = [
    {
      title: "Professional Care",
      description: "Expert handling of all fabric types with premium cleaning solutions and advanced techniques for the best results.",
      icon: "👕",
      color: "from-purple-500 to-purple-600",
    },
    {
      title: "Free Pickup & Delivery",
      description: "Convenient pickup and delivery services right to your doorstep at no extra cost. We come to you!",
      icon: "🚚",
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Fast Turnaround",
      description: "Standard 4–6 days delivery or express 1–2 days service available for your urgent laundry needs.",
      icon: "⚡",
      color: "from-green-500 to-green-600",
    },
    {
      title: "Secure & Insured",
      description: "Your clothes are safe with our fully insured service and real-time tracking for complete peace of mind.",
      icon: "🛡️",
      color: "from-indigo-500 to-indigo-600",
    },
    {
      title: "Eco-Friendly",
      description: "We use environmentally friendly cleaning products that are safe for your clothes and the planet.",
      icon: "🌱",
      color: "from-emerald-500 to-emerald-600",
    },
    {
      title: "24/7 Support",
      description: "Round-the-clock customer support to help you with any questions or concerns about your laundry.",
      icon: "💬",
      color: "from-pink-500 to-pink-600",
    },
  ];

  return (
    <section id="services" className="py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent mb-6">
            Why Choose LaundryRoom?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We provide premium laundry services with the convenience, quality, and care your clothes deserve.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group"
            >
              <Card className="backdrop-blur-md bg-white/70 hover:shadow-xl h-full border-0 overflow-hidden transition-all duration-300">
                <CardHeader className="text-center pb-4">
                  <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900 mb-2">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-center leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
                <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r ${feature.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}></div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Testimonials Section Component
function TestimonialsSection() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      location: "Lagos Island",
      rating: 5,
      comment: "Amazing service! My clothes came back looking brand new. The pickup and delivery was so convenient. I highly recommend LaundryRoom!",
      avatar: "👩🏾‍💼",
    },
    {
      name: "Michael Adebayo",
      location: "Victoria Island",
      rating: 5,
      comment: "Professional and reliable service. I've been using LaundryRoom for 6 months and they never disappoint. Great quality every time!",
      avatar: "👨🏿‍💼",
    },
    {
      name: "Funmi Okafor",
      location: "Ikeja",
      rating: 5,
      comment: "Best laundry service in Lagos! Great pricing, excellent quality, and amazing customer service. Highly recommended to everyone!",
      avatar: "👩🏽‍🎓",
    },
  ];

  return (
    <section id="testimonials" className="py-24 bg-white/30 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent mb-6">
            What Our Customers Say
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our happy customers have to say about our service.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Card className="backdrop-blur-md bg-white/70 h-full border-0">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6 leading-relaxed italic">
                    "{testimonial.comment}"
                  </p>
                  <div className="flex items-center">
                    <div className="text-4xl mr-4">{testimonial.avatar}</div>
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-600 flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {testimonial.location}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// CTA Section Component
function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-purple-700 opacity-10"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent mb-6">
            Ready to Experience the Best Laundry Service?
          </h2>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Join thousands of satisfied customers who trust LaundryRoom with their laundry needs. 
            Get started today and experience the difference!
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
            <Link href="/register">
              <Button
                size="lg"
                className="bg-purple-600 text-white hover:bg-purple-700 px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl group"
              >
                Start Your First Order
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="tel:+2348012345678">
              <Button
                variant="outline"
                size="lg"
                className="border-purple-300 text-purple-700 hover:bg-purple-50 px-8 py-4 text-lg"
              >
                <Phone className="mr-2 h-5 w-5" />
                Call Us Now
              </Button>
            </Link>
          </div>
          <p className="text-sm text-gray-600">
            🎉 New customers get 20% off their first order!
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// Footer Component
function Footer() {
  return (
    <footer id="contact" className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold">LR</span>
              </div>
              <span className="text-xl font-bold">LaundryRoom</span>
            </div>
            <p className="text-gray-400 mb-4">
              Your premium laundry service provider in Lagos. Professional care for all your clothing needs.
            </p>
            <div className="flex space-x-4">
              <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
                <span className="text-sm">f</span>
              </div>
              <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
                <span className="text-sm">t</span>
              </div>
              <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
                <span className="text-sm">i</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="#" className="hover:text-white transition-colors">Dry Cleaning</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Wash & Fold</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Express Service</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Pickup & Delivery</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3 text-gray-400">
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                <span>+234 801 234 5678</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                <span>hello@laundryroom.ng</span>
              </div>
              <div className="flex items-start">
                <MapPin className="h-4 w-4 mr-2 mt-1" />
                <span>123 Business District,<br />Lagos Island, Nigeria</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>&copy; 2024 LaundryRoom. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}