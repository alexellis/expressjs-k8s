package handlers

import (
	"net/http"
)

// home is a simple HTTP handler function which writes a response.
func home(w http.ResponseWriter, _ *http.Request) {
	w.Write([]byte("working as per usual"))
}
