
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Separator } from '@/components/ui/separator';

const Privacy = () => {
  return (
    <Layout>
      <div className="container py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
          <p className="text-muted-foreground mb-8">
            Last updated: April 7, 2025
          </p>
          
          <Separator className="my-8" />
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Introduction</h2>
            <p className="mb-4">
              CineNiche ("we," "our," or "us") respects your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our streaming service.
            </p>
            <p>
              Please read this Privacy Policy carefully. By continuing to use our service, you consent to the practices described in this policy.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Information We Collect</h2>
            <p className="mb-4">We may collect several types of information from and about users of our service, including:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Personal information (such as name, email address, and billing information)</li>
              <li>Usage data (including viewing history, search queries, and interactions)</li>
              <li>Device information (such as IP address, browser type, and operating system)</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">How We Use Your Information</h2>
            <p className="mb-4">We use your information for various purposes, including to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Provide, maintain, and improve our service</li>
              <li>Process transactions and manage your account</li>
              <li>Send you notifications, updates, and promotional materials</li>
              <li>Generate personalized recommendations based on your viewing history</li>
              <li>Monitor and analyze usage patterns and trends</li>
              <li>Protect against fraudulent or unauthorized activity</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Disclosure of Your Information</h2>
            <p className="mb-4">We may disclose your personal information in the following circumstances:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>To our subsidiaries and affiliates</li>
              <li>To contractors, service providers, and other third parties we use to support our business</li>
              <li>To fulfill the purpose for which you provided the information</li>
              <li>For any other purpose disclosed by us when you provide the information</li>
              <li>To comply with legal obligations or enforce our agreements</li>
              <li>If we believe disclosure is necessary to protect our rights, property, or safety, or that of our users or others</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Your Choices</h2>
            <p className="mb-4">We offer you choices regarding the collection, use, and sharing of your personal information:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>You can update your account information through your account settings</li>
              <li>You can opt-out of receiving promotional emails by following the instructions in those emails</li>
              <li>You can choose to delete your viewing history from your account settings</li>
              <li>You can set your browser to refuse cookies or alert you when cookies are being sent</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Data Security</h2>
            <p>
              We implement appropriate security measures to protect your personal information. However, no method of transmission or electronic storage is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Changes to Our Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at privacy@cineniche.com.
            </p>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default Privacy;
