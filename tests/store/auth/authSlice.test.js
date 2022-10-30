import { authSlice, checkingCredentials, login, logout } from "../../../src/store/auth/authSlice"
import { authenticatedState, demoUser, initialState, notAuthenticatedState } from "../../fixtures/authFixtures"



describe('should first', () => {
    test('debe de regresar el estado inicial y llamarse "auth"', () => {
        expect(authSlice.name).toBe('auth')
        const state = authSlice.reducer(initialState, {})

        expect(state).toEqual(initialState)
    })

    test('debe realizar la autenticacion', () => {
        const state = authSlice.reducer(initialState, login(demoUser))
        expect(state).toEqual({
            status: 'authenticated',
            uid: demoUser.uid,
            email: demoUser.email,
            displayName: demoUser.displayName,
            photoURL: demoUser.photoURL,
            errorMessage: null
        })
    })

    test('debe realizar el logout', () => {
        const state = authSlice.reducer(authenticatedState, logout())
        expect(state).toEqual({
            status: 'not-authenticated',
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: undefined,
        })
    })

    test('debe realizar el logout y mostrar un msj de error', () => {
        const state = authSlice.reducer(authenticatedState, logout({ errorMessage: 'mensaje de error' }))
        expect(state).toEqual({
            status: 'not-authenticated',
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: 'mensaje de error',
        })
    })

    test('debe cambiar el estado a checking', () => {
        const state = authSlice.reducer(authenticatedState, checkingCredentials())
        expect(state.status).toEqual('checking')
    })
})