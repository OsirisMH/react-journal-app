import { finishLoading, removeError, setError, startLoading } from "../../actions/ui";
import { types } from "../../types/types";

describe('Pruebas en ui actions', () => {
   
    test('Todas las acciones deben de funcionar', () => {
        
        const setErrorAction = setError('AUXILIO ESCUCHO BORROSO');
        const removeErrorAction = removeError();
        const startLoadingAction = startLoading();
        const finishLoadingAction = finishLoading();

        expect( setErrorAction ).toEqual({
            type: types.uiSetError,
            payload: 'AUXILIO ESCUCHO BORROSO'
        });

        expect( removeErrorAction ).toEqual({
            type: types.uiRemoveError
        });

        expect( startLoadingAction ).toEqual({
            type: types.uiStartLoading
        });

        expect( finishLoadingAction ).toEqual({
            type: types.uiFinishLoading
        });
        
    });
    
    
});
