import { PricingTable } from '@clerk/nextjs';

const Page = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:bg-gradient-to-br dark:from-blue-950 dark:via-black dark:to-purple-950">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-600 dark:text-gray-300">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-500 dark:text-gray-400">
            Select the perfect for your needs
          </p>
        </div>
        <div className="mx-auto max-w-5xl">
          <PricingTable newSubscriptionRedirectUrl="/dashboard" />
        </div>
      </div>
    </div>
  );
};

export default Page;
