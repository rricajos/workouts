package handlers

import (
	"github.com/gofiber/fiber/v2"
	"github.com/rricajos/workouts/controllers"
	"github.com/rricajos/workouts/models"
)

// UserHandler es el manejador (handler) que agrupa las rutas y validaciones para los usuarios.
type UserHandler struct{}

// NewUserHandler crea una nueva instancia del manejador de usuarios
func NewUserHandler() *UserHandler {
	return &UserHandler{}
}

// HandleSignUp maneja las solicitudes de registro (sign up)
func (h *UserHandler) HandleSignUp(c *fiber.Ctx) error {
	var user models.User
	if err := c.BodyParser(&user); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid input"})
	}

	if len(user.Username) == 0 || len(user.Password) == 0 {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Username and password are required"})
	}

	err := controllers.SignUp(user) // Llama al controlador para manejar la lógica
	if err != nil {
		return c.Status(fiber.StatusConflict).JSON(fiber.Map{"error": err.Error()})
	}

	return c.Status(fiber.StatusCreated).JSON(fiber.Map{"message": "User created"})
}

// HandleSignIn maneja las solicitudes de inicio de sesión (sign in)
func (h *UserHandler) HandleSignIn(c *fiber.Ctx) error {
	var user models.User
	if err := c.BodyParser(&user); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid input"})
	}

	if len(user.Username) == 0 || len(user.Password) == 0 {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Username and password are required"})
	}

	err := controllers.SignIn(user) // Llama al controlador para manejar la lógica
	if err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": err.Error()})
	}

	return c.JSON(fiber.Map{"message": "Sign in successful"})
}
