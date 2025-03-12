import axios, { AxiosError } from 'axios';

interface ServerError {
    error: string;
    [key: string]: any;
}

export interface ErrorResponse {
    message: string;
    status?: number;
    details?: unknown;
}

export function extractErrorMessage(error: unknown): ErrorResponse {
    if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ServerError>;

        // Handle server response errors
        if (axiosError.response) {
            return {
                message: axiosError.response.data?.error || 'Server error occurred',
                status: axiosError.response.status,
                details: axiosError.response.data
            };
        }

        // Handle network errors
        if (axiosError.request) {
            return {
                message: 'Network error - Unable to reach the server',
                status: 0,
                details: axiosError.request
            };
        }

        // Handle configuration errors
        return {
            message: axiosError.message || 'Request configuration error',
            details: axiosError.config
        };
    }

    // Handle non-Axios errors
    if (error instanceof Error) {
        return {
            message: error.message,
            details: error
        };
    }

    // Handle unknown errors
    return {
        message: 'An unexpected error occurred',
        details: error
    };
} 