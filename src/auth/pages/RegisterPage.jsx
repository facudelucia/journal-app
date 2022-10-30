import { Google } from "@mui/icons-material"
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material"
import { useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link as RouterLink } from 'react-router-dom'
import { useForm } from "../../hooks"
import { startCreatingUserWithEmailPassword } from "../../store/auth"
import { AuthLayout } from "../layout/AuthLayout"

export const RegisterPage = () => {

    const dispatch = useDispatch()

    const { status, errorMessage } = useSelector(state => state.auth)

    const isCheckingAuthentication = useMemo(() => status === 'checking', [status])

    const formValidations = {
        email: [(value) => value.includes("@"), "El correo debe tener una @."],
        password: [(value) => value.length >= 6, "El password debe tener más de 6 letras."],
        displayName: [(value) => value.length >= 1, "El nombre es obligatorio."],
    }

    const { displayName, email, password, onInputChange, formState, isFormValid, displayNameValid, emailValid, passwordValid } = useForm({
        email: 'facu@correo.com',
        password: '123456',
        displayName: 'Facundo Herrera'
    }, formValidations)

    const [formSubmitted, setFormSubmitted] = useState(false)

    const onSubmit = (e) => {
        e.preventDefault()
        setFormSubmitted(true)
        if (!isFormValid) return;
        dispatch(startCreatingUserWithEmailPassword(formState))
    }

    return (
        <AuthLayout title="Register">
            <form onSubmit={onSubmit} className="animate__animated animate__fadeIn animate__faster">
                <Grid container>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label="Nombre Completo"
                            type="text"
                            placeholder="Facundo Herrera"
                            fullWidth
                            name="displayName"
                            value={displayName}
                            onChange={onInputChange}
                            error={!!displayNameValid && formSubmitted}
                            helperText={displayNameValid}
                        />
                    </Grid>
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
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={2} sx={{ mb: 1, mt: 1 }}>
                    <Grid item xs={12} display={!!errorMessage ? '' : 'none'}>
                        <Alert severity="error">
                            {errorMessage}
                        </Alert>
                    </Grid>
                    <Grid item xs={12}>
                        <Button disabled={isCheckingAuthentication} type="submit" variant="contained" fullWidth>
                            Register
                        </Button>
                    </Grid>
                    <Grid container direction='row' justifyContent='end'>
                        <Typography sx={{ mr: 1 }}>¿Ya tienes una cuenta?</Typography>
                        <Link component={RouterLink} color='inherit' to='/auth/login'>
                            Iniciar sesión
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </AuthLayout>
    )
}
