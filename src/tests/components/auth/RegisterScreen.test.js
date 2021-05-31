import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';

import { mount } from "enzyme";
import { Provider } from "react-redux";
import { MemoryRouter } from 'react-router';

import { RegisterScreen } from '../../../components/auth/RegisterScreen';
import { types } from '../../../types/types';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
    auth: {},
    ui: {
        loading: false,
        msgError: null
    }
};
let store = mockStore( initState );

    
const wrapper = mount(
    <Provider store={ store }>
        <MemoryRouter>
            <RegisterScreen />
        </MemoryRouter>
    </Provider>
);

describe('Pruebas en <LoginScreen />', () => {


    test('Debe mostrarse correctamente', () => {
        expect( wrapper ).toMatchSnapshot();
    });
    
    test('Debe de mostrar el error al intentar disparar el submit sin campos', () => {
        const actions = store.getActions();
        wrapper.find('form').simulate('submit', {
            preventDefault(){}
        });

        expect( actions[0] ).toEqual({
            type: types.uiSetError,
            payload: 'Name is required'
        })
    });
    
    test('Debe de mostrar la caja de alerta con error', () => {
        const initState = {
            auth: {},
            ui: {
                loading: false,
                msgError: 'Name is required'
            }
        };
        let store = mockStore( initState );            
        const wrapper = mount(
            <Provider store={ store }>
                <MemoryRouter>
                    <RegisterScreen />
                </MemoryRouter>
            </Provider>
        ); 

        expect( wrapper.find('.auth__alert-error').exists() ).toBe( true );
        expect( wrapper.find('.auth__alert-error').text().trim() ).toBe( initState.ui.msgError );
    });
    
});
