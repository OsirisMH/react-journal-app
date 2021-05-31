import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';

import { mount } from "enzyme";
import { Provider } from "react-redux";
import { MemoryRouter } from 'react-router';
import { act } from 'react-dom/test-utils';
import { firebase } from '../../firebase/firebase-config';

import { AppRouter } from '../../routers/AppRouter';
import { login } from '../../actions/auth';

jest.mock('../../actions/auth', () => ({
    login: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
    auth: {
        uid: '3vKliWChs7ObWQBXuqBPgW7dO7j1',
        name: 'testing'
    },
    ui: {
        loading: false,
        msgError: null
    },
    notes: {
        active: {
            id: 'ABC',
        },
        notes: []
    }
};
let store = mockStore( initState );
store.dispatch = jest.fn();

describe('Pruebas en <AppRouter />', () => {

    test('Debe llamar el login si estoy autenticado', async () => {        
        await act( async () => {
            const userCred = await firebase.auth().signInWithEmailAndPassword('test@testing.com', '123456');
            const wrapper = mount(
                <Provider store={ store }>
                    <MemoryRouter>
                        <AppRouter />
                    </MemoryRouter>
                </Provider>
            );
        })

        expect( login ).toHaveBeenCalledWith('3vKliWChs7ObWQBXuqBPgW7dO7j1', null);
    });
    
});
