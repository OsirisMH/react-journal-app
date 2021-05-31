import cloudinary from 'cloudinary';

import { fileUpload } from "../../helpers/fileUpload";

cloudinary.config({ 
    cloud_name: 'dprnkj8u8', 
    api_key: '396191297654867', 
    api_secret: 'ZDPQh33ko183c7hca3jpk-Tz9QY' 
});

describe('Pruebas en fileUpload', () => {
   
    test('Debe de cargar un archivo y retornar el URL', async () => {
        
        const resp = await fetch('https://d500.epimg.net/cincodias/imagenes/2018/11/13/lifestyle/1542113135_776401_1542116070_noticia_normal.jpg');
        const blob = await resp.blob();


        const file = new File([blob], 'foto.jpg');
        const url = await fileUpload( file );

        expect( typeof url ).toBe('string');

        // Borrar imagen por ID
        const segments = url.split('/');
        const imageId = segments[ segments.length - 1 ].replace('.jpg', '');

        cloudinary.v2.api.delete_resources( imageId, {}, () => { });

    });

    test('Debe de retornar un error', async () => {
       
        const file = new File([], 'foto.jpg');
        const url = await fileUpload( file );

        expect( url ).toBe( null );
        
    });
    
    
    
});
