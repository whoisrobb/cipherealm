export const getErrorMessage = (error: unknown): string => {
    let message: string;

    if (error instanceof Error) {
        message = error.message
    } else if (error && typeof error === 'object' && 'message' in error) {
        message = String(error.message)
    } else if (typeof error === 'string') {
        message = error
    } else {
        message = 'Something went wrong'
    }

    return message;
};

/* GET INITIALS */
export const initials = (str1: string, str2: string) => {
    if (!str1 || !str2) {
      return "";
    }
    return str1[0].toUpperCase() + str2[0].toUpperCase();
}