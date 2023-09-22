package utils

import (
	"fmt"
	"os/exec"
)

func JsxToString(url string) string {
    // Set the path to the jsxToString.js file
    jsFilePath := "./web/utils/tsxToString.js"

    // Create the command to run Node.js with the jsxToString.js file
    cmd := exec.Command("node", jsFilePath, url)

    // Get a pipe to the standard input of the Node.js process
    stdin, err := cmd.StdinPipe()
    if err != nil {
        fmt.Println(err)
        return ""
    }

    // Write the URL parameter to the standard input of the Node.js process
    fmt.Fprintf(stdin, "%s\n", url)

    // Close the standard input pipe
    stdin.Close()

    // Get the output and error of the Node.js process
    output, err := cmd.CombinedOutput()
    if err != nil {
        fmt.Println(err)
        return string(output)
    }

    // Return the output of the Node.js process
    return string(output)
}