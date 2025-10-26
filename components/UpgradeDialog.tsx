'use client';
import {  useDashboardStore } from '@/app/store/DashboardStore';

import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';

const UpgradeDialog = () => {
  const router = useRouter();
const {setOpenUpgradeDialog,openUpgradeDialog}=useDashboardStore()
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
