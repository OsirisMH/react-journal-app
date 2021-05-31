import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';

import { mount } from "enzyme";
import { Provider } from "react-redux";

import { Sidebar } from '../../../components/journal/Sidebar';
import { startLogout } from '../../../actions/auth';
import { startNewNote } from '../../../actions/notes';

jest.mock('../../../actions/auth', () => ({
    startLogout: jest.fn()
}));

jest.mock('../../../actions/notes', () => ({
    startNewNote: jest.fn()
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

describe('Pruebas en <Sidebar />', () => {
        
    const wrapper = mount(
        <Provider store={ store }>
            <Sidebar />
        </Provider>
    );

    test('Debe de mostrarse correctamente', () => {
        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find('span').text().trim() ).toBe(initState.auth.name);
    });

    test('Debe de llamar el startLogout', () => {
        wrapper.find('button').prop('onClick')();
        expect( startLogout ).toHaveBeenCalled();
    });
    
    test('Debe de llamar el startNewNote', () => {
        wrapper.find('.journal__new-entry').prop('onClick')();
        expect( startNewNote ).toHaveBeenCalled();
    });

});
