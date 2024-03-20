import { useContext } from 'react'
import { UserContext } from '../App'

export function BaseModal() {
    const { modalData, closeModal } = useContext(UserContext);

    const { color, id, name, pantone_value, year } = modalData
    return (
        <div className="h-screen w-screen bg-black bg-opacity-95 flex items-center justify-center fixed top-0 left-0 z-50 text-red-300">
            <button onClick={closeModal} className="fixed top-4 right-4">Close</button>

            <div className="flex flex-col gap-1 w-[320px]">
                <div className="flex justify-between p-2 border-b border-white">
                    <span>id</span>
                    <span>{id}</span>
                </div>
                <div className="flex justify-between p-2 border-b border-white">
                    <span>color</span>
                    <span>{color}</span>
                </div>
                <div className="flex justify-between p-2 border-b border-white">
                    <span>name</span>
                    <span>{name}</span>
                </div>
                <div className="flex justify-between p-2 border-b border-white">
                    <span>value</span>
                    <span>{pantone_value}</span>
                </div>
                <div className="flex justify-between p-2 border-b border-white">
                    <span>year</span>
                    <span>{year}</span>
                </div>
            </div>
        </div>
    );
}