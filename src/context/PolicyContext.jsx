import { createContext, useContext, useState, useEffect } from 'react';

const PolicyContext = createContext(null);

export const PolicyProvider = ({ children }) => {
    const [policies, setPolicies] = useState([]);
    const [loading, setLoading] = useState(true);

    const getAuthHeader = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        return user?.token ? { 'Authorization': `Bearer ${user.token}` } : {};
    };

    const fetchPolicies = async () => {
        try {
            const response = await fetch('/api/policies', {
                headers: getAuthHeader()
            });
            if (response.ok) {
                const data = await response.json();
                setPolicies(data);
            }
        } catch (error) {
            console.error('Error fetching policies:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPolicies();
    }, []);

    const addPolicy = async (newPolicy) => {
        try {
            const response = await fetch('/api/policies', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...getAuthHeader()
                },
                body: JSON.stringify(newPolicy),
            });

            if (response.ok) {
                await fetchPolicies(); // Refresh list
                return { success: true };
            } else {
                return { success: false, message: 'Failed to create policy' };
            }
        } catch (error) {
            console.error('Error adding policy:', error);
            return { success: false, message: error.message };
        }
    };

    const updatePolicyStatus = async (id, status) => {
        try {
            const response = await fetch(`/api/policies/${id}/status`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    ...getAuthHeader()
                },
                body: JSON.stringify({ status }),
            });

            if (response.ok) {
                await fetchPolicies();
                return { success: true };
            }
        } catch (error) {
            console.error('Error updating status:', error);
            alert(`Error: ${error.message}`);
        }
    };

    return (
        <PolicyContext.Provider value={{ policies, addPolicy, updatePolicyStatus, fetchPolicies, loading }}>
            {children}
        </PolicyContext.Provider>
    );
};

export const usePolicies = () => {
    const context = useContext(PolicyContext);
    if (!context) {
        throw new Error('usePolicies must be used within a PolicyProvider');
    }
    return context;
};
