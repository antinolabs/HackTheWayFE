import { createSlice } from '@reduxjs/toolkit';

const states = {
    public: true,
    dashboard: false
}

const LayoutSlice = createSlice({
    name: "layout",
    initialState: states,
    reducers: {
        setDashboard: (state, action) => {
            if (action.payload === "dashbaord") {
                return { ...state, public: false, dashboard: true }
            }
        },
        setPublic: (state, action) => {
            if (action.payload === "public") {
                return { ...state, public: true, dashboard: false }
            }
        }
    }
})

export const { setDashboard, setPublic } = LayoutSlice.actions;
export default LayoutSlice.reducer;
