package models

// Workout estructura representa un workout en la aplicación
type Workout struct {
	ID          int `json:"id"`
	UserID      int `json:"user_id"`
	Sets        int `json:"sets"`
	Repetitions int `json:"repetitions"`
	Rest        int `json:"rest"`
	Weight      int `json:"weight"`
	// Otros campos según sea necesario
}
