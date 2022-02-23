import { EasemobChat as websdk } from 'easemob-websdk';

export interface IImgHook {
  onFileUploadError?: (error: any) => void;
  onFileUploadComplete?: (data: any) => void;
  onFileUploadProgress?: (data: ProgressEvent) => void;
  uploadError?: (error: any) => void;
  uploadComplete?: (data: any) => void;
}

export interface ITxtHook {
  success?: (res: websdk.SendMsgResult) => void;
  fail?: VoidFunction;
}
