const getDefaultState = () => {
  return {
    isSidebarToggled: false,
    isModal: false,
    status: -1 // 0: normal, 1: under maintenance, 2: registration disabled
  }
};
// const state = getDefaultState()
const state = () => ({
  loading: true,
  isSidebarToggled: false,
  isModal: false,
  modalType: '',
  isMobileView: true,
  device: {},
  status:  -1 // 0: normal, 1: under maintenance, 2: registration disabled

});

const mutations = {
  setLoading(state) {
    return (state.loading = false);
  },
  setRightPanelToggle(state){
    return (state.isRightPanelToggled = !state.isRightPanelToggled);
  },
  // sidebar toggle handler
  setSidebarToggle(state) {
    return (state.isSidebarToggled = !state.isSidebarToggled);
  },
  // modal handler
  showModal(state) {
    state.isModal = true;

  },
  closeModal(state) {
    state.isModal = false;
    state.modalType = ''
  },
  logout(state) {
    Object.assign(state, getDefaultState())
  },
  setDevice(state, value){
    state.device = value
    if (value.isMobile || value.isTablet){
      state.isLeftPanelToggled = false;
      state.isRightPanelToggled = false;
    }
  },
  SET_MODAL_TYPE(state, value){
    state.isModal = true
    state.modalType = value
  },
  SET_STATUS(state, status) {
    console.log(status)
    state.status = status
  }
};
const actions = {
  setModalType({commit}, role){
    commit('SET_MODAL_TYPE', role)
  },
}

export default {
  state,
  mutations,
  actions
  // getters
}