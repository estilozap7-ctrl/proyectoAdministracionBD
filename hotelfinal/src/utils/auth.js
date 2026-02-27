/**
 * Utility functions for user authentication and validation.
 * Allows keeping the components clean and centralized logic for future backend connection.
 */

// Basic mock credentials for demonstration
const MOCK_ADMIN_USER = 'admin';
const MOCK_ADMIN_PASS = 'admin123';

/**
 * Validates admin credentials against the mock database.
 * 
 * @param {string} username - The provided username
 * @param {string} password - The provided password
 * @returns {object} Result object containing success status and optional error message
 */
export const validateAdminLogin = (username, password) => {
    if (!username || !password) {
        return {
            success: false,
            error: 'Por favor ingrese usuario y contraseña',
        };
    }

    // TODO: Replace with actual backend API call
    if (username === MOCK_ADMIN_USER && password === MOCK_ADMIN_PASS) {
        return {
            success: true,
            user: {
                id: 1,
                username: MOCK_ADMIN_USER,
                role: 'admin',
                name: 'Administrador Principal'
            }
        };
    }

    return {
        success: false,
        error: 'Usuario o contraseña incorrectos',
    };
};

/**
 * Simple function to check if a user session is active (mock)
 * Useful for App.jsx to verify returning users in a real scenario
 */
export const isUserLoggedIn = () => {
    // En un escenario real verificaría localStorage o un token
    return false;
};
