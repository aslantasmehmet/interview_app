export const isTokenExpired = (token: string): boolean => {
    if (!token) return true;

    const payload = JSON.parse(atob(token.split('.')[1])); // JWT'nin payload kısmını al
    const currentTime = Date.now() / 1000; // Şu anki zamanı al

    return currentTime > payload.exp; // Eğer şu anki zaman, token süresinden büyükse expired
};

export const getTokenFromLocalStorage = (): string | null => {
    return localStorage.getItem('token');
};
