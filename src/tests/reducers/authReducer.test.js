import { authReducer } from "../../reducers/authReducer";
import { types } from "../../types/types";

describe('Pruebas en authReducer', () => {


    test('Debe de retornar el state con uid y name definidos [login]', () => {
        
        const initialState = {};

        const action = {
            type: types.login,
            payload: {
                uid: 'djn0i34enlsd234cdx',
                displayName: 'Osiris Meza'
            }
        }

        const state = authReducer( initialState, action );

        expect( state ).toEqual( {
            uid: 'djn0i34enlsd234cdx',
            name: 'Osiris Meza'
        } );

    });
    
    test('Debe de retornar un state vacio [logout]', () => {
        
        const initialState = {
            uid: 'djn0i34enlsd234cdx',
            displayName: 'Osiris Meza'
        };

        const action = {
            type: types.logout,
        }

        const state = authReducer( initialState, action )

        expect( state ).toEqual( {} );
        
    });

    test('Debe de retornar el state [default]', () => {
                
        const initialState = {};

        const state = authReducer( initialState, { type: 'test' } );

        expect( state ).toEqual( initialState );

    });
    

});
