import { auth } from '@clerk/nextjs/server';
import { createServerClient } from '@supabase/ssr';

export const createClient = async () => {
  // const { getToken } = auth();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, // secret key allowed on server
    {
      headers: {
        // Authorization: `Bearer ${await getToken({ template: 'supabase' })}`,
      },
    }
  );
};
