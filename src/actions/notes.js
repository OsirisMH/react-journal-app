import Swal from 'sweetalert2';

import { db } from "../firebase/firebase-config";
import { fileUpload } from '../helpers/fileUpload';
import { loadNotes } from "../helpers/loadNotes";
import { types } from "../types/types";

export const startNewNote = () => {
    return async ( dispatch, getState ) => {

        const { uid } = getState().auth;
        
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        };
        
        try{
            const docRef = await db.collection(`${ uid }/journal/notes`).add( newNote );
        
            dispatch( activeNote( docRef.id, newNote ) );
            dispatch( addNewNote( docRef.id, newNote ) );
        }
        catch(err){
            console.log(err);
        }
        
    };
};

export const activeNote = ( id, note ) => ({
    type: types.notesActive,
    payload: {
        id,
        ...note
    }
});

export const addNewNote = ( id, note ) => ({
    type: types.notesAddNew,
    payload: {
        id,
        ...note
    }
});

export const startLoadingNotes = ( uid ) => {
    return async ( dispatch ) => {

        const notes = await loadNotes( uid );
        dispatch( setNotes( notes ) );

    };
};

export const setNotes = ( notes ) => ({
    type: types.notesLoad,
    payload: notes
});

export const startSaveNote = ( note ) => {
    return async ( dispatch, getState ) => {
        
        const { uid } = getState().auth;

        

        if ( !note.url ){
            delete note.url;
        }
        
        const noteToFirestore = { ...note };
        delete noteToFirestore.id;

        try{
            await db.doc(`${ uid }/journal/notes/${ note.id }`).update( noteToFirestore );
            dispatch( refreshNote( note.id, noteToFirestore ) );
            Swal.fire('Saved', note.title, 'success');
        }
        catch(err){
            console.log(err)
        }
        
    };
};

export const refreshNote = ( id, note ) => ({
    type: types.notesUpdated,
    payload: {
        id,
        note: {
            id,
            ...note
        }
    }
});

export const startUploadingImage = ( file ) => {
    return async ( dispatch, getState ) => {
        
        const { active: activeNote } = getState().notes;

        Swal.fire({
            title: 'Uploading...',
            text: 'Please wait...',
            allowOutsideClick: false,
            showConfirmButton: false,
            willOpen: () => {
                Swal.showLoading();
            }
        })

        const fileUrl = await fileUpload( file );

        activeNote.url = fileUrl;
        dispatch( startSaveNote( activeNote ) );

        Swal.close();
    };
};

export const startDeleting = ( noteId ) => {
    return async ( dispatch, getState ) => {

        const uid = getState().auth.uid;
        await db.doc(`${ uid }/journal/notes/${ noteId }`).delete();

        dispatch( deleteNote( noteId ) );

        Swal.fire('Success', 'Note deleted', 'success');
    };
};

export const deleteNote = ( noteId ) => ({
    type: types.notesDelete,
    payload: noteId
});

export const noteLogout = () => ({
    type: types.notesLogoutCleaning
});