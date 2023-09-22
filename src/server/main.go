package main

import (
    "os"
    "fmt"
    "net/http"
    "path/filepath"
    "github.com/labstack/echo/v4"
    "github.com/gorilla/websocket"
    "github.com/fsnotify/fsnotify"
    "aleleba/react-server/config"
    "aleleba/react-server/web"
    "aleleba/react-server/utils"
)

func init() {
    config.LoadEnv()
}

func main() {
    //Getting the port from the environment
    port := os.Getenv("PORT")

    paths := utils.GetRoutes()

    e := echo.New()

    // Watch for file changes in the ./web/dist directory
    watcher, err := fsnotify.NewWatcher()
    if err != nil {
        panic(err)
    }
    defer watcher.Close()

    if err := filepath.Walk("./web", func(path string, info os.FileInfo, err error) error {
        if err != nil {
            return err
        }
        if !info.IsDir() {
            if err := watcher.Add(path); err != nil {
                return err
            }
        }
        return nil
    }); err != nil {
        panic(err)
    }

    // Create a websocket upgrader
    upgrader := websocket.Upgrader{}

    // Handle websocket connections
    e.GET("/ws", func(c echo.Context) error {
        // Upgrade the HTTP connection to a websocket connection
        ws, err := upgrader.Upgrade(c.Response(), c.Request(), nil)
        if err != nil {
            return err
        }

        // Watch for file changes in the ./web/dist directory
        go func() {
            for {
                select {
                case event, ok := <-watcher.Events:
                    if !ok {
                        return
                    }
                    if event.Op&fsnotify.Write == fsnotify.Write {
                        fmt.Println("modified file:", event.Name)

                        // Send a message to the client to reload the page
                        if err := ws.WriteMessage(websocket.TextMessage, []byte("reload")); err != nil {
                            fmt.Println("error sending message:", err)
                        }
                    }
                case err, ok := <-watcher.Errors:
                    if !ok {
                        return
                    }
                    fmt.Println("error:", err)
                }
            }
        }()

        // Read messages from the client (not used in this example)
        /*for {
            _, _, err := ws.ReadMessage()
            if err != nil {
                fmt.Println("error reading message:", err)
                break
            }
        }*/

        return nil
    })

    web.RegisterHandlers(e, paths)

    // Add your custom api routes here.
    // Example:
    e.GET("/api", func(c echo.Context) error {
        return c.String(http.StatusOK, "Hello, World!")
    })

    e.Logger.Fatal(e.Start(":" + port))
}