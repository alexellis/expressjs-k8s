package handlers

import (
	"github.com/gorilla/mux"
)

// Router register necessary routes and returns an instance of a router.
func Router() *mux.Router {
	r := mux.NewRouter()
	r.HandleFunc("/home", home).Methods("GET")
	r.HandleFunc("/healthz", health)
	r.HandleFunc("/readyz", ready)
	return r
}