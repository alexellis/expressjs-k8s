package handlers

import (
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestRouter(t *testing.T) {
	r := Router()
	ts := httptest.NewServer(r)
	defer ts.Close()

	res, err := http.Get(ts.URL + "/home")
	if err != nil {
		t.Fatal(err)
	}
	if res.StatusCode != http.StatusOK {
		t.Errorf("Status code for /home is wrong. Have: %d, want: %d.", res.StatusCode, http.StatusOK)
	}

	res, err = http.Post(ts.URL+"/home", "text/plain", nil)
	if err != nil {
		t.Fatal(err)
	}
	if res.StatusCode != http.StatusMethodNotAllowed {
		t.Errorf("Status code for /home is wrong. Have: %d, want: %d.", res.StatusCode, http.StatusMethodNotAllowed)
	}

	res, err = http.Get(ts.URL + "/not-exists")
	if err != nil {
		t.Fatal(err)
	}
	if res.StatusCode != http.StatusNotFound {
		t.Errorf("Status code for /home is wrong. Have: %d, want: %d.", res.StatusCode, http.StatusNotFound)
	}
}