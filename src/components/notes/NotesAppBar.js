import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startSaveNote, startUploadingImage } from '../../actions/notes';

export const NotesAppBar = () => {

    const dispatch = useDispatch();
    const { active:note } = useSelector( state => state.notes );

    const handleSave = () => {
        dispatch( startSaveNote( note ) );
    };

    const handlePictureUpload = () => {
        document.querySelector("#fileSelector").click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if ( file ){
            dispatch( startUploadingImage( file ) );
        }
    };

    return (
        <div className="notes__appbar">
            <span>28 de agosto 2020</span>

            <input
                id="fileSelector"
                type="file"
                name="file"
                style={{ display: 'none' }}
                onChange={ handleFileChange }
            />

            <div>
                <button
                    className="btn"
                    onClick={ handlePictureUpload }
                >
                    Picture
                </button>

                <button
                    className="btn"
                    onClick={ handleSave }
                >
                    Save
                </button>
            </div>
        </div>
    )
}
