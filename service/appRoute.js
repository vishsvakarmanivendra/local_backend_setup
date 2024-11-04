// routes.js
import userRouter from "../route/userRouter.js";
import vendorRouter from "../route/vendorRouter.js";
import adminRouter from "../route/adminRoute.js";
import categoryRouter from "../route/categoryRouter.js";
import subCategoryRouter from "../route/subCategoryRouter.js";
import homeRouter from "../route/homeRouter.js";
import serviceRouter from "../route/serviceRoute.js";
import cartRouter from "../route/cartRoute.js";
import orderRoute from "../route/orderRoute.js";

export default function initializeRoutes(app) {
    app.get('/', (req, res) => {
        res.send('Hello, World!');
    });
    app.use("/user/", userRouter);
    app.use("/vendor/", vendorRouter);
    app.use("/admin/", adminRouter);
    app.use("/category/", categoryRouter);
    app.use("/subcategory/", subCategoryRouter);
    app.use("/service/", serviceRouter);
    app.use("/cart/", cartRouter);
    app.use("/order/", orderRoute);
}
