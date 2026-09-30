import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UIState {
  isDarkMode: boolean;
  isMenuOpen: boolean;
  modal: {
    isOpen: boolean;
    title: string;
    content: string;
  };
}

const initialState: UIState = {
  isDarkMode: false,
  isMenuOpen: false,
  modal: {
    isOpen: false,
    title: '',
    content: '',
  },
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
    },
    setDarkMode: (state, action: PayloadAction<boolean>) => {
      state.isDarkMode = action.payload;
    },
    toggleMenu: (state) => {
      state.isMenuOpen = !state.isMenuOpen;
    },
    setMenuOpen: (state, action: PayloadAction<boolean>) => {
      state.isMenuOpen = action.payload;
    },
    openModal: (state, action: PayloadAction<{ title: string; content: string }>) => {
      state.modal.isOpen = true;
      state.modal.title = action.payload.title;
      state.modal.content = action.payload.content;
    },
    closeModal: (state) => {
      state.modal.isOpen = false;
      state.modal.title = '';
      state.modal.content = '';
    },
  },
});

export const { toggleDarkMode, setDarkMode, toggleMenu, setMenuOpen, openModal, closeModal } = uiSlice.actions;
export default uiSlice.reducer;
