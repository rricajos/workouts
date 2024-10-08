package services

import (
	"errors"

	"github.com/rricajos/workouts/models"
	"github.com/rricajos/workouts/repositories"
	"golang.org/x/crypto/bcrypt"
)

func hashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)
	return string(bytes), err
}

func checkPasswordHash(password, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}

// SignUpUser maneja el registro de nuevos usuarios con contraseñas hasheadas
func SignUpUser(user models.User) error {
	_, exists := repositories.GetUser(user.Username)
	if exists {
		return errors.New("el usuario ya existe")
	}

	hashedPassword, err := hashPassword(user.Password)
	if err != nil {
		return err
	}

	user.Password = hashedPassword
	repositories.AddUser(user)
	return nil
}

// SignInUser maneja el inicio de sesión validando la contraseña hasheada
func SignInUser(user models.User) error {
	storedUser, exists := repositories.GetUser(user.Username)
	if !exists || !checkPasswordHash(user.Password, storedUser.Password) {
		return errors.New("nombre de usuario o contraseña inválidos")
	}

	return nil
}
