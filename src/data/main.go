package main

import (
	"encoding/json"
	"fmt"
	"log"
	"os"
	"strings"
)

type Book struct {
	Author string `json:"author"`
	Title  string `json:"title"`
	ISBN   string `json:"isbn"`
}

type SaveBook struct {
	ID int `json:"id"`
	Author string `json:"author"`
	Title  string `json:"title"`
	ISBN   string `json:"isbn"`
}

func main() {
	if len(os.Args) > 1 && os.Args[1] != "" && strings.Contains(os.Args[1], ".json") {
		file, err := os.ReadFile("./" + os.Args[1])
		if err != nil {
			log.Fatal(err)
		}

		// Unmarshal into slice of strings
		var rawData []Book
		err = json.Unmarshal(file, &rawData)
		if err != nil {
			log.Fatal(err)
		}

		if len(rawData) == 0 {
			log.Fatal("Empty JSON file")
		}

		// Check if we have complete groups of 3
		if len(rawData)%3 != 0 {
			log.Fatal("JSON data doesn't contain complete groups of 3 elements")
		}

		var books []SaveBook
		// Process in groups of 3
		for i := 0; i < len(rawData); i++ {
			books = append(books, SaveBook{
				ID: i,
				ISBN:   rawData[i].ISBN,      // 1st element: ISBN
				Title:  rawData[i].Title,    // 2nd element: Title
				Author: rawData[i].Author,    // 3rd element: Author
			})
		}

		output, err := json.MarshalIndent(books, "", "  ")
		if err != nil {
			log.Fatal(err)
		}

		bookFile := "books1.json"
		err = os.WriteFile(bookFile, output, 0644)
		if err != nil {
			log.Fatal(err)
		}

		fmt.Printf("Successfully converted %d books to %s\n", len(books), bookFile)
	}
}
