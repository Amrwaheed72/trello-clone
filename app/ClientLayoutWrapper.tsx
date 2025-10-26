'use client';
import dynamic from 'next/dynamic';
const Providers = dynamic(() => import('./Providers'), { ssr: false });
const ClientLayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  return <Providers>{children}</Providers>;
};

export default ClientLayoutWrapper;
