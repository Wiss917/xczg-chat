import websdk, { EasemobChat } from 'easemob-websdk';
import { IIMWebConfig } from '../interface/im';
import { getConfig, getConnOpts } from './config';
import { WebIM } from './WebIM';

export const getWebIMInstance = (initOpts: {
  customConfig: IIMWebConfig;
  connectionOpts: EasemobChat.ConnectionParameters;
}): WebIM => new WebIM(websdk, {
  imConf: getConfig(initOpts.customConfig),
  connOpts: getConnOpts(initOpts.connectionOpts),
});
