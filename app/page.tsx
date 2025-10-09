import HomeNavbar from '@/components/HomeNavbar';
import { Button } from '@/components/ui/button';
import { SignUpButton } from '@clerk/nextjs';
import {
  ArrowRight,
  CheckSquare,
  Shield,
  Trello,
  Users,
  Zap,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { auth } from '@clerk/nextjs/server';
const Home = async () => {
  const { userId } = await auth();
  const features = [
    {
      icon: CheckSquare,
      title: 'Task Management',
      description: 'Organize your tasks with intuitive drag-and-drop boards',
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      description: 'Work together with your team in real-time',
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Built with Next.js 15 for optimal performance',
    },
    {
      icon: Shield,
      title: 'Secure',
      description: 'Enterprise-grade security with Clerk authentication',
    },
  ];
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:bg-gradient-to-br dark:from-blue-950 dark:via-black dark:to-purple-950">
      <HomeNavbar />
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-6 text-5xl font-bold md:text-6xl">
            Organize work and life,{' '}
            <span className="text-blue-600">finally.</span>
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-xl text-gray-600 dark:text-gray-300">
            Planify helps teams move work forward. Collaborate, manage
            projects, and reach new productivity peaks. From high rises to the
            home office, the way your team works is unique—accomplish it all
            with Planify.
          </p>

          {!userId && (
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <SignUpButton>
                <Button size="lg" className="px-8 text-lg">
                  Start for free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </SignUpButton>
              <Button variant="outline" size="lg" className="px-8 text-lg">
                Watch demo
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Everything you need to stay organized
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-gray-600 dark:text-gray-300">
            Powerful features to help your team collaborate and get more done.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border-0 shadow-lg transition-shadow hover:shadow-xl"
            >
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                  <feature.icon className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-blue-600 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
            Ready to get started?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-xl text-blue-100">
            Join thousands of teams who are already using Planify to
            organize their work.
          </p>

          {!userId && (
            <SignUpButton>
              <Button size="lg" variant="secondary" className="px-8 text-lg">
                Start your free trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </SignUpButton>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-12 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <div className="mb-4 flex items-center space-x-2 md:mb-0">
              <Trello className="h-6 w-6 text-blue-400" />
              <span className="text-xl font-bold">Planify</span>
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <span>© 2024 Planify. All rights reserved.</span>
              <span>Built with Next.js & Clerk</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
export default Home;
