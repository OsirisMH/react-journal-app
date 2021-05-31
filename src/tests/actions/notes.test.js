/**
 * @jest-environment node
*/
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';

import { startLoadingNotes, startNewNote, startSaveNote, startUploadingImage } from '../../actions/notes';
import { db } from '../../firebase/firebase-config';
import { types } from '../../types/types';
import { fileUpload } from '../../helpers/fileUpload';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

jest.mock('../../helpers/fileUpload', () => ({
    fileUpload: () => { return 'https://nomames-images/image.jpg' }
    // fileUpload: () => { return Promise.resolve('https://nomames-images/image.jpg') }
}));

const initState = {
    auth: {
        uid: 'TESTING',
        name: 'username'
    },
    notes: {
        active: {
            id: '2AhcyqMS2LxS4Wqd9KZu',
            title: 'Hola',
            body: 'Mundo'
        }
    }
};

let store = mockStore( initState );

describe('Pruebas en notes actions', () => {

    afterAll(() => {
        db.disableNetwork();
    });

    beforeEach( () => {
        store = mockStore( initState );
    });

    test('Debe de crear una nueva nota [startNewNote]', async () => {
        
        await store.dispatch( startNewNote() );

        const actions = store.getActions();

        expect( actions[0] ).toEqual({
            type: types.notesActive,
            payload: {
                id: expect.any(String),
                title: '',
                body: '',
                date: expect.any(Number)
            }
        });

        expect( actions[1] ).toEqual({
            type: types.notesAddNew,
            payload: {
                id: expect.any(String),
                title: '',
                body: '',
                date: expect.any(Number)
            }
        });

        const docId = actions[0].payload.id;
        await db.doc(`/TESTING/journal/notes/${ docId }`).delete();
    
    });
    
    test('Debe cargar las notas [startLoadingNotes]', async () => {

        await store.dispatch( startLoadingNotes('TESTING') );

        const actions = store.getActions();
        
        expect( actions[0] ).toEqual({
            type: types.notesLoad,
            payload: expect.any(Array)
        });

        const expected = {
            id: expect.any(String),
            title: expect.any(String),
            body: expect.any(String),
            date: expect.any(Number),
        }

        expect( actions[0].payload[0] ).toMatchObject( expected );

    });
    
    test('Debe de actualizar la nota [startSaveNote]', async () => {
       
        const note = {
            id: '2AhcyqMS2LxS4Wqd9KZu',
            title: 'titulo',
            body: 'cambio'
        }
        await store.dispatch( startSaveNote( note ) );
        const actions = store.getActions();
        const docRef = await db.doc(`/TESTING/journal/notes/${ note.id }`).get();

        expect( actions[0].type ).toBe( types.notesUpdated );
        expect( docRef.data().title ).toBe( note.title );
        
    });

    test('Debe de actualizar el url de la imagen [startUploadingImage]', async () => {
       
        const file = [];
        await store.dispatch( startUploadingImage( file ) );

        const docRef = await db.doc('/TESTING/journal/notes/2AhcyqMS2LxS4Wqd9KZu').get();
        expect( docRef.data().url ).toBe('https://nomames-images/image.jpg');
        
    });
    
});
