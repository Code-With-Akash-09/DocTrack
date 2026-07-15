import { create } from "zustand";
import { devtools } from "zustand/middleware";

export const initialState = {
    user: null,
    open: false,
    callback: null,
    loading: true,
};

const useDOCStore = create(
    devtools(
        (set, get) => ({
            ...initialState,
            setUser: (user) => set({ user }),
            openModal: (callback) =>
                set({
                    open: true,
                    callback: typeof callback === "function" ? callback : null,
                }),

            closeModal: () =>
                set({
                    open: false,
                    callback: null,
                }),
            setLoading: (loading) => set({ loading }),
            logout: () =>
                set({
                    user: null,
                }),
        }),
        {
            name: "useDOCStore",
            enabled:
                (typeof window !== "undefined" &&
                    Boolean(window["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"])) ||
                process.env.VERCEL_ENV !== "production",
        },
    ),
);

export default useDOCStore;
