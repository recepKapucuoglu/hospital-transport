import React, { useEffect, useLayoutEffect, useState } from "react";
import adminService from "../../services/adminService";
import ReactPaginate from "react-paginate";
import Loading from "../../components/loading/Loading";
import { Navigate, useNavigate } from "react-router-dom";


function YolcuList() {
    const [data, setData] = useState();
    const [total, setTotal] = useState(0);
    const [allData, setAllData] = useState(0);
    const [loading, setLoading] = useState(false);
    const [selected, setSelected] = useState(1);
    const itemsPerPage = 100;
    const pageCount = Math.ceil(total / itemsPerPage);
    const navigate = useNavigate();
    const [dataYolcuTipi, setdataYolcuTipi] = useState(); // Seçilen yolcu tipini burada saklayacağız
    const [yolcuTipi, setYolcuTipi] = useState(''); // Seçilen yolcu tipini burada saklayacağız
    const filteredData = data?.filter((item) => {
        if (!yolcuTipi) {
            return true; // Hiçbir filtre yoksa tüm verileri göster
        }

        return item.yolcu_tipi.tip === yolcuTipi; // Yolcu tipine göre filtrele
    });

    const handlePageClick = (event) => {
        getAllSeri(event.selected + 1);
        setSelected(event.selected + 1);
    };

    const getAllSeri = async (selected) => {
        setLoading(true);
        window.scrollTo({ top: 0, left: 0 });
        const result = await adminService.getAllYolcu(selected);
        if (result) {
            setTotal(result.total);
            setData(result.data);
            setAllData(result.total);
            setLoading(false);
        }
    };
    const getAllYolcuTipi = async () => {
        const result = await adminService.getAllYolcuTipi();
        if (result) {
            setdataYolcuTipi(result);
        }
    };
    useLayoutEffect(() => {
        getAllSeri();
        getAllYolcuTipi();
    }, []);
    console.log(dataYolcuTipi);
    const catchYolcuID = (id) => {
        navigate('/admin/yolcu/duzenle/' + id);
    };
    const deleteYolcu = async (id) => {
        const response = await adminService.deleteYolcu(id);
        if (response.message === "Yolcu silindi") {
            getAllSeri(selected);
        }
    };
    return (
        <div>
            {loading ? (
                <Loading />
            ) : (
                <>
                    <p className="text-2xl font-semibold  opacity-60 my-4">
                        Toplam Yolcu Sayısı: {allData}
                    </p>
                    <div className="flex items-center space-x-4"> {/* flex konteyneri */}
                        <p className="text-m font-semibold opacity-60 my-4">Filtrelemek için Yolcu Tipi Seçiniz:</p>
                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                            <select
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:placeholder-gray-400 dark:text-gray-800 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                onChange={(e) => setYolcuTipi(e.target.value)}
                                value={yolcuTipi}
                            >
                                <option value="">Tümü</option>
                                {dataYolcuTipi?.map((item, i) => (
                                    <option key={i} value={item.tip}>{item.tip}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Kayıt No
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        İsim
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Soyisim
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Telefon
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Yolcu Tipi
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        İşlem Yap
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData?.map((item, i) => (
                                    <tr
                                        key={i}
                                        className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                                    >
                                        <th
                                            scope="row"
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                        >
                                            {item.id}
                                        </th>
                                        <td className="px-6 py-4">
                                            {item.isim}
                                        </td>
                                        <td className="px-6 py-4">
                                            {item.soyisim}
                                        </td>
                                        <td className="px-6 py-4">
                                            {item.telefon}
                                        </td>
                                        <td className="px-6 py-4">
                                            {item.yolcu_tipi.tip}
                                        </td>
                                        <td className="px-6 py-4">
                                            <button onClick={() => catchYolcuID(item.id)} class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded mb-4 mr-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline-block -mt-1 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                                                </svg>
                                                Düzenle
                                            </button>
                                            /
                                            <button onClick={() => deleteYolcu(item.id)} class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded mb-4 ml-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline-block -mt-1 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                                                </svg>
                                                Sil
                                            </button>

                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}

            {total && (
                <>
                    <ReactPaginate
                        breakLabel="..."
                        className="flex justify-center items-center mt-5"
                        previousClassName=" px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        nextClassName="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        breakClassName="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        activeLinkClassName="text-black dark:text-white underline  underline-offset-1"
                        nextLabel=">"
                        pageClassName="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={5}
                        pageCount={pageCount}
                        previousLabel="<"
                        renderOnZeroPageCount={null}
                    />
                </>
            )}
        </div>
    );
}

export default YolcuList;
