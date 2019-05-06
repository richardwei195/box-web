import request from '@/utils/request';

export function login(data: any) {
  return request({
    url: '/users/login',
    method: 'post',
    data,
  });
}

export function getInfo(token: string) {
  return request({
    url: '/users/info',
    method: 'get',
    params: { token },
  });
}

export function logout() {
  return request({
    url: '/users/logout',
    method: 'post',
  });
}
