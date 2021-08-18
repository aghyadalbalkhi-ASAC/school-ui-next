import {
    isAdminUser,
    isBusinessUser,
    isWarehouseManager,
    isEmployeeUser,
    isOperationSupervisorUser, isSystemUser
} from "../services/authService";


export const getDefaultRouter = () => {
    if (isAdminUser()) {
        return '/dashboard';
    }
    if (isSystemUser()) {
        return '/dashboard';
    }
    if (isBusinessUser()) {
        return '/profile';
    }
    if (isOperationSupervisorUser()) {
        return '/jobs';
    }
    if (isEmployeeUser()) {
        return '/employee-profile';
    }
    if (isWarehouseManager()) {
        return '/warehouse-profile';
    }
    return '/protected';
};
