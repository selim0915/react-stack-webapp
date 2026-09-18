import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NewsFeed } from '../../types/newFeed.type';

interface NewsState {
  feeds: NewsFeed[];
  currentPage: number;
}

const initialState: NewsState = {
  feeds: [],
  currentPage: 1,
};

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    setFeeds: (state, action: PayloadAction<NewsFeed[]>) => {
      state.feeds = action.payload.map((feed) => ({
        ...feed,
        read: false,
      }));
    },
    makeRead: (state, action: PayloadAction<number>) => {
      state.feeds = state.feeds.map((feed) => (feed.id === action.payload ? { ...feed, read: true } : feed));
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
});

export const { setFeeds, makeRead, setCurrentPage } = newsSlice.actions;
export default newsSlice.reducer;
