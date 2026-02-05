export const ROLES = {
    ADMIN: 'admin',
    FACULTY: 'faculty',
    STUDENT: 'student',
};

export const PERMISSIONS = {
    [ROLES.ADMIN]: {
        canApprove: true,
        canManageUsers: true,
        canCreatePolicy: false,
        canViewAll: true,
    },
    [ROLES.FACULTY]: {
        canApprove: false,
        canManageUsers: false,
        canCreatePolicy: true,
        canViewAll: false,
    },
    [ROLES.STUDENT]: {
        canApprove: false,
        canManageUsers: false,
        canCreatePolicy: false,
        canViewAll: false,
    },
};
