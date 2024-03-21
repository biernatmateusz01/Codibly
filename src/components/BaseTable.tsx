import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { BaseModal } from './BaseModal'
import { Product } from '../types';
import { useDataContext } from '../context/dataContext';
import { useState } from 'react';

export function BaseTable() {
    const { data } = useDataContext();
    const [showedModal, setShowedModal] = useState<boolean>(false)
    const [modalData, setModalData] = useState<Product | null>(null)


    const openModal = (row: Product) => {
        setShowedModal(true)
        setModalData(row)
    }

    const closeModal = () => {
        setShowedModal(false)
    }

    return (
        <>
            {(showedModal && modalData) && <BaseModal modalData={modalData} closeModal={closeModal} />}
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="siemple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell align='right'>Year</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row: Product) => {

                            return (
                                <TableRow
                                    onClick={() => {
                                        openModal(row);
                                    }}
                                    key={row.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    style={{
                                        backgroundColor: row.color,
                                        cursor: 'pointer'
                                    }}
                                >
                                    <TableCell>{row.id}</TableCell>
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell align='right'>{row.year}</TableCell>
                                </TableRow>
                            );

                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}
