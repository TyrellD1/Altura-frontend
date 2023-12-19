export const isEigthChars = (password: string) => password.length >= 8;

export const hasNumber = (password: string) => /\d/.test(password);

export const hasLowerCase = (password: string) => /[a-z]/.test(password);

export const hasUpperCase = (password: string) => /[A-Z]/.test(password);

export const hasSpecialChar = (password: string) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password);