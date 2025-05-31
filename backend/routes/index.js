import userRoutes from "./userRoutes.js";
import rateLimitRoutes from "./rateLimitRoutes.js";

const unauthenticatedRoutes = [
  ["/api", userRoutes],
  ["/api/model", rateLimitRoutes],
];

export const attachedRoutes = (app) => {
  unauthenticatedRoutes.forEach((route) => {
    const [url, controller] = route;
    app.use(url, controller);
  });
};
