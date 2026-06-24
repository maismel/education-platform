import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001",
  withCredentials: true,
});

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;
    const isRefreshableRequest = !originalRequest.url?.startsWith("/auth/");

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      isRefreshableRequest
    ) {
      originalRequest._retry = true;

      await api.post("/auth/refresh");

      return api(originalRequest);
    }

    return Promise.reject(error);
  },
);

// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         const res = await api.post(
//           "/refresh",
//           {},
//           { withCredentials: true },
//         );

//         const newAccessToken = res.data.accessToken;

//         useAuthStore.getState().setAccessToken(newAccessToken);

//         originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

//         return api(originalRequest);
//       } catch (e) {
//         throw new Error(e?.response?.data?.message || 'Logout)
//       }
//     }

//     return Promise.reject(error);
//   },
// );
