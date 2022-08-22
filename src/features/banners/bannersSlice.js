import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    id: "1",
    title: "Banner 1",
    completed: false,
    description: "Es un banner",
    purchase: "https://www.google.com.mx/",
    time: new Date("2018/01/30 23:30:14"),
    date: new Date("2022/08/20"),
    desktop: 'escritorio.png',
    tablet: 'tablet.png',
    mobile: 'mobile.png'
  },
  {
    id: "2",
    title: "Banner 2",
    completed: false,
    purchase: "https://boletia.com/",
    description: "Es un banner",
    time: new Date("2018/01/30 23:30:14"),
    date: new Date("2022/08/20"),
    desktop: 'escritorio.png',
    tablet: 'tablet.png',
    mobile: 'mobile.png'
  },
];

const userSlice = createSlice({
  name: "banners",
  initialState,
  reducers: {
    addBanner: (state, action) => {
      state.push(action.payload);
    },
    editBanner: (state, action) => {
      const { id, title, description, time, date, desktop, tablet, mobile, purchase } = action.payload;
      const foundBanner = state.find((banner) => banner.id === id);
      if (foundBanner) {
        foundBanner.title = title;
        foundBanner.description = description;
        foundBanner.time = time;
        foundBanner.date = date;
        foundBanner.desktop = desktop;
        foundBanner.tablet = tablet;
        foundBanner.mobile = mobile;
        foundBanner.purchase = purchase;
      }
    },
    deleteBanner: (state, action) => {
      const foundBanner = state.find((banner) => banner.id === action.payload);
      if (foundBanner) {
        state.splice(state.indexOf(foundBanner), 1);
      }
    },
  },
});

export const { addBanner, editBanner, deleteBanner } = userSlice.actions;
export default userSlice.reducer;