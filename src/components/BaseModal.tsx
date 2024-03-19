export function BaseModal({ modalData, closeModal }) {
    return (
        <div className="h-screen w-screen bg-black bg-opacity-95 flex items-center justify-center fixed top-0 left-0 z-50 text-red-300">
            <button onClick={closeModal} className="fixed top-4 right-4">Close</button>
            {modalData.name}
        </div>
    );
}