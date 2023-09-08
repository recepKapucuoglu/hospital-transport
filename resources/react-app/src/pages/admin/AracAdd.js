import React, { useEffect, useLayoutEffect, useState } from "react";
import Logo from "../../assets/header/logoo.png";
import adminService from "../../services/adminService";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

function AracAdd() {
    const navigate = useNavigate();
    const location = useLocation();
    const yolcuID = location.state && location.state.yolcuID;
    if (yolcuID === null) {
        window.location.href = "/admin/transfer/yolcu";
    }
    const [modal, setModal] = useState(false);
    const formik = useFormik({
        initialValues: {
            model: "",
            surucu_isim: "",
            surucu_soyisim: "",
        },
        validationSchema: Yup.object({
            model: Yup.string().required("Zorunlu alan"),
            surucu_isim: Yup.string().required("Zorunlu alan"),
            surucu_soyisim: Yup.string().required("Zorunlu alan")
        }),
        onSubmit: async (values) => {
            const result = await adminService.addAracAdmin(values);
            console.log(result);
            if (result.response === 200) {
                setModal(true);
                const aracID=result.id;
                const timeout = setTimeout(() => {
                    navigate("/admin/transfer/yolcu/arac/transfer", { state: { aracID : aracID , yolcuID :yolcuID} });
                }, 1000);           
            } else if (result.response === 500) {
                setModal(true);
            }
            else if (result.status === 400)  {               
            }
        },
    });

    return (
        <section className="bg-gray-50 bg-white">
            <div className="flex flex-col items-center justify-center px-3 py-3 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight  md:text-2xl ">
                            Arac Ekle
                        </h1>
                        <form
                            className="space-y-4 md:space-y-6"
                            onSubmit={formik.handleSubmit}
                        >
                            <div>
                                <div>
                                <label htmlFor="model" className="py-2 max-md:text-sm">
                                    Model (*)
                                </label>
                                <input
                                    // ref={firstErrorFieldRef}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:placeholder-gray-400 dark:text-gray-800 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    id="model"
                                    name="model"
                                    type="text"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.model}
                                />
                                {formik.touched.model && formik.errors.model ? (
                                  <div>{formik.errors.model}</div>
                                    ) : null}
                                </div>
                                <div>
                                <label htmlFor="soyisim" className="py-2 max-md:text-sm">
                                surucu_isim (*)
                                </label>
                                <input
                                    // ref={firstErrorFieldRef}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:placeholder-gray-400 dark:text-gray-800 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    id="surucu_isim"
                                    name="surucu_isim"
                                    type="text"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.surucu_isim}
                                />
                                {formik.touched.surucu_isim && formik.errors.surucu_isim ? (
                                  <div>{formik.errors.surucu_isim}</div>
                                    ) : null}
                                </div>
                                <div>
                                <label htmlFor="telefon" className="py-2 max-md:text-sm">
                                surucu_soyisim (*)
                                </label>
                                <input
                                    // ref={firstErrorFieldRef}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:placeholder-gray-400 dark:text-gray-800 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    id="surucu_soyisim"
                                    name="surucu_soyisim"
                                    type="text"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.surucu_soyisim}
                                />
                                {formik.touched.surucu_soyisim && formik.errors.surucu_soyisim ? (
                                  <div>{formik.errors.surucu_soyisim}</div>
                                    ) : null}
                                </div>                                
                            </div>                     
                            <button
                                type="submit"
                                className="w-full bg-orange-500 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                            >
                                Yolcuyu Kaydet
                            </button>
                          
                        </form>
                    </div>
                </div>
                {modal && (
                     <div
                     className="absolute top-5 right-5 flex p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
                     role="alert"
                 >
                     <svg
                         aria-hidden="true"
                         className="flex-shrink-0 inline w-5 h-5 mr-3"
                         fill="currentColor"
                         viewBox="0 0 20 20"
                         xmlns="http://www.w3.org/2000/svg"
                     >
                         <path
                             fillRule="evenodd"
                             d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                             clipRule="evenodd"
                         ></path>
                     </svg>
                     <span className="sr-only">Info</span>
                     <div>
                         <span className="font-medium"></span> İşlemler Gerçekleştirildi
                     </div>
                     <button
                         type="button"
                         className="ml-auto -mx-1.5 -my-1.5 bg-green-50 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 inline-flex h-8 w-8 dark:bg-gray-800 dark:text-green-400 dark:hover:bg-gray-700"
                         data-dismiss-target="#alert-2"
                         aria-label="Close"
                         onClick={() => setModal(false)}
                     >
                         <span className="sr-only">Close</span>
                         <svg
                             className="w-5 h-5"
                             fill="currentColor"
                             viewBox="0 0 20 20"
                             xmlns="http://www.w3.org/2000/svg"
                         >
                             <path
                                 fillRule="evenodd"
                                 d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                 clipRule="evenodd"
                             ></path>
                         </svg>
                     </button>
                 </div>
                )}
            </div>
        </section>
    );
}
export default AracAdd;
