package models

type User struct {
	Username string `json:"username"`
	Password string `json:"password"` // En un entorno real, nunca almacenes la contraseña en texto plano.
}
