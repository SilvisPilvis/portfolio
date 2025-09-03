package main

import (
	"bufio"
	"encoding/json"
	"fmt"
	"log"
	"os"
	"strconv"
	"strings"
	"time"
)

type Schedule struct {
	Schedule []Day `json:"schedule"`
}

type Day struct {
	ID         int32      `json:"id"`
	Date       time.Time  `json:"date"`
	Activities []Activity `json:"activities,omitempty"`
	Weekend    *bool      `json:"weekend"`
}

type Activity struct {
	ActivityType string    `json:"activity"` // school, work
	Start        time.Time `json:"start"`
	End          time.Time `json:"end"`
	Duration     float32   `json:"duration"`
	Pay          *float32  `json:"pay,omitempty"`
}

var HOURLY_RATE float32 = 7.33

func main() {
	activities := []string{
		"work",
		"school",
	}

	shifts := map[int]time.Duration{
		1: time.Hour * 12,
		2: time.Hour*8 + time.Minute*30,
	}
	shiftStringMap := []string{
		"12h [11:00 - 23:00 / 7:00 - 19:00 / 19:00 - 7:00]",
		"8h30min [7:00 - 15:30 / 14:30 - 23:00]",
	}

	// Print all months
	var count int = 1
	for i := time.January; i <= time.December; i++ {
		fmt.Println(count, "", i)
		count++
	}

	// Create a new reader to get input
	reader := bufio.NewReader(os.Stdin)
	fmt.Println("Enter the number of the month whose schedule you want to create: ")
	text, err := reader.ReadString('\n')
	if err != nil {
		log.Fatal(err)
	}

	// Remove newline character and trim spaces
	text = strings.TrimSpace(text)

	log.Println("Selected month:", text)

	// Get the month
	month, err := strconv.Atoi(text)
	if err != nil {
		log.Fatal("Invalid input:", err)
	}
	if month < 1 || month > 12 {
		log.Fatal("Invalid month. Please enter a number between 1 and 12.")
	}

	// Get current year
	year := time.Now().Year()

	// Create the first day of the month
	firstDay := time.Date(year, time.Month(month), 1, 0, 0, 0, 0, time.Local)

	// Create the first day of the next month to calculate the number of days
	nextMonth := firstDay.AddDate(0, 1, 0)
	lastDay := nextMonth.AddDate(0, 0, -1)

	numberOfDays := lastDay.Day()

	fmt.Printf("Creating schedule for %s %d (%d days):\n", firstDay.Month(), year, numberOfDays)
	fmt.Println("======================================")

	// Initialize schedule properly
	schedule := Schedule{
		Schedule: make([]Day, 0, numberOfDays), // Pre-allocate capacity
	}

	// Loop through all days of the month
	for day := 1; day <= numberOfDays; day++ {
		currentDate := time.Date(year, time.Month(month), day, 0, 0, 0, 0, time.Local)

		// Check if it's a weekend (Saturday or Sunday)
		isWeekend := currentDate.Weekday() == time.Saturday || currentDate.Weekday() == time.Sunday

		dayStruct := Day{
			ID:         int32(day),
			Date:       currentDate,
			Activities: []Activity{},
			Weekend:    &isWeekend,
		}

		fmt.Println("Add activity for day", day, "?(y/n) ")
		text, err := reader.ReadString('\n')
		if err != nil {
			log.Fatal(err)
		}

		text = strings.TrimSpace(text)

		if text == "y" {
			fmt.Println("What type of activity do you want to add? (1: work 2: school 3: both) ")
			text, err := reader.ReadString('\n')
			if err != nil {
				log.Fatal(err)
			}

			text = strings.TrimSpace(text)

			activityIndex, err := strconv.Atoi(text)
			if err != nil {
				log.Fatal("Invalid input:", err)
			}

			if activityIndex < 1 || activityIndex > len(activities) {
				log.Fatal("Invalid activity type. Please enter a number between 1 and 3.")
			}

			switch activityIndex {
			case 1:
				fmt.Printf("Enter the start time of the activity %s (hh:mm): \n", activities[activityIndex-1])
				startTimeStr, err := reader.ReadString('\n')
				if err != nil {
					log.Fatal(err)
				}
				startTimeStr = strings.TrimSpace(startTimeStr)

				// Parse just the time
				timeOnly, err := time.Parse("15:04", startTimeStr)
				if err != nil {
					log.Fatal("Invalid time format:", err)
				}

				// Combine with the day's date
				startTime := time.Date(
					dayStruct.Date.Year(),
					dayStruct.Date.Month(),
					dayStruct.Date.Day(),
					timeOnly.Hour(),
					timeOnly.Minute(),
					0, 0,
					dayStruct.Date.Location(), // Use the same timezone as dayStruct.Date
				)

				fmt.Println("Select the shift duration: ")
				// Prints all shifts and their duration
				for i, shift := range shiftStringMap {
					fmt.Println(i+1, shift)
				}

				// Gets the user input for the shift
				shiftIndexStr, err := reader.ReadString('\n')
				if err != nil {
					log.Fatal(err)
				}
				shiftIndexStr = strings.TrimSpace(shiftIndexStr)

				shiftIndex, err := strconv.Atoi(shiftIndexStr)
				if err != nil {
					log.Fatal("Invalid input:", err)
				}

				endTime := startTime.Add(shifts[shiftIndex])

				if startTime.After(endTime) {
					endTime = endTime.Add(24 * time.Hour)
				}

				// Duration of the activity
				dur := endTime.Sub(startTime)
				dur = dur.Round(time.Minute)
				// Round the duration to the nearest minute
				durFloat := float32(dur.Hours())

				pay := HOURLY_RATE * durFloat

				workStruct := Activity{
					ActivityType: activities[activityIndex-1],
					Start:        startTime,
					End:          endTime,
					Duration:     durFloat,
					Pay:          &pay,
				}

				dayStruct.Activities = append(dayStruct.Activities, workStruct)
				schedule.Schedule = append(schedule.Schedule, dayStruct)
			case 2:
				fmt.Printf("Enter the start time of the activity %s (hh:mm): \n", activities[activityIndex-1])
				startTimeStr, err := reader.ReadString('\n')
				if err != nil {
					log.Fatal(err)
				}
				startTimeStr = strings.TrimSpace(startTimeStr)

				// Parse just the time
				timeOnly, err := time.Parse("15:04", startTimeStr)
				if err != nil {
					log.Fatal("Invalid time format:", err)
				}

				// Combine with the day's date
				startTime := time.Date(
					dayStruct.Date.Year(),
					dayStruct.Date.Month(),
					dayStruct.Date.Day(),
					timeOnly.Hour(),
					timeOnly.Minute(),
					0, 0,
					dayStruct.Date.Location(), // Use the same timezone as dayStruct.Date
				)

				fmt.Printf("Enter the end time of the activity %s (hh:mm): \n", activities[activityIndex-1])
				endTimeStr, err := reader.ReadString('\n')
				if err != nil {
					log.Fatal(err)
				}

				endTime, err := time.Parse("15:04", endTimeStr)

				if startTime.After(endTime) {
					endTime = endTime.Add(24 * time.Hour)
				}

				// Duration of the activity
				dur := endTime.Sub(startTime)
				durFloat := float32(dur.Hours())

				schoolStruct := Activity{
					ActivityType: activities[activityIndex-1],
					Start:        startTime,
					End:          endTime,
					Duration:     durFloat,
					Pay:          nil,
				}

				dayStruct.Activities = append(dayStruct.Activities, schoolStruct)
				schedule.Schedule = append(schedule.Schedule, dayStruct)
			case 3:
				fmt.Printf("Enter the start time of the activity %s (hh:mm): \n", activities[activityIndex-1])
				startTimeStr, err := reader.ReadString('\n')
				if err != nil {
					log.Fatal(err)
				}
				startTimeStr = strings.TrimSpace(startTimeStr)

				// Parse just the time
				timeOnly, err := time.Parse("15:04", startTimeStr)
				if err != nil {
					log.Fatal("Invalid time format:", err)
				}

				// Combine with the day's date
				startTime := time.Date(
					dayStruct.Date.Year(),
					dayStruct.Date.Month(),
					dayStruct.Date.Day(),
					timeOnly.Hour(),
					timeOnly.Minute(),
					0, 0,
					dayStruct.Date.Location(), // Use the same timezone as dayStruct.Date
				)

				fmt.Println("Select the shift duration: ")
				for i, shift := range shiftStringMap {
					fmt.Println(i+1, shift)
				}

				shiftIndexStr, err := reader.ReadString('\n')
				if err != nil {
					log.Fatal(err)
				}
				shiftIndexStr = strings.TrimSpace(shiftIndexStr)

				shiftIndex, err := strconv.Atoi(shiftIndexStr)
				if err != nil {
					log.Fatal("Invalid input:", err)
				}

				endTime := startTime.Add(shifts[shiftIndex])

				if startTime.After(endTime) {
					endTime = endTime.Add(24 * time.Hour)
				}

				// Duration of the activity
				dur := endTime.Sub(startTime)
				dur = dur.Round(time.Minute)
				// Round the duration to the nearest minute
				durFloat := float32(dur.Hours())

				pay := HOURLY_RATE * durFloat

				workStruct := Activity{
					ActivityType: activities[activityIndex-1],
					Start:        startTime,
					End:          endTime,
					Duration:     durFloat,
					Pay:          &pay,
				}

				dayStruct.Activities = append(dayStruct.Activities, workStruct)
				// Work
				fmt.Printf("Enter the start time of the activity %s (hh:mm): \n", activities[activityIndex-1])
				startTimeStr, err = reader.ReadString('\n')
				if err != nil {
					log.Fatal(err)
				}

				startTime, err = time.Parse("15:04", startTimeStr)

				fmt.Printf("Enter the end time of the activity %s (hh:mm): \n", activities[activityIndex-1])
				endTimeStr, err := reader.ReadString('\n')
				if err != nil {
					log.Fatal(err)
				}

				endTime, err = time.Parse("15:04", endTimeStr)

				if startTime.After(endTime) {
					endTime = endTime.Add(24 * time.Hour)
				}

				// Duration of the activity
				dur = endTime.Sub(startTime)
				durFloat = float32(dur.Hours())

				schoolStruct := Activity{
					ActivityType: activities[activityIndex-1],
					Start:        startTime,
					End:          endTime,
					Duration:     durFloat,
					Pay:          nil,
				}

				dayStruct.Activities = append(dayStruct.Activities, schoolStruct)
				schedule.Schedule = append(schedule.Schedule, dayStruct)
			default:
				log.Fatal("Invalid activityIndex in switch. Please enter a number between 1 and 3.")
			}
		}
	}

	if len(schedule.Schedule) == 0 {
		log.Fatal("No schedule created. Please try again.")
	}

	fmt.Println("Serializing schedule...")
	scheduleJSON, err := json.MarshalIndent(schedule, "", "  ")

	filename := fmt.Sprintf("schedule-%d-%d.json", month, year)
	err = os.WriteFile(filename, scheduleJSON, 0644)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("Successfully created schedule with %d days and saved it to %s\n", len(schedule.Schedule), filename)
}
