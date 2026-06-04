'use client';

import { useRequestStore } from '@/store/useRequestStore';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ResponseBody } from './ResponseBody';
import { ResponseHeaders } from './ResponseHeaders';
import { Clock, Database, AlertCircle, CheckCircle2, XCircle, Activity, FileText, List } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ResponsePanel() {
  const { response, isLoading } = useRequestStore();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4">
        <div className="relative">
          <div className="w-12 h-12 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
          <Activity className="w-5 h-5 text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
        </div>
        <div className="text-center">
          <p className="text-sm font-medium text-muted-foreground">Sending request...</p>
          <p className="text-xs text-muted-foreground/60 mt-1">Waiting for server response</p>
        </div>
      </div>
    );
  }

  if (!response) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-3 text-muted-foreground/50">
        <div className="w-16 h-16 rounded-2xl bg-muted/50 flex items-center justify-center">
          <Activity className="w-8 h-8" />
        </div>
        <div className="text-center">
          <p className="text-sm font-medium">No response yet</p>
          <p className="text-xs mt-1">Send a request to see the response here</p>
        </div>
      </div>
    );
  }

  const isSuccess = response.status >= 200 && response.status < 300;
  const isError = response.status >= 400 || response.status === 0;

  return (
    <div className="flex flex-col h-full bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
      {/* Status Bar */}
      <div className="flex items-center gap-3 p-4 border-b border-border/50">
        <div className={cn(
          'flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-semibold border',
          isSuccess && 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800',
          isError && 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800',
          !isSuccess && !isError && 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800'
        )}>
          {isSuccess && <CheckCircle2 className="w-4 h-4" />}
          {isError && <XCircle className="w-4 h-4" />}
          {!isSuccess && !isError && <AlertCircle className="w-4 h-4" />}
          {response.status} {response.statusText}
        </div>

        <div className="flex items-center gap-1 text-xs text-muted-foreground bg-muted/50 px-2.5 py-1.5 rounded-lg">
          <Clock className="w-3.5 h-3.5" />
          {response.time}ms
        </div>

        <div className="flex items-center gap-1 text-xs text-muted-foreground bg-muted/50 px-2.5 py-1.5 rounded-lg">
          <Database className="w-3.5 h-3.5" />
          {(response.size / 1024).toFixed(2)} KB
        </div>
      </div>

      <Tabs defaultValue="body" className="flex-1 flex flex-col">
        <TabsList className="mx-4 mt-3 bg-muted/50 p-1 rounded-lg h-9 w-fit">
          <TabsTrigger value="body" className="text-xs gap-1.5 rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:shadow-sm">
            <FileText className="w-3.5 h-3.5" />
            Body
          </TabsTrigger>
          <TabsTrigger value="headers" className="text-xs gap-1.5 rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:shadow-sm">
            <List className="w-3.5 h-3.5" />
            Headers
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="body" className="flex-1 m-0 mt-2 overflow-hidden">
          <ResponseBody />
        </TabsContent>
        
        <TabsContent value="headers" className="flex-1 m-0 mt-2 overflow-auto">
          <ResponseHeaders />
        </TabsContent>
      </Tabs>
    </div>
  );
}
