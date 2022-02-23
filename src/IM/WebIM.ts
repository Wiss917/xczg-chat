import { EasemobChat, EasemobChatStatic } from 'easemob-websdk';
import { IImgHook, ITxtHook } from '../interface/hook';
import { IIMWebConfig, ILoginOpt, IRegisterOpt } from '../interface/im';
import { chatType } from './defaults';
import { login, register } from './utils/base';
import { allowImgType } from './utils/img';
import { fail, success } from './utils/text';

export class WebIM {
  imsdk: EasemobChatStatic;

  conn: EasemobChat.Connection;

  config: IIMWebConfig;

  constructor(
    imsdk: EasemobChatStatic,
    config: {
      imConf: IIMWebConfig;
      connOpts: EasemobChat.ConnectionParameters;
    }
  ) {
    this.imsdk = imsdk;
    this.config = config.imConf;
    this.conn = new imsdk.connection(config.connOpts);
  }

  // #region 注册登录登出
  /**
   *
   * @description 注册通信账号
   * @param opts 注册选项
   * @returns 已注册用户基本信息
   */
  register = async (opts: IRegisterOpt) => register.bind(this)(opts);

  /**
   *
   * @description 可以通过token或者pwd方式登录
   * @param opts 登录选项
   * @returns token，过期时间，有效时长
   */
  login = async (opts: ILoginOpt) => login.bind(this)(opts);

  /**
   * @description 登出
   */
  logout = () => this.conn.close();

  // #endregion

  // #region 事件监听
  /**
   *
   * @todo 考虑对注册事件的管理
   * @param id 事件id
   * @param handler 事件回调
   */
  registerEventHandler = (
    id: string,
    handler: EasemobChat.EventHandlerType
  ): void => this.conn.addEventHandler(id, handler);

  /**
   *
   * @param id 事件id
   */
  removeEventHandler = (id: string): void => this.conn.removeEventHandler(id);
  // #endregion

  // #region 消息收发
  /**
   *
   * @param text 文本消息
   * @param to 接收方
   * @param from 发送方
   * @param hooks 文本消息发送钩子函数
   * @returns 本地消息id与服务器消息id
   */
  async sendTxt(text: string, to: string, from: string, hooks?: ITxtHook) {
    const {
      imsdk: { utils },
      conn,
    } = this;

    return conn.send({
      id: utils.getUniqueId(),
      msg: text,
      type: 'txt',
      to,
      from,
      chatType,
      success: hooks?.success || success,
      fail: hooks?.fail || fail,
      time: new Date().getTime(),
    });
  }

  /**
   *
   * @param input 文件接收元素或元素id
   * @param to 接收方
   * @param from 发送方
   * @param hooks 图片消息发送钩子函数
   * @returns 本地消息id与服务器消息id
   */
  async sendImg(
    input: string | HTMLInputElement,
    to: string,
    from: string,
    hooks?: IImgHook
  ) {
    const {
      imsdk: { utils },
      conn,
    } = this;

    const { url, filetype, data } = utils.getFileUrl(input);

    // todo 可以改成支持配置
    if (!allowImgType.includes(filetype.toLocaleLowerCase())) {
      throw new Error('不支持当前图片类型！');
    }

    if (!data || !url) {
      throw new Error('没有获取到图片资源！');
    }

    return conn.send({
      id: utils.getUniqueId(),
      type: 'img',
      time: new Date().getTime(),
      chatType,
      url,
      to,
      from,
      ...(hooks || {}),
    });
  }
  // #endregion
}
