package main

import (
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/websocket/v2"
	"github.com/rricajos/workouts/handlers"
)

func main() {
	app := fiber.New()

	// Habilitar CORS para permitir solicitudes desde el frontend
	app.Use(cors.New(cors.Config{
		AllowOrigins: "http://localhost:5000", // Cambia a la URL del frontend
		AllowMethods: "GET,POST,PUT,DELETE",
	}))

	// Ruta para manejar conexiones WebSocket
	app.Get("/ws", websocket.New(func(c *websocket.Conn) {
		defer c.Close()
		for {
			_, msg, err := c.ReadMessage()
			if err != nil {
				log.Println(err)
				break
			}
			log.Printf("Received message: %s\n", msg)
			if err := c.WriteMessage(websocket.TextMessage, msg); err != nil {
				log.Println(err)
				break
			}
		}
	}))

	// Instancia del handler de usuarios
	userHandler := handlers.NewUserHandler()

	// Rutas utilizando el handler
	app.Post("/api/signup", userHandler.HandleSignUp)
	app.Post("/api/signin", userHandler.HandleSignIn)

	// Iniciar el servidor en el puerto 3000
	log.Fatal(app.Listen(":3000"))
}
