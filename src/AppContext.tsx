import React, { createContext, Dispatch, useReducer } from 'react'
import { Action } from './constants'
import { setItem, getItem } from "./chrome/utils/storage";
import { Storage } from "./constants"
import { HistoryActions, historyReducer, draftReducer, settingsReducer, DraftActions, SettingsActions } from './reducers';

export type SettingsType = {
    api_key: string,
    enc_mode: string,
    key_length: number,
    theme: boolean,
}

export type DraftType = {
    action: Action.DECRYPT | Action.DECRYPT_PASTEBIN | Action.ENCRYPT | Action.ENCRYPT_PASTEBIN,
    plaintext: string,
    buttonEnabled: boolean,
    ciphertext: string,
    pastebinlink: string,
    key: string,
    success: any
}

export type HistoryType = {
    id: number,
    pastebinlink: string,
    enc_mode: string,
    key_length: number,
    key: string,
    ciphertext: string,
    date: Date,
}

function getSettingsValuesFromStorage() {
    getItem(null, (data) => {
        return {
        api_key: data[Storage.API_KEY],
        enc_mode: data[Storage.ENC_MODE],
        key_length: data[Storage.KEY_LENGTH],
        theme: data[Storage.THEME],
        } as SettingsType
    })
    return {
        api_key: "",
        enc_mode: "",
        key_length: 16,
        theme: false,
    } as SettingsType
}

function getHistoryValuesFromStorage() {
    getItem(Storage.HISTORY, (data) => {
        return data[Storage.HISTORY] as HistoryType[]
    })
    return [] as HistoryType[]
}

type InitialStateType = {
    history: HistoryType[];
    draft: DraftType;
    settings: SettingsType;
}

const initialState = {
    history: [],
    draft: {
        action: Action.ENCRYPT,
        plaintext: "",
        buttonEnabled: false,
        ciphertext: "",
        pastebinlink: "",
        key: "",
        success: "",
    } as DraftType,
    settings: {
        api_key: "",
        enc_mode: "",
        key_length: 16,
        theme: false,
    },
}

const AppContext = createContext<{
    state: InitialStateType;
    dispatch: Dispatch<HistoryActions | DraftActions | SettingsActions>;
}>({
    state: initialState,
    dispatch: () => null
});

const mainReducer = ({ history, draft, settings }: InitialStateType, action: HistoryActions | DraftActions | SettingsActions ) => ({
    history: historyReducer(history, action),
    draft: draftReducer(draft, action),
    settings: settingsReducer(settings, action),
    // shoppingCart: shoppingCartReducer(shoppingCart, action),
});


const AppProvider: React.FC = ({ children }) => {
    const [state, dispatch] = useReducer(mainReducer, initialState);

    return (
        <AppContext.Provider value={{state, dispatch}}>
            {children}
        </AppContext.Provider>
    )
}

export { AppProvider, AppContext };