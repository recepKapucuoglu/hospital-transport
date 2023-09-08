import React, { useEffect, useLayoutEffect, useState } from "react";
import adminService from "../../services/adminService";
import ReactPaginate from "react-paginate";
import Loading from "../../components/loading/Loading";
import { Navigate, useNavigate } from "react-router-dom";

function TransferList() {
    const [data, setData] = useState();
    const [total, setTotal] = useState(0);
    const [allData, setAllData] = useState(0);
    const [loading, setLoading] = useState(false);
    const [selected, setSelected] = useState(1);
    const [isChecked, setIsChecked] = useState(false);
   const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
};

const filterData = (items) => {
    if (isChecked) {
        return items.filter((item) => {
            const today = new Date(); // Şu anki tarih
            const transferDate = new Date(item.sefer_tarihi); // Transferin tarihi
            return transferDate.toDateString() === today.toDateString();
        });
    } else {
        return items;
    }
};

    const navigate = useNavigate();
    const itemsPerPage = 100;
    const pageCount = Math.ceil(total / itemsPerPage);
    const handlePageClick = (event) => {
        getAllSeri(event.selected + 1);
        setSelected(event.selected + 1);
    };
    const getAllSeri = async (selected) => {
        setLoading(true);
        window.scrollTo({ top: 0, left: 0 });
        const result = await adminService.getAllTransfer(selected);
        if (result) {
            setTotal(result.total);
            setData(result.data);
            setAllData(result.total);
            setLoading(false);
        }
    };
    useLayoutEffect(() => {
        getAllSeri();
    }, []);
    const catchTransferID = (id) => {
        navigate('/admin/transfer/duzenle/' + id);
    };
    return (
        <div>
            {loading ? (
                <Loading />
            ) : (
                <>
                    <p className="text-2xl font-semibold opacity-60 my-4">
                        Toplam Transfer Sayısı: {allData}
                    </p>
                    <div>
            <label className="text-m font-semibold opacity-60 my-4 -3">  Bugünün Transferleri :
                <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                    className="mr-2 ml-2"
                />
            </label>
            <div className="overflow-x-auto shadow-md sm:rounded-lg mb-4"> 
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <tbody>
                        {filterData(data)?.map((item, i) => (
                            <tr
                                key={i}
                                className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                            >
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
                    <a href="/admin/transfer/yolcu">
                        <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline-block -mt-1 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                            </svg>
                            Transfer Oluştur
                        </button>
                    </a>
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Kayıt No
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Yolcu ID
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Araç ID
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Yolcu adı
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Yolcu soyadi
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        telefon
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Araç model
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Sürücü isim
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Sürücü Soyisim
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        sefer tarihi
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        sefer saati
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        başlangıç noktası
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        bitis noktasi
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        İŞLEM YAP
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {filterData(data)?.map((item, i) => (
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
                                            {item.yolcu_id}
                                        </td>
                                        <td className="px-6 py-4">
                                            {item.arac_id}
                                        </td>
                                        <td className="px-6 py-4">
                                            {item.yolcu ? item.yolcu.isim : null }
                                        </td>
                                        <td className="px-6 py-4">
                                            {item.yolcu ? item.yolcu.soyisim : null }
                                        </td>
                                        <td className="px-6 py-4">
                                            {item.yolcu ? item.yolcu.telefon : null }
                                        </td>
                                        <td className="px-6 py-4">
                                        {item.arac ? item.arac.model : null }
                                        </td>
                                        <td className="px-6 py-4">
                                        {item.arac ? item.arac.surucu_isim : null }
                                        </td>
                                        <td className="px-6 py-4">
                                        {item.arac ? item.arac.surucu_soyisim : null }
                                        </td>
                                        <td className="px-6 py-4">
                                            {item.sefer_tarihi}
                                        </td>
                                        <td className="px-6 py-4">
                                            {item.sefer_saati}
                                        </td>
                                        <td className="px-6 py-4">
                                            {item.baslangic_noktasi}
                                        </td>
                                        <td className="px-6 py-4">
                                            {item.bitis_noktasi}
                                        </td>
                                        <td className="px-6 py-4">
                                            <button onClick={() => catchTransferID(item.id)} class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-1 rounded mb-4 mr-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 inline-block -mt-1 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                                                </svg>
                                                Düzenle
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

export default TransferList;
