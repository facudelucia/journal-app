import { v2 as cloudinary } from 'cloudinary'
import { fileUpload } from "../../src/helpers/fileUpload"

cloudinary.config({
    cloud_name: 'dqyupjgty',
    api_key: '956947277991355',
    api_secret: '2drw0UVxQIY33m9qMi5GsZivpm8',
    secure: true
})

describe('Pruebas en file upload', () => {
    test('Debe subir correctamente el archivo a cloudinary', async () => {
        const imageUrl = 'https://hips.hearstapps.com/hmg-prod/images/mike-tyson-poses-for-a-portrait-news-photo-1654945111.jpg'
        const resp = await fetch(imageUrl)
        const blob = await resp.blob()
        const file = new File([blob], 'foto.jpg')

        const url = await fileUpload(file)
        expect(typeof url).toBe('string')

        const segments = url.split('/')
        const imageId = segments[segments.length - 1].replace('jpg', '')

        const cloudResp = await cloudinary.api.delete_resources(['journal/' + imageId], {
            resource_type: 'image'
        })
    })
    test('Debe de retornar null', async () => {
        const file = new File([], 'foto.jpg')
        const url = await fileUpload(file)
        expect(url).toBe(null)
    })
})