import { EasemobChat } from 'easemob-websdk';
import { WebIM } from '..';
import { ILoginOpt, IRegisterOpt } from '../../interface/im';

export async function register(
  this: WebIM,
  opts: IRegisterOpt
): Promise<EasemobChat.RegisterUserResult> {
  const { conn } = this;
  return await conn.registerUser(opts);
}

export async function login(
  this: WebIM,
  opt: ILoginOpt
): Promise<EasemobChat.LoginResult> {
  const { pwd, accessToken } = opt;

  if (!pwd && !accessToken) {
    throw new Error('登录参数不符合要求！');
  }

  const { conn } = this;
  return await conn.open(opt);
}
