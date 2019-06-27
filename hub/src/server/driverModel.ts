

import { Readable } from 'stream'

export interface ListFilesResult { 
  entries: Array<string>;
  page?: string;
}

export interface PerformWriteArgs { 
  path: string;
  storageTopLevel: string;
  stream: Readable;
  contentLength: number;
  contentType: string;
}

export interface PerformDeleteArgs {
  path: string;
  storageTopLevel: string;
}

export interface PerformReadArgs {
  path: string;
  storageTopLevel: string;
}

export interface ReadResult extends Required<StatResult> {
  data: Readable;
  exists: true
}

export interface PerformStatArgs {
  path: string;
  storageTopLevel: string;
}

export interface StatResult {
  exists: boolean;
  lastModifiedDate?: number;
  contentLength?: number;
  contentType?: string;
}

export interface PerformRenameArgs {
  path: string;
  storageTopLevel: string;
  newPath: string;
  newStorageTopLevel: string;
}

export interface DriverModel {
  getReadURLPrefix(): string;
  performWrite(args: PerformWriteArgs): Promise<string>;
  performDelete(args: PerformDeleteArgs): Promise<void>;
  performRename(args: PerformRenameArgs): Promise<void>;
  performStat(args: PerformStatArgs): Promise<StatResult>;
  performRead(args: PerformReadArgs): Promise<ReadResult>;
  listFiles(storageTopLevel: string, page?: string): Promise<ListFilesResult>;
  ensureInitialized(): Promise<void>;
  dispose(): Promise<void>;
}

export interface DriverConstructor {
  new (config: any): DriverModel;
}

export interface DriverModelTestMethods extends DriverModel {
  /**
   * Deletes the bucket. This is only meant to be used for cleaning up 
   * after performing integration testing so as not to exceed any max 
   * bucket/container limits. A sanity check is performed to ensure 
   * that the bucket is empty before deletion. 
   */
  deleteEmptyBucket(): Promise<void>;
}

export interface DriverStatics {
  getConfigInformation(): { defaults: any,
                            envVars: any }
}
