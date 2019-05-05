import { login, logout, getInfo } from '@/api/user';
import Vuex, { ActionTree, MutationTree } from 'vuex';
import { getToken, setToken, removeToken } from '@/utils/auth';

interface UserState {
  name: string;
  avatar: string;
  introduction: string;
  token: string | undefined;
}

const userState: UserState = {
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
};

const mutations: MutationTree<any> = {
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction;
  },
  SET_NAME: (state, name) => {
    state.name = name;
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar;
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles;
  },
};

const actions: ActionTree<any, any> = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo;
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password }).then((response) => {
        const { data } = response;
        commit('SET_TOKEN', data.token);
        setToken(data.token);
        resolve();
      }).catch((error: Error) => {
        reject(error);
      });
    });
  },
};

export default {
  userState,
  mutations,
  actions,
};
