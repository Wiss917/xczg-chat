import { EasemobChat } from 'easemob-websdk';
import { IIMWebConfig } from '../interface/im';

export const registerHandleError = (err: EasemobChat.ErrorEvent) => {
  const errorData = JSON.parse(err.data);
  if (errorData.error === 'duplicate_unique_property_exists') {
    console.log('用户已存在！');
  } else if (errorData.error === 'illegal_argument') {
    if (errorData.error_description === 'USERNAME_TOO_LONG') {
      console.log('用户名超过64个字节！');
    } else {
      console.log('用户名不合法！');
    }
  } else if (errorData.error === 'unauthorized') {
    console.log('注册失败，无权限！');
  } else if (errorData.error === 'resource_limited') {
    console.log('您的App用户注册数量已达上限,请升级至企业版！');
  }
};

export const defaultIMWebConfig: IIMWebConfig = {
  socketServer: '//im-api-v2.easemob.com/ws', // socket Server地址

  restServer: '//a1.easemob.com', // rest Server地址

  appkey: 'easemob-demo#chatdemoui', // App key

  https: false, // 是否使用https

  isHttpDNS: true, // 3.0 SDK支持，防止DNS劫持从服务端获取XMPPUrl、restUrl

  isMultiLoginSessions: false, // 是否开启多页面同步收消息，注意，需要先联系商务开通此功能

  isDebug: false, // 打开调试，会自动打印log，在控制台的console中查看log

  autoReconnectNumMax: 2, // 断线重连最大次数

  heartBeatWait: 30000, // 心跳间隔（只在小程序中使用）

  delivery: false, // 是否发送已读回执

  useOwnUploadFun: false, // 是否使用自己的上传方式（如将图片文件等上传到自己的服务器，构建消息时只传url）

  deviceId: 'webim', // 设备ID，默认可不传，如果传一个固定值，在没开启多端登录的情况下同一个账号会互踢
};

export const defaultConnectionOpts: EasemobChat.ConnectionParameters = {
  isDebug: defaultIMWebConfig.isDebug,
  heartBeatWait: defaultIMWebConfig.heartBeatWait,
  autoReconnectNumMax: defaultIMWebConfig.autoReconnectNumMax,
  delivery: defaultIMWebConfig.delivery,
  appKey: defaultIMWebConfig.appkey,
  useOwnUploadFun: defaultIMWebConfig.useOwnUploadFun,
  deviceId: defaultIMWebConfig.deviceId,
  isHttpDNS: defaultIMWebConfig.isHttpDNS,
};

export const chatType = 'singleChat';
