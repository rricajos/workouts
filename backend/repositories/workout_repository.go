package repositories

import (
	"database/sql"
	"log"

	"github.com/rricajos/workouts/models"
)

// WorkoutRepository maneja las operaciones relacionadas con los workouts en la base de datos
type WorkoutRepository struct {
	db *sql.DB
}

// NewWorkoutRepository crea una nueva instancia de WorkoutRepository
func NewWorkoutRepository(db *sql.DB) *WorkoutRepository {
	return &WorkoutRepository{db: db}
}

// CreateWorkout guarda un nuevo workout en la base de datos
func (wr *WorkoutRepository) CreateWorkout(workout *models.Workout) error {
	query := `INSERT INTO workouts (user_id, sets, repetitions, rest, weight)
              VALUES ($1, $2, $3, $4, $5)
              RETURNING id`

	// Ejecutar la consulta SQL
	err := wr.db.QueryRow(query, workout.UserID, workout.Sets, workout.Repetitions, workout.Rest, workout.Weight).Scan(&workout.ID)
	if err != nil {
		log.Println("Error creating workout:", err)
		return err
	}

	log.Printf("Created workout with ID: %d", workout.ID)
	return nil
}

// GetWorkoutByID obtiene un workout por su ID desde la base de datos
func (wr *WorkoutRepository) GetWorkoutByID(id int) (*models.Workout, error) {
	query := `SELECT id, user_id, sets, repetitions, rest, weight
              FROM workouts
              WHERE id = $1`

	workout := &models.Workout{}

	// Ejecutar la consulta SQL
	err := wr.db.QueryRow(query, id).Scan(&workout.ID, &workout.UserID, &workout.Sets, &workout.Repetitions, &workout.Rest, &workout.Weight)
	if err != nil {
		log.Println("Error fetching workout:", err)
		return nil, err
	}

	return workout, nil
}

// UpdateWorkout actualiza un workout existente en la base de datos
func (wr *WorkoutRepository) UpdateWorkout(workout *models.Workout) error {
	query := `UPDATE workouts
              SET sets = $1, repetitions = $2, rest = $3, weight = $4
              WHERE id = $5`

	// Ejecutar la consulta SQL
	_, err := wr.db.Exec(query, workout.Sets, workout.Repetitions, workout.Rest, workout.Weight, workout.ID)
	if err != nil {
		log.Println("Error updating workout:", err)
		return err
	}

	log.Printf("Updated workout with ID: %d", workout.ID)
	return nil
}

// DeleteWorkout elimina un workout de la base de datos por su ID
func (wr *WorkoutRepository) DeleteWorkout(id int) error {
	query := `DELETE FROM workouts
              WHERE id = $1`

	// Ejecutar la consulta SQL
	_, err := wr.db.Exec(query, id)
	if err != nil {
		log.Println("Error deleting workout:", err)
		return err
	}

	log.Printf("Deleted workout with ID: %d", id)
	return nil
}
