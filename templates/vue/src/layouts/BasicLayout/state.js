const SET_STATE = 'basicLayout/SET_STATE';

export default {
  state: {
    collapsed: false,
  },
  mutations: {
    [SET_STATE]: (state, payload = {}) => {
      for (const key in payload) {
        if (Object.prototype.toString.call(payload, key)) {
          state[key] = payload[key];
        }
      }
    }
  },
  actions: {
    // 设置State
    [SET_STATE]({ commit }, payload) {
      commit(SET_STATE, payload);
    },
  }
};

const getters = {
  collapsed: state => state.basicLayout.collapsed,
};

const actionTypes = {
  SET_STATE
};

export {
  getters,
  actionTypes
};
