export const updateUrl = (page: number, id?: string): void => {
    const baseUrl = `${window.location.origin}${window.location.pathname}?page=${page}`;
    const newUrl = id ? `${baseUrl}&id=${id}` : baseUrl;
    window.history.replaceState(null, '', newUrl);
};