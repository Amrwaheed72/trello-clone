import { Spinner } from '@/components/ui/spinner';

function Loading() {
  return (
    <div className="flex h-[50vh] items-center justify-center">
      <Spinner size="xl" variant="ring" />
    </div>
  );
}
export default Loading;
