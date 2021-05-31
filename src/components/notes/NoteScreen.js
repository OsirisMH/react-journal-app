import React, { useEffect, useRef } from 'react'
import { NotesAppBar } from './NotesAppBar'
import { useForm } from '../../hooks/useForm';
import { useDispatch, useSelector } from 'react-redux';
import { activeNote, startDeleting } from '../../actions/notes';

export const NoteScreen = () => {

    const { active:note } = useSelector(state => state.notes);
    const dispatch = useDispatch();
    const [ formValues, handleInputChange, reset ] = useForm( note );
    const { title, body } = formValues;

    const activeId = useRef( note.id );

    useEffect(() => {
        
        if ( note.id !== activeId.current ){
            reset( note );
            activeId.current = note.id;
        }

    }, [ note, reset ]);

    useEffect(() => {
        
        dispatch( activeNote(formValues.id, { ...formValues }) );

    }, [ formValues, dispatch ])

    const handleDelete = () => {
        dispatch( startDeleting( activeId.current ) );
    };

    return (
        <div className="notes__main-content">
            
            <NotesAppBar />

            <div className="notes__content">
                <input
                    type="text"
                    placeholder="title"
                    className="notes__title-input"
                    autoComplete="off"
                    name="title"
                    value={ title }
                    onChange={ handleInputChange }
                />

                <textarea
                    placeholder="What's new?"
                    className="notes__textarea"
                    name="body"
                    value={ body }
                    onChange={ handleInputChange }
                ></textarea>

                {
                    (note.url)
                    &&
                        (
                            <div className="notes__picture">
                                <img
                                    src={ note.url }
                                    alt="imagen"
                                />
                            </div>
                        )
                }

            </div>

            <button
                className="btn btn-danger"
                onClick={ handleDelete }
            >
                Delete
            </button>

        </div>
    )
}
