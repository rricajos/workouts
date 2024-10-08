package repositories

import (
	"sync"

	"github.com/rricajos/workouts/models"
)

var (
	userStore = make(map[string]models.User)
	mu        sync.Mutex
)

// AddUser agrega un nuevo usuario al repositorio
func AddUser(user models.User) {
	mu.Lock()
	defer mu.Unlock()
	userStore[user.Username] = user
}

// GetUser obtiene un usuario por su nombre de usuario
func GetUser(username string) (models.User, bool) {
	mu.Lock()
	defer mu.Unlock()
	user, exists := userStore[username]
	return user, exists
}
