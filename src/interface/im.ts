import { EasemobChat, EasemobChatStatic } from 'easemob-websdk';

/**
 * @description im通信配置
 */
export interface IIMWebConfig {
  /**
   * socket Server地址
   */
  socketServer: string;
  /**
   * rest Server地址
   */
  restServer: string;
  /**
   * App key
   */
  appkey: string;
  /**
   * 是否使用https
   */
  https: boolean;
  /**
   * 防止DNS劫持从服务端获取XMPPUrl、restUrl
   */
  isHttpDNS: boolean;

  isMultiLoginSessions: boolean; // 是否开启多页面同步收消息，注意，需要先联系商务开通此功能

  isDebug: boolean; // 打开调试，会自动打印log，在控制台的console中查看log

  autoReconnectNumMax: number; // 断线重连最大次数

  heartBeatWait: number; // 心跳间隔（只在小程序中使用）

  delivery: boolean; // 是否发送已读回执

  useOwnUploadFun: boolean; // 是否使用自己的上传方式（如将图片文件等上传到自己的服务器，构建消息时只传url）

  deviceId: string; // 设备ID，默认可不传，如果传一个固定值，在没开启多端登录的情况下同一个账号会互踢
}

export interface IWebIM extends EasemobChatStatic {
  config: IIMWebConfig;
  conn: EasemobChat.Connection;
}

export interface IRegisterOpt {
  username: string;
  password: string;
  nickname?: string;
  success?: (res: any) => void;
  error?: (err: EasemobChat.ErrorEvent) => void;
  apiUrl?: string;
}

export interface ILoginOpt {
  user: string;
  pwd?: string;
  accessToken?: string;
  agoraToken?: string;
  success?: (res: any) => void;
  error?: (res: any) => void;
}
