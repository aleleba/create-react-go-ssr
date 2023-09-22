package utils

import (
    "os"
    "regexp"
    "github.com/clarkmcc/go-typescript"
)

func GetRoutes () []string {
	// Read the contents of the TypeScript file
    content, err := os.ReadFile("../routes/index.tsx")
    if err != nil {
        panic(err)
    }

    // Transpile the TypeScript code to JavaScript
    jsCode, err := typescript.TranspileString(string(content))
    if err != nil {
        panic(err)
    }

    // Extract the "path" values from the transpiled JavaScript code
    re := regexp.MustCompile(`path:\s*['"]([^'"]+)['"]`)
    matches := re.FindAllStringSubmatch(jsCode, -1)
    paths := make([]string, 0)
    for _, match := range matches {
        paths = append(paths, match[1])
    }

	return paths
}