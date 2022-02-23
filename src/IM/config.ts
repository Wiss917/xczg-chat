import { EasemobChat } from 'easemob-websdk';
import { IIMWebConfig } from '../interface/im';
import { defaultConnectionOpts, defaultIMWebConfig } from './defaults';

/**
 *
 * @param customConfig 自定义通讯参数
 * @returns 环信通讯sdk配置参数
 */
export function getConfig(customConfig?: Partial<IIMWebConfig>): IIMWebConfig {
  return {
    ...defaultIMWebConfig,
    ...customConfig,
  };
}

export function getConnOpts(
  customOpts?: Partial<EasemobChat.ConnectionParameters>,
) {
  return {
    ...defaultConnectionOpts,
    ...customOpts,
  };
}

export function getConnListenOpts() {}
