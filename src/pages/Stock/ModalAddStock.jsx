import React, { useEffect, useState } from 'react'
import useFetch from '../../hooks/useFetch';
import Button from '../../components/Buttons/Button';
import API_DOMAIN from '../../config';
import Loader from '../../components/Loaders/Loader';

function ModalAddStock({ close, stockObject }) {
    const { data, error: errorData, isLoading, fetchData } = useFetch();
    const [isEdit, setIsEdit] = useState(false);
    const { data: articles, error: aError, isLoading: aIsLoading, fetchData: articleData } = useFetch();
    const { data: categories, error: cError, isLoading: cIsLoading, fetchData: categorieData } = useFetch();
    const [error, setError] = useState();
    const [hostelery, setHostelery] = useState(false);
    const [formData, setFormData] = useState({
        categorie: 'Todas',
        article: '',
        serie: '',
        comment: ''
    });

    const handleFetch = () => {

    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
        if (name === 'categorie') {
            setFormData(prevState => ({
                ...prevState,
                'article': ''
            }));
        }
    };

    const handleSummit = (e) => {
        e.preventDefault();
        if (formData.model === '' || formData.model === 'Selecciona el modelo' ||
            formData.categorie === '' || formData.categorie === 'Selecciona una categoria') {
            setError('Selecciona una categoria y modelo');
        } else if (isEdit) {
            fetchData(`${API_DOMAIN}/api/v1/stock/${stockObject.id}`, "PUT", formData);
        } else {
            fetchData(`${API_DOMAIN}/api/v1/stock`, "POST", formData);
        }
    };

    useEffect(() => {
        if (data) {
            close(true);
        }
    }, [data]);

    useEffect(() => {
        if (errorData) {
            setError(errorData);
        } else if (aError) {
            setError(aError)
        } else if (cError) {
            setError(cError)
        }
    }, [errorData, aError, cError]);

    useEffect(() => {
        if (categories) {
            if (formData.categorie !== '' || formData.categorie !== 'Selecciona una categoria') {
                articleData(`${API_DOMAIN}/api/v1/articles/category/` + formData.categorie);
            }
        }
    }, [categories, formData]);

    useEffect(() => {
        if (stockObject) {
            setIsEdit(true);
            setFormData({
                categorie: stockObject.article.categorie.id,
                article: stockObject.article.id,
                serie: stockObject.serie,
                comment: stockObject.comment
            });
        }

        categorieData(`${API_DOMAIN}/api/v1/categories`);
    }, []);

    return (
        <>
            <div id="crud-modal" tabIndex="-1" aria-hidden="true" className=" bg-black bg-opacity-25 flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%)] max-h-full">
                <div className="relative p-4 w-full max-w-md max-h-full">
                    {/*Modal content*/}
                    <div className="relative bg-white rounded-lg shadow ">
                        {/*Modal header*/}
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
                            <h3 className="text-lg font-semibold text-gray-900 ">
                                {isEdit ? "Editar articulo" : "Agregar un nuevo articulo"}
                            </h3>
                            <button type="button" onClick={close} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center " data-modal-toggle="crud-modal">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        {/*Modal body*/}
                        <form className="p-4 md:p-5" onSubmit={handleSummit}>
                            <div className="grid gap-4 mb-4 grid-cols-2">
                                <div className="col-span-2">
                                </div>
                                <div className="col-span-2 sm:col-span-1">
                                    <label htmlFor="categorie" className="block mb-2 text-sm font-medium text-gray-900 ">Categoria</label>
                                    <select
                                        id="categorie"
                                        onChange={handleChange}
                                        value={formData.categorie}
                                        name='categorie'
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                                        required
                                    >
                                        <option defaultValue="">Selecciona una categoria</option>
                                        {categories && categories.map(categorie => (
                                            <option value={categorie.id} key={categorie.id}>{categorie.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-span-2 sm:col-span-1">
                                    <label htmlFor="article" className="block mb-2 text-sm font-medium text-gray-900 ">Modelo</label>
                                    <select
                                        id="article"
                                        value={formData.article}
                                        onChange={handleChange}
                                        name='article'
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                                        required
                                    >
                                        <option defaultValue="">Selecciona el modelo</option>
                                        {articles && articles.map(article => (
                                            <option value={article.id} key={article.id}>{article.supplier.name + " " + article.modelname}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-span-2">
                                    <label htmlFor="serie" className="block mb-2 text-sm font-medium text-gray-900 ">Numero de serie</label>
                                    <input
                                        type="text"
                                        name="serie"
                                        id="serie"
                                        value={formData.serie}
                                        onChange={handleChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                                        placeholder="Escribe la serie"
                                        required></input>
                                </div>
                                <div className="col-span-2">
                                    <label htmlFor="comment" className="block mb-2 text-sm font-medium text-gray-900 ">Comentarios</label>
                                    <textarea
                                        id="comment"
                                        name="comment"
                                        rows="4"
                                        defaultValue={formData.comment}
                                        onChangeCapture={handleChange}
                                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                                        placeholder="Escribe un comentario"></textarea>
                                </div>
                            </div>
                            {error && <p className='text-red-600'>{error}</p>}
                            {isLoading ? <Loader /> : <Button type="submit" >
                                <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                                {isEdit ? "Editar" : "Agregar articulo"}
                            </Button>}
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ModalAddStock