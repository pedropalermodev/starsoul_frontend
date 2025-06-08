import './styles.scss';
import React, { useState, useEffect } from 'react';
import Box from '../../../Box';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { format } from 'date-fns';

function GenericList({ columns, dataFetcher, onEdit, onDelete, pages, setCurrentView, tableName }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [itemToDeleteId, setItemToDeleteId] = useState(null);
    const [itemToDeleteHighlightId, setItemToDeleteHighlightId] = useState(null);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;


    const loadData = async () => {
        setLoading(true);
        setError(null);
        try {
            const fetchedData = await dataFetcher();
            setData(fetchedData);
            // console.log("Dados setados no estado 'data' do GenericList:", fetchedData);
            // console.log("Tamanho de data original após fetch:", fetchedData.length);
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

            let newData = [...data];

            if (searchTerm) {
                const lowerTerm = searchTerm.toLowerCase();
                newData = newData.filter(item =>
                    (item?.id?.toString() || '').toLowerCase().includes(lowerTerm) ||
                    columns.some(column => {
                        const value = item[column.key];
                        return (value?.toString() || '').toLowerCase().includes(lowerTerm);
                    })
                );
            }

            // Ordena do maior para o menor ID
            newData.sort((a, b) => a.id - b.id);

            setFilteredData(newData);
            // console.log('Tamanho de filteredData após filtro:', newData.length); // Adicione esta linha
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


    // Gerar PDF
    const generatePDF = () => {
        const doc = new jsPDF();


        // ✅ Título e data de geração
        doc.setFontSize(16);
        doc.text(`Relatório: ${tableName || 'Dados'}`, 105, 30, { align: 'center' });

        doc.setFontSize(10);
        const now = format(new Date(), 'dd/MM/yyyy HH:mm');
        doc.text(`Gerado em: ${now}`, 105, 36, { align: 'center' });

        // ✅ Cabeçalhos
        const tableColumn = columns.map(col => col.label);

        // ✅ Corpo com formatação de datas
        const tableRows = filteredData.map(row =>
            columns.map(col => {
                const value = row[col.key];

                if (col.key.toLowerCase().includes('data') && value) {
                    try {
                        return format(new Date(value), 'dd/MM/yyyy HH:mm');
                    } catch (e) {
                        return value;
                    }
                }

                return typeof value === 'string' || typeof value === 'number'
                    ? value
                    : '';
            })
        );

        const newTableColumn = tableColumn.slice(0, -1);
        const newTableRows = tableRows.map(row => row.slice(0, -1));

        // ✅ Renderiza a tabela
        autoTable(doc, {
            startY: 42,
            head: [newTableColumn],
            body: newTableRows,
            styles: {
                fontSize: 10,
                cellPadding: 2
            },
            headStyles: {
                fillColor: [30, 56, 97],
                textColor: 255,
            }
        });

        doc.setFontSize(9);
        doc.text('© 2025 StarSoul - Meditações e Guias para conhecimento.', 105, 290, { align: 'center' });


        doc.save(`${tableName?.toLowerCase().replace(/\s+/g, '_') || 'relatorio'}.pdf`);
    };

    // Paginação
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = filteredData.slice(startIndex, endIndex);

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);


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
                                {/* {console.log('filteredData:', filteredData)} */}
                                {Array.isArray(currentItems) && currentItems.length > 0 ? (
                                    currentItems.map(item => (
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

                        <div className="box__items">
                            <div></div>

                            {totalPages > 1 && (
                                <div className="pagination">
                                    <button
                                        className="pagination-button"
                                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                        disabled={currentPage === 1}
                                    >
                                        ⟵
                                    </button>

                                    {totalPages <= 5 ? (
                                        // Exibe todos os botões se tiver até 5 páginas
                                        [...Array(totalPages)].map((_, index) => (
                                            <button
                                                key={index + 1}
                                                className={`pagination-button ${currentPage === index + 1 ? 'active' : ''}`}
                                                onClick={() => setCurrentPage(index + 1)}
                                            >
                                                {index + 1}
                                            </button>
                                        ))
                                    ) : (
                                        <>
                                            <button
                                                className={`pagination-button ${currentPage === 1 ? 'active' : ''}`}
                                                onClick={() => setCurrentPage(1)}
                                            >
                                                1
                                            </button>
                                            {currentPage > 3 && <span className="pagination-ellipsis">...</span>}

                                            {currentPage > 2 && currentPage < totalPages - 1 && (
                                                <button
                                                    className="pagination-button active"
                                                    onClick={() => setCurrentPage(currentPage)}
                                                >
                                                    {currentPage}
                                                </button>
                                            )}

                                            {currentPage < totalPages - 2 && <span className="pagination-ellipsis">...</span>}
                                            <button
                                                className={`pagination-button ${currentPage === totalPages ? 'active' : ''}`}
                                                onClick={() => setCurrentPage(totalPages)}
                                            >
                                                {totalPages}
                                            </button>

                                            {/* Dropdown para seleção direta */}
                                            <select
                                                className="pagination-select"
                                                value={currentPage}
                                                onChange={(e) => setCurrentPage(Number(e.target.value))}
                                            >
                                                {[...Array(totalPages)].map((_, index) => (
                                                    <option key={index + 1} value={index + 1}>
                                                        Página {index + 1}
                                                    </option>
                                                ))}
                                            </select>
                                        </>
                                    )}


                                    <button
                                        className="pagination-button"
                                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                        disabled={currentPage === totalPages}
                                    >
                                        ⟶
                                    </button>
                                </div>
                            )}

                            <button className="export-button" onClick={generatePDF}>
                                Exportar PDF
                            </button>
                        </div>


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