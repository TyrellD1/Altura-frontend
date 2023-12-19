import { useReducer } from "react";

export interface IPasswordStrengthChecker {    
    isEightChars: boolean;
    containsNumber: boolean;
    containsLowercaseLetter: boolean;
    containsUppercaseLetter: boolean;
    containsSpecialChar: boolean;
}

const initialState: IPasswordStrengthChecker = {
    isEightChars: false,
    containsNumber: false,
    containsLowercaseLetter: false,
    containsUppercaseLetter: false,
    containsSpecialChar: false,
};

const reducer = (state: IPasswordStrengthChecker, updates: Partial<IPasswordStrengthChecker>) => ({
    ...state,
    ...updates,
});

export default () => useReducer(reducer, initialState);