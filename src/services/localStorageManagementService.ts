/**
 * Local Storage Management Service
 */
export const localStorageManagementService = {
    getLocalStorageUserDetails: (): any => {
        const userDetails = localStorage.getItem("userDetails");
        return userDetails ? JSON.parse(userDetails) : {};
    },

    clearLocalStorageUserDetails: (): void => {
        localStorage.removeItem("userDetails");
    }
};