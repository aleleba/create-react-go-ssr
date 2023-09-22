import * as express from "express"

declare global {
	namespace Express {
	  interface Request {
		hashManifest?: Record<string,any>
	  }
	}
}