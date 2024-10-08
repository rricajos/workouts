package controllers

import (
	"github.com/rricajos/workouts/models"
	"github.com/rricajos/workouts/services"
)

// SignUp es el controlador para manejar la lógica de registro de usuarios
func SignUp(user models.User) error {
	return services.SignUpUser(user)
}

// SignIn es el controlador para manejar la lógica de inicio de sesión de usuarios
func SignIn(user models.User) error {
	return services.SignInUser(user)
}
