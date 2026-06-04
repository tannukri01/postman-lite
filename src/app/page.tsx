'use client';

import { RequestPanel } from '@/components/request-panel/RequestPanel';
import { ResponsePanel } from '@/components/response-panel/ResponsePanel';
import { AppLayout } from '@/components/layout/AppLayout';

export default function Home() {
  return (
    <AppLayout>
      <div className="flex h-full">
        <div className="flex-1">
          <RequestPanel />
        </div>
        <div className="flex-1">
          <ResponsePanel />
        </div>
      </div>
    </AppLayout>
  );
}
