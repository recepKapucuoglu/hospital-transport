import React, { useEffect, useLayoutEffect, useState } from "react";
import Logo from "../../assets/header/logoo.png";
import adminService from "../../services/adminService";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";

function TransferAdd() {
    const location = useLocation();
    const aracID = location.state && location.state.aracID;
    const yolcuID = location.state && location.state.yolcuID;
    if (aracID === null) {
        window.location.href = "/admin/transfer/yolcu";
    }
    console.log(location.state.yolcuID);
    const navigate = useNavigate();

    const [modal, setModal] = useState(false);

    const formik = useFormik({
        initialValues: {
            sefer_tarihi: "",
            sefer_saati: "",
            baslangic_noktasi: "",
            bitis_noktasi: ""
        },
        validationSchema: Yup.object({
            sefer_tarihi: Yup.date().required("Zorunlu alan"),
            sefer_saati: Yup.string().required("Zorunlu alan"),
            baslangic_noktasi: Yup.string().required("Zorunlu alan"),
            bitis_noktasi: Yup.string().required("Zorunlu alan")
        }),
        onSubmit: async (values) => {
            values.yolcu_id = yolcuID;
            values.arac_id = aracID;
            console.log(values);
            const result = await adminService.addTransferAdmin(values);
            if (result.response === 200) {
                setModal(true);
                const timeout = setTimeout(() => {
                    navigate("/admin/transfer");
                }, 1000);
            } else if (result.response === 500) {
            }
            else if (result.status === 400) {

            }
        },
    });

    return (
        <section className="bg-gray-50 bg-white">
            <div className="flex flex-col items-center justify-center px-3 py-3 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight  md:text-2xl ">
                            Transfer Ekle
                        </h1>
                        <form
                            className="space-y-4 md:space-y-6"
                            onSubmit={formik.handleSubmit}
                        >
                            <div>
                                <div>
                                    <label htmlFor="sefer_tarihi" className="py-2 max-md:text-sm">
                                        Sefer Tarihi (*)
                                    </label>
                                    <input
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:placeholder-gray-400 dark:text-gray-800 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        id="sefer_tarihi"
                                        name="sefer_tarihi"
                                        type="date"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.sefer_tarihi}
                                    />
                                    {formik.touched.sefer_tarihi && formik.errors.sefer_tarihi ? (
                                        <div>{formik.errors.sefer_tarihi}</div>
                                    ) : null}
                                </div>
                                <div>
                                    <label htmlFor="sefer_saati" className="py-2 max-md:text-sm">
                                        Sefer Saati (*)
                                    </label>
                                    <input
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:placeholder-gray-400 dark:text-gray-800 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        id="sefer_saati"
                                        name="sefer_saati"
                                        type="time"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.surucu_isim}
                                    />
                                    {formik.touched.sefer_saati && formik.errors.sefer_saati ? (
                                        <div>{formik.errors.sefer_saati}</div>
                                    ) : null}
                                </div>
                                <div>
                                    <label htmlFor="baslangic_noktasi" className="py-2 max-md:text-sm">
                                        Başlangıç Noktası (*)
                                    </label>
                                    <input
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:placeholder-gray-400 dark:text-gray-800 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        id="baslangic_noktasi"
                                        name="baslangic_noktasi"
                                        type="text"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.baslangic_noktasi}
                                    />
                                    {formik.touched.baslangic_noktasi && formik.errors.baslangic_noktasi ? (
                                        <div>{formik.errors.baslangic_noktasi}</div>
                                    ) : null}
                                </div>
                                <div>
                                    <label htmlFor="bitis_noktasi" className="py-2 max-md:text-sm">
                                        Bitiş Noktası (*)
                                    </label>
                                    <input
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:placeholder-gray-400 dark:text-gray-800 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        id="bitis_noktasi"
                                        name="bitis_noktasi"
                                        type="text"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.bitis_noktasi}
                                    />
                                    {formik.touched.bitis_noktasi && formik.errors.bitis_noktasi ? (
                                        <div>{formik.errors.bitis_noktasi}</div>
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

export default TransferAdd;
