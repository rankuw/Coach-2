export const STATUS_MSG = {
    ERROR: {
        BAD_REQUEST: (message: string) => {
            return {
                statusCode: 400,
                success: false,
                message: message,
                data: {}
            }
        },
        FORBIDDEN: (message: string) => {
            return {
                statusCode: 403,
                success: false,
                message,
                data: {}
            }
        },
        DB_ERROR: (message: string) => {
            return {
                statusCode: 500,
                success: false,
                message: message || 'DB Error : ',
                data: {}
            }
        },
        INVALID_TOKEN: {
            statusCode: 401,
            success: false,
            message: 'Invalid token provided',
            data: {}
        },
     
       TOKEN_MISSING: {
            statusCode: 401,
            success: false,
            message: 'Token not provided',
            data: {}
       },
        UNAUTHORIZED: {
            statusCode: 401,
            success: false,
            message: 'You are not authorized to perform this action',
            data: {}
        },
        UNAUTHORIZED_ADMIN: {
            statusCode: 408,
            success: false,
            message: 'Session Expired',
            data: {}
        },
        INVALID_API_KEY: () => {
            return {
                statusCode: 401,
                success: false,
                message: 'Inavlid Api Key',
                data: {}
            }
        },
        IMP_ERROR: {
            statusCode: 500,
            success: false,
            message: 'Implementation Error',
            data: {}
        },
        NOT_EXIST: (title: string) => {
            return {
                statusCode: 404,
                success: false,
                message: `${title} does not exist!`,
                data: {}
            }
        },
        ACTION_NOT_ALLOWED: {
            statusCode: 406,
            success: false,
            message: 'Action not allowed.',
            data: {}
        },
        DEFAULT_ERROR_MESSAGE: (message: string) => {
            return {
                statusCode: 406,
                success: false,
                message: message,
                data: {}
            }
        },
        USER_EXISTS: {
            statusCode: 409,
            success: false,
            message: 'User already present.',
            data: {}
        },
        MISSING_FIELD: (message: string) => {
            return {
                statusCode: 403,
                success: false,
                message,
                data: {}
            }
        },
        CUSTOM_ERROR: (statusCode: number, message: string) => {
            return {
                statusCode,
                success: true,
                message,
                data:{}
            }

        }
    },

    SUCCESS: {
        CUSTOM_SUCCESS: (statusCode: number, message: string, data?: any) => {
            return {
                statusCode,
                success: true,
                message,
                data: data || {}
            }

        },
        DEFAULT: {
            statusCode: 200,
            success: true,
            message: 'Success',
            data: {}
        },
        CREATED: {
            statusCode: 200,
            success: true,
            message: 'Created Successfully',
            data: {}
        },
        PROFILE_UPDATED: {
            statusCode: 200,
            success: true,
            message: 'Profile updated Successfully',
            data: {}
        },
        UPDATED: {
            statusCode: 200,
            success: true,
            message: 'Updated Successfully',
            data: {}
        },
        LOGOUT: {
            statusCode: 200,
            success: true,
            message: 'Logged Out Successfully',
            data: {}
        },
        DELETED: {
            statusCode: 200,
            success: true,
            message: 'Deleted Successfully',
            data: {}
        },
        EMPTY_RECORD: {
            statusCode: 200,
            success: true,
            message: 'No record found.',
            data: {}
        },
        UPDATE_SUCCESS: (title: string) => {
            return {
                statusCode: 201,
                success: true,
                message: `${title} successfully`,
                data: {}
            }
        },
        FETCH_SUCCESS: (data?: any, msg?: string) => {
            return {
                statusCode: 200,
                success: true,
                message: msg || "data fetched",
                data: data || {} 
            }
        },
        VALID_TOKEN: {
            statusCode: 401,
            success: false,
            message: 'Valid token provided',
            data: {}
        },
        OTP_SENT: (phoneNumber: string) => {
            return {
                statusCode: 200,
                success: true,
                message: 'OTP sent to ' + phoneNumber,
                data: {}
            }
        },
        EMAIL_SENT: (email: string) => {
            return {
                statusCode: 201,
                success: true,
                message: 'Email sent to ' + email,
                data: {}
            }
        },
        USER_CREATED: (id: string, data?: any) => {
            return {
                statusCode: 201,
                success: true,
                message: id,
                data: data || {}
            }
        },
        CUSTOM_CONTENT: (statusCode?: number,data?: any, message?:string) =>  {
            return {
                statusCode: statusCode ?? 200,
                success: true,
                message: message ?? "Data request successfull",
                data: data || {}
            }
        }
        
        
    },
    DATA_RESPONSE: (statusCode: number, success: boolean, message: string, data: any) => {
        return {
            statusCode,
            success,
            message,
            data
        }
    }
}

export const SALT_ROUNDS = 10;