import { Google } from "@mui/icons-material"
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material"
import { useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link as RouterLink } from 'react-router-dom'
import { useForm } from "../../hooks"
import { checkingAuthentication, startGoogleSignIn, startLoginWithEmailPassword } from "../../store/auth"
import { AuthLayout } from "../layout/AuthLayout"

const formData = {
    email: 'facu@correo.com',
    password: '123456'
}

export const LoginPage = () => {


    const { status, errorMessage } = useSelector(state => state.auth)

    const dispatch = useDispatch()

    const [formSubmitted, setFormSubmitted] = useState(false)

    const formValidations = {
        email: [(value) => value.includes("@"), "El correo debe tener una @."],
        password: [(value) => value.length >= 6, "El password debe tener más de 6 letras."],
    }

    const { email, password, onInputChange, formState, isFormValid, emailValid, passwordValid } = useForm(formData, formValidations)

    const isAuthenticating = useMemo(() => status === 'checking', [status])

    const onSubmit = (e) => {
        e.preventDefault()
        setFormSubmitted(true)
        if (!isFormValid) return;
        console.log('formState', formState)
        dispatch(startLoginWithEmailPassword(formState))
    }

    const onGoogleSignIn = () => {
        dispatch(startGoogleSignIn())
    }

    return (
        <AuthLayout title="Login">
            <form
                onSubmit={onSubmit}
                aria-label="submit-form"
                className="animate__animated animate__fadeIn animate__faster"
            >
                <Grid container>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label="Correo"
                            type="email"
                            placeholder="correo@google.com"
                            fullWidth
                            name="email"
                            value={email}
                            onChange={onInputChange}
                            error={!!emailValid && formSubmitted}
                            helperText={emailValid}
                        />
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label="Contraseña"
                            type="password"
                            placeholder="Contraseña"
                            fullWidth
                            name="password"
                            value={password}
                            onChange={onInputChange}
                            error={!!passwordValid && formSubmitted}
                            helperText={passwordValid}
                            inputProps={{
                                'data-testid': 'password'
                            }}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={2} sx={{ mb: 1, mt: 1 }}>
                    <Grid item xs={12} display={!!errorMessage ? '' : 'none'}>
                        <Alert severity="error">
                            {errorMessage}
                        </Alert>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Button disabled={isAuthenticating} type="submit" variant="contained" fullWidth>
                            Login
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Button
                            disabled={isAuthenticating}
                            variant="contained"
                            fullWidth
                            aria-label="google-btn"
                            onClick={onGoogleSignIn}
                        >
                            <Google />
                            <Typography sx={{ ml: 1 }}>Google</Typography>
                        </Button>
                    </Grid>
                    <Grid container direction='row' justifyContent='end'>
                        <Link component={RouterLink} color='inherit' to='/auth/register'>
                            Crear una cuenta
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </AuthLayout>
    )
}
