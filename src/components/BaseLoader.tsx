import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export function BaseLoader() {
    return (
        <div className="h-screen w-screen bg-black flex items-center justify-center fixed top-0 left-0 z-50 text-white">
            <Box sx={{ display: 'flex' }}>
                <CircularProgress />
            </Box>
        </div>
    );
}