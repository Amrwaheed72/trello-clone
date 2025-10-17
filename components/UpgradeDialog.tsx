'use client';
import { DashboardStore } from '@/app/store/DashboardStore';

import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

const Dialog = dynamic(
  () => import('@/components/ui/dialog').then((mod) => mod.Dialog),
  {
    ssr: false,
  },
);

const DialogContent = dynamic(
  () => import('@/components/ui/dialog').then((mod) => mod.DialogContent),
  {
    ssr: false,
  },
);

const DialogDescription = dynamic(
  () => import('@/components/ui/dialog').then((mod) => mod.DialogDescription),
  {
    ssr: false,
  },
);

const DialogHeader = dynamic(
  () => import('@/components/ui/dialog').then((mod) => mod.DialogHeader),
  {
    ssr: false,
  },
);

const DialogTitle = dynamic(
  () => import('@/components/ui/dialog').then((mod) => mod.DialogTitle),
  {
    ssr: false,
  },
);
const UpgradeDialog = () => {
  const openUpgradeDialog = DashboardStore((state) => state.openUpgradeDialog);
  const setOpenUpgradeDialog = DashboardStore(
    (state) => state.setOpenUpgradeDialog,
  );
  const router = useRouter();
  return (
    <Dialog open={openUpgradeDialog} onOpenChange={setOpenUpgradeDialog}>
      <DialogContent className="mx-auto w-[95vw] max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Upgrade Plan Needed!</DialogTitle>
          <DialogDescription>
            You must upgrade to Pro plan to be able to create more boards
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-2">
          <Button
            onClick={() => setOpenUpgradeDialog(false)}
            size={'sm'}
            variant={'outline'}
          >
            Cancel
          </Button>
          <Button onClick={() => router.push('/pricing')} size={'sm'}>
            Upgrade
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpgradeDialog;
