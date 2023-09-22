package web

import (
	"embed"
    //"path/filepath"
    //"fmt"
    "net/http"
	"github.com/labstack/echo/v4"
    "aleleba/react-server/utils"
)

// embed the dist folder
var (
    //go:embed dist/*
    dist embed.FS
    
    indexHTML     embed.FS
    distDirFS     = echo.MustSubFS(dist, "dist")
    //distIndexHtml = echo.MustSubFS(indexHTML, "dist")
) 

func RegisterHandlers(e *echo.Echo, paths []string) {
    // Print the "path" values
    for _, path := range paths {
        //e.FileFS(path, "index.html", distIndexHtml)
        //e.StaticFS(path, distDirFS)
        e.Static(path, "web/dist")
        e.GET(path, func(c echo.Context) error {
            // Construct the file path
            //filePath := filepath.Join("web", "dist", "index.html")
            // Return the HTML file
            //return c.File(filePath)
            url := c.Request().URL.String()
            component := utils.JsxToString(url)
            html := `<!DOCTYPE html>
                        <html lang="es">
                            <head>
                                <meta charset="UTF-8">
                                <link rel="shortcut icon" href="favicon.ico">
                                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                                <meta name="theme-color" content="#000000">
                                <!-- ${manifestJson} -->
                                <link href="assets/frontend.css" rel="stylesheet" type="text/css"></link>
                                
                                <title>App</title>
                            </head>
                            <body>
                                <div id="app">`+ component +`</div>
                                <!-- <script>
                                    window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
                                </script> -->
                                <script src="assets/app-frontend.js" type="text/javascript"></script>
                                <script src="assets/vendor-vendors.js" type="text/javascript"></script>
                            </body>
                        </html>`
        return c.HTMLBlob(http.StatusOK, []byte(html))
        })
    }

}