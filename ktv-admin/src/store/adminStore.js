
export default {
  state: {
    isAdminAuthorization: false,
    adminInfo: []
  },
  getters: {
    isAdminAuthorization: state => state.isAdminAuthorization,
    adminInfo: state => state.adminInfo,
  },
  mutations: {
    isAdminAuthorization: (state, authorization) => {
      state.isAdminAuthorization = authorization;
    },
    setAdminInfo: (state, info) => {
      state.adminInfo = info;
    }
  },
  actions: {
    isAdminAuthorization: ({
      commit
    }, authorization) => {
      commit("isAdminAuthorization", authorization);
    },
    setAdminInfo: ({
      commit
    }, info) => {
      commit("setAdminInfo", info);
    },
    clearAdminAuthorization: ({
      commit
    }) => {
      localStorage.removeItem("adminToken");
      commit("isAdminAuthorization", false);
    }
  }
}