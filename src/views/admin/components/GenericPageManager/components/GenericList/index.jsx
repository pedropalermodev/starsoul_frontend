import React, { useState, useEffect } from 'react';
import Box from '../../../Box';
import './styles.scss';

function GenericList({ columns, dataFetcher, onEdit, onDelete, pages, setCurrentView }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [itemToDeleteId, setItemToDeleteId] = useState(null);
    const [itemToDeleteHighlightId, setItemToDeleteHighlightId] = useState(null);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

    const loadData = async () => {
        setLoading(true);
        setError(null);
        try {
            const fetchedData = await dataFetcher();
            setData(fetchedData);
            console.log("Dados setados no estado 'data' do GenericList:", fetchedData);
        } catch (err) {
            console.error('Erro ao buscar dados:', err);
            setError(err.message || 'Erro ao buscar dados.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, [dataFetcher]);


    useEffect(() => {
        const filterData = () => {

            if (!Array.isArray(data)) {
                setFilteredData([]);
                return;
            }

            if (!searchTerm) {
                setFilteredData(data);
                return;
            }
            const lowerTerm = searchTerm.toLowerCase();

            const newData = data.filter(item => {
                return (
                    (item?.id?.toString() || '').toLowerCase().includes(lowerTerm) || // Pesquisa por ID
                    columns.some(column => {
                        const value = item[column.key];
                        return (value?.toString() || '').toLowerCase().includes(lowerTerm);
                    })
                );
            });
            setFilteredData(newData);
        };

        filterData();
    }, [data, searchTerm]);


    // Confirmação de exclusão
    const showDeleteConfirmationModal = (id) => {
        setItemToDeleteId(id);
        setItemToDeleteHighlightId(id);
        setIsDeleteModalVisible(true);
    };

    const confirmDeleteItem = async () => {
        if (itemToDeleteId && onDelete) {
            await onDelete(itemToDeleteId);
            setIsDeleteModalVisible(false);
            setItemToDeleteId(null);
            setItemToDeleteHighlightId(null);
            loadData();
        }
    };

    const cancelDeleteItem = () => {
        setIsDeleteModalVisible(false);
        setItemToDeleteId(null);
        setItemToDeleteHighlightId(null);
    };

    return (
        <main>
            <Box className='generic__content'>
                {loading && <div>Carregando dados...</div>}
                {error && <div>Erro ao carregar dados: {error}</div>}

                {!loading && !error && (
                    <>
                        <div className='generic__bar'>
                            <input
                                className='generic__bar--search'
                                type="text"
                                placeholder='Pesquisar...'
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            {pages && pages.map(page => (
                                <button
                                    className={page.className}
                                    key={page.label || page.view}
                                    onClick={() => setCurrentView(page.view)}
                                >
                                    {page.label}
                                    {page.iconClass && <i className={page.iconClass}></i>}
                                </button>
                            ))}
                        </div>

                        <table className='generic__table'>
                            <thead className='generic__thead'>
                                <tr>
                                    {columns.map(column => (
                                        <th className='generic__thead--th' key={column.key}>{column.label}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className='gerenic__tbody'>
                                {console.log('filteredData:', filteredData)}
                                {Array.isArray(filteredData) && filteredData.length > 0 ? ( // Verifique se filteredData tem itens
                                    filteredData.map(item => (
                                        <tr
                                            key={item.id}
                                            className={`generic__tbody-tr ${item.id === itemToDeleteHighlightId ? 'highlight-delete' : ''}`}
                                        >
                                            {columns.map(column => (
                                                <td
                                                    key={column.key}
                                                    className='generic__tbody-tr--td'
                                                    style={column.cellStyle}
                                                >
                                                    {column.render ? column.render(item, onEdit, showDeleteConfirmationModal) : item[column.key]}
                                                </td>
                                            ))}
                                        </tr>
                                    ))
                                ) : ( 
                                    <tr key="no-data-row">
                                        <td colSpan={columns.length} style={{ textAlign: 'center', padding: '16px' }}>
                                            Nenhum dado encontrado.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </>
                )}
            </Box>

            {isDeleteModalVisible && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Confirmar Exclusão</h3>
                        <p>Tem certeza absoluta que deseja deletar este item com ID: {itemToDeleteId}?</p>
                        <div className="modal-actions">
                            <button onClick={confirmDeleteItem}>Sim, Deletar</button>
                            <button onClick={cancelDeleteItem}>Cancelar</button>
                        </div>
                    </div>
                </div>
            )}

        </main>
    );
}

export default GenericList;