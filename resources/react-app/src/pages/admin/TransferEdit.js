import React, { useEffect, useLayoutEffect, useState } from "react";
import adminService from "../../services/adminService";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
function TransferEdit() {
    const navigate = useNavigate();
    const { paramsID } = useParams();
    const [GetData, setGetData] = useState([]);
    const [GetYolcuData, setGetYolcuData] = useState([]);
    const [GetAracData, setGetAracData] = useState([]);
    const [modal, setModal] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await adminService.getTransferAdmin(paramsID);
                setGetData({
                    yolcu_id: result.yolcu_id,
                    arac_id: result.arac_id,
                    sefer_tarihi: result.sefer_tarihi,
                    sefer_saati: result.sefer_saati,
                    baslangic_noktasi: result.baslangic_noktasi,
                    bitis_noktasi: result.bitis_noktasi,
                    yolcu_isim: result.yolcu.isim,
                    arac_model: result.arac.model,
                });
            } catch (error) {
                console.error('API hatası:', error);
            }
        };
        const fetchYolcuData = async () => {
            try {
                const result = await adminService.getAllYolcu();
                setGetYolcuData(result.data);
            } catch (error) {
                console.error('API hatası:', error);
            }
        };
        const fetchAracData = async () => {
            try {
                const result = await adminService.getAllArac();
                setGetAracData(result.data);
            } catch (error) {
                console.error('API hatası:', error);
            }
        };
        fetchData();
        fetchAracData();
        fetchYolcuData();

    }, []);

    const formik = useFormik({
        initialValues: {
            id: paramsID,
            yolcu_id: GetData.yolcu_id,
            arac_id: GetData.arac_id,
            sefer_tarihi: GetData.sefer_tarihi,
            sefer_saati: GetData.sefer_saati,
            yolcu_isim: GetData.isim,
            arac_model: GetData.model,
        },
        validationSchema: Yup.object({
        }),
        onSubmit: async (values) => {
            const result = await adminService.putTransferAdmin(values);
            console.log(result);
            if (result.message === "Basarili") {
                setModal(true);
                const timeout = setTimeout(() => {
                    navigate("/admin/transfer/");
                }, 1000);
            } else if (result.response === 500) {
            } else if (result.status === 400) {
            }
        },
    });
    return (
        <section className="bg-gray-50 bg-white">
            <div className="flex flex-col items-center justify-center px-3 py-3 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight  md:text-2xl ">
                            Transfer Düzenle
                        </h1>
                        <form
                            className="space-y-4 md:space-y-6"
                            onSubmit={formik.handleSubmit}
                        >
                            <div>
                                <div>
                                    <label htmlFor="sefer_saati" className="py-2 max-md:text-sm">
                                        Sefer Saati 
                                    </label>
                                    <input
                                         className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:placeholder-gray-400 dark:text-gray-800 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        id="sefer_saati"
                                        name="sefer_saati"
                                        type="time"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.sefer_saati}
                                        placeholder={GetData.sefer_saati}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="soyisim" className="py-2 max-md:text-sm">
                                        Sefer Tarihi 
                                    </label>
                                    <input
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:placeholder-gray-400 dark:text-gray-800 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        id="sefer_tarihi"
                                        name="sefer_tarihi"
                                        type="date"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.sefer_tarihi}
                                        placeholder={GetData.sefer_tarihi}
                                    />
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
                                        placeholder={GetData.baslangic_noktasi}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="bitis_noktasi" className="py-2 max-md:text-sm">
                                        Bitiş Noktası
                                    </label>
                                    <input
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:placeholder-gray-400 dark:text-gray-800 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        id="bitis_noktasi"
                                        name="bitis_noktasi"
                                        type="text"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.bitis_noktasi}
                                        placeholder={GetData.bitis_noktasi}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="yolcu_id" className="py-2 max-md:text-sm">
                                        Yolcu
                                    </label>
                                    <select
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:placeholder-gray-400 dark:text-gray-800 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        id="yolcu_id"
                                        name="yolcu_id"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.yolcu_id}
                                        placeholder={GetData.yolcu_isim}
                                    >
                                        <option value="">{GetData.yolcu_isim}</option>
                                        {GetYolcuData.map((item) => (
                                            <option key={item.id} value={item.id}>
                                                {item.isim}       {item.soyisim} 
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="arac_id" className="py-2 max-md:text-sm">
                                        Arac
                                    </label>
                                    <select
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:placeholder-gray-400 dark:text-gray-800 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        id="arac_id"
                                        name="arac_id"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.arac_id}
                                        placeholder={GetData.arac_model}
                                    >
                                        <option value="">{GetData.arac_model}</option>
                                        {GetAracData.map((item) => (
                                            <option key={item.id} value={item.id}>
                                                {item.model}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-orange-500 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                            >
                                Düzenlemeyi  Kaydet
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

export default TransferEdit;
