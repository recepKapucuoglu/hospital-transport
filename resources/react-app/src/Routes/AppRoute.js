import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import RootLayout from "../layouts/RootLayout";
import Contact from "../pages/Contact/Contact";
import Deneme from "../components/Deneme/MenuFirst";
import QueryLogin from "../components/queryLogin/QueryLogin";
import ProtectedRoute from "./ProtectedRoute";
import AdminLayout from "../layouts/AdminLayout";
import YolcuList from "../pages/admin/YolcuList";
import AracList from "../pages/admin/AracList";
import TransferList from "../pages/admin/TransferList";
import YolcuAdd from "../pages/admin/YolcuAdd";
import AracAdd from "../pages/admin/AracAdd";
import TransferAdd from "../pages/admin/TransferAdd";
import YolcuEdit from "../pages/admin/YolcuEdit";
import AracEdit from "../pages/admin/AracEdit";
import TransferEdit from "../pages/admin/TransferEdit";

function AppRoute() {
    return (
        <Routes>
            <Route>
                <Route path="" element={<RootLayout />}>
                    <Route path="/" element={<Home />} />
                </Route>
                <Route path="/contact" element={<Contact />} />
                <Route path="/deneme" element={<Deneme />} />
                <Route path="/admin" element={<QueryLogin />} />
                <Route path="" element={<ProtectedRoute />}>
                    <Route path="" element={<AdminLayout />}>
                        <Route
                            path="/admin/arac"
                            element={<AracList />}
                        />
                        <Route
                            path="/admin/arac/duzenle/:paramsID"
                            element={<AracEdit />}
                        />
                        <Route
                            path="/admin/yolcu"
                            element={<YolcuList />}
                        />
                        <Route
                            path="/admin/yolcu/duzenle/:paramsID"
                            element={<YolcuEdit />}
                        />

                        <Route path="/admin/transfer">
                            <Route
                                index
                                element={<TransferList />}
                            />
                            <Route
                                path="/admin/transfer/duzenle/:paramsID"
                                element={<TransferEdit />}
                            />
                            <Route path="/admin/transfer/yolcu">
                                <Route
                                    index
                                    element={<YolcuAdd />}
                                />
                                <Route
                                    path="/admin/transfer/yolcu/arac"
                                    element={<AracAdd />}
                                />
                                <Route
                                    path="/admin/transfer/yolcu/arac/transfer"
                                    element={<TransferAdd />}
                                />                   
                            </Route>
                        </Route>
                    </Route>
                </Route>
            </Route>
        </Routes>
    );
}

export default AppRoute;
