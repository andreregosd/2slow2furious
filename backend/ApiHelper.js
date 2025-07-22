export const SuccessResponse = (id = null) => {
    const response = id ? { success: true, id : id } : { success: true };
    
    return response;
}

export const DBErrorResponse = (message) => {
    return {
        success : false,
        error : {
            errorCode : 'DB_ERROR',
            errorMessage : message
        }
    };    
};