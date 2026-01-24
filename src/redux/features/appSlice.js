import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  currentView: null,
  sidebarOpen: true,
  selectedLiveStreamId: null,
  isModalOpen: false,
  modalType: null,
  notifications: [
    { id: '1', title: 'New Streamer: Alex J joined', time: '2m ago', type: 'info' },
    { id: '2', title: 'High risk content flagged', time: '15m ago', type: 'warning' },
    { id: '3', title: 'Withdrawal request approved', time: '1h ago', type: 'success' },
  ],
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setView: (state, action) => {
      state.currentView = action.payload;
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    selectLiveStream: (state, action) => {
      state.selectedLiveStreamId = action.payload;
      if (action.payload) {
        state.currentView = null;
      }
    },
    setModal: (state, action) => {
      state.isModalOpen = action.payload.isOpen;
      state.modalType = action.payload.type || null;
    },
    addNotification: (state, action) => {
      state.notifications.unshift(action.payload);
    },
    clearNotifications: (state) => {
      state.notifications = [];
    }
  },
});

export const { setView, toggleSidebar, selectLiveStream, setModal, addNotification, clearNotifications } = appSlice.actions;
export default appSlice.reducer;
