import { loginWithEmailAndPassword, logoutFirebase, signInWithGoogle } from "../../../src/firebase/providers"
import { checkingCredentials, login, logout } from "../../../src/store/auth"
import { checkingAuthentication, startGoogleSignIn, startLoginWithEmailPassword, startLogout } from "../../../src/store/auth/thunks"
import { clearNotesLogout } from "../../../src/store/journal/journalSlice"
import { demoUser } from "../../fixtures/authFixtures"

jest.mock("../../../src/firebase/providers")

describe('Pruebas en authThunks', () => {
    const dispatch = jest.fn()
    beforeEach(() => jest.clearAllMocks())
    test('debe de invocar el checkingCredentials', async () => {


        await checkingAuthentication()(dispatch)

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
    })

    test('start googleSignIn debe de llamar checkingCredentials y login - Exito', async () => {
        const loginData = { ok: true, ...demoUser }
        await signInWithGoogle.mockResolvedValue(loginData)
        await startGoogleSignIn()(dispatch)

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
        expect(dispatch).toHaveBeenCalledWith(login(loginData))
    })

    test('start googleSignIn debe de llamar checkingCredentials y login - Incorrecto', async () => {
        const loginData = { ok: false, errorMessage: 'mensaje de error' }
        await signInWithGoogle.mockResolvedValue(loginData)
        await startGoogleSignIn()(dispatch)

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
        expect(dispatch).toHaveBeenCalledWith(logout(loginData.errorMessage))
    })

    test('startLoginWithEmailAndPassword debe de llamar checkingCredentials y login - Exito', async () => {
        const loginData = { ok: true, ...demoUser }
        const formData = { email: demoUser.email, password: '123456' }

        await loginWithEmailAndPassword.mockResolvedValue(loginData)
        await startLoginWithEmailPassword(formData)(dispatch)

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
        expect(dispatch).toHaveBeenCalledWith(login(loginData))
    })

    test('startLogout debe de llamar logoutFirebase, clearNotes y logout', async () => {
        await startLogout()(dispatch)
        expect(logoutFirebase).toHaveBeenCalled()
        expect(dispatch).toHaveBeenCalledWith(clearNotesLogout())
        expect(dispatch).toHaveBeenCalledWith(logout())
    })
})