export function isAdmin() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user.isAdmin) {
        return false;
    }

    return true;
}