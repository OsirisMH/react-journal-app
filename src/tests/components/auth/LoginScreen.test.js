import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';

import { mount } from "enzyme";
import { Provider } from "react-redux";
import { MemoryRouter } from 'react-router';

import { LoginScreen } from "../../../components/auth/LoginScreen";
import { startGoogleLogin, startLoginEmailPassword } from '../../../actions/auth';

jest.mock('../../../actions/auth', () => ({
    startGoogleLogin: jest.fn(),
    startLoginEmailPassword: jest.fn()
}));

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
store.dispatch = jest.fn();

describe('Pruebas en <LoginScreen />', () => {

    beforeEach(() => {
        store = mockStore(initState);
        jest.clearAllMocks();
    });

    
    const wrapper = mount(
        <Provider store={ store }>
            <MemoryRouter>
                <LoginScreen />
            </MemoryRouter>
        </Provider>
    );

    test('Debe mostrarse correctamente', () => {
        expect( wrapper ).toMatchSnapshot();
    });
    
    test('Debe de disparar la acción de startGoogleLogin', () => {
        wrapper.find('.auth__social-networks').prop('onClick')();
        expect( startGoogleLogin ).toHaveBeenCalled();
    });

    test('Debe de disparar la acción startLoginEmailPassword', () => {
        wrapper.find('input[type="text"]').simulate('change', {       
            target: {
            name: 'email',
            value: 'tomasuhuhuhu@gmail.com'
        }});
        wrapper.find('input[type="password"]').simulate('change', {       
            target: {
            name: 'password',
            value: 'tutancamon'
        }});
        wrapper.find('form').prop('onSubmit')({
            preventDefault(){}
        });
        expect( startLoginEmailPassword ).toHaveBeenCalledWith('tomasuhuhuhu@gmail.com','tutancamon');
    });
    
});
