import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Product } from '../types';
import { useContext } from 'react'
import { UserContext } from '../App'

export function BaseTable() {
    const { data, openModal } = useContext(UserContext);

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Id</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell align='right'>Year</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data?.map((row: Product) => {
                        if (row.id !== undefined && row.name !== undefined && row.year !== undefined) {
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
                        } else {
                            return null;
                        }
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
