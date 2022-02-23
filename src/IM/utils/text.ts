import { EasemobChat } from 'easemob-websdk';

export const success = (res: EasemobChat.SendMsgResult) => {
  console.log(res);
};

export const fail: VoidFunction = (...args) => {
  console.log(args);
};
