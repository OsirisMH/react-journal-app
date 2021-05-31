/**
 * @jest-environment node
*/
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';

import { login, logout, startLoginEmailPassword, startLogout } from "../../actions/auth";
import { types } from "../../types/types";
import { db } from '../../firebase/firebase-config';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};

let store = mockStore( initState );

describe('Pruebas en auth actions', () => {

    afterAll(() => {
        db.disableNetwork();
    })

    beforeEach(() => {
        store = mockStore(initState);
    });

    test('login y logout deben de crear la acción respectiva', () => {

        const auth = {
            uid: 'sdsa2fSdfdfE3',
            displayName: 'TESTING'
        }

        const loginAction = login(auth.uid, auth.displayName);
        const logoutAction = logout();

        expect( loginAction ).toEqual({
            type: types.login,
            payload: {
                uid: auth.uid,
                displayName: auth.displayName
            }
        });

        expect( logoutAction ).toEqual({
            type: types.logout
        });

    });

    test('Debe de realizar el logout [startLogout]', async () => {
       
        await store.dispatch( startLogout() );

        const actions = store.getActions();

        expect( actions[0] ).toEqual({
            type: types.logout
        });
        
        expect( actions[1] ).toEqual({
            type: types.notesLogoutCleaning
        });

    });
    
    test('Debe de iniciar el startLoginEmailPassword', async () => {
       
        await store.dispatch( startLoginEmailPassword('test@testing.com', '123456') );
        const actions = store.getActions();
        
        expect( actions[1] ).toEqual({
            type: types.login,
            payload: {
                uid: '3vKliWChs7ObWQBXuqBPgW7dO7j1',
                displayName: null
            }
        })
        
    });
    
});
