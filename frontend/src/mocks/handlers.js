import { rest } from "msw"

export const handlers = [
  rest.get(
    "http://localhost:8080/auth/checkUsernameAndEmail",
    (req, res, ctx) => {
      const username = req.url.searchParams.get("username")
      const email = req.url.searchParams.get("email")

      const isUsernameTaken = username === "user" ? true : false
      const isEmailTaken = email === "taken@email.com" ? true : false

      return res(ctx.status(200), ctx.json([isUsernameTaken, isEmailTaken]))
    }
  ),
  rest.post("http://localhost:8080/auth/register", (req, res, ctx) => {
    sessionStorage.setItem("isCreated", true)

    return res(ctx.status(201))
  }),
  rest.post("http://localhost:8080/auth/login", (req, res, ctx) => {
    const isCreated = sessionStorage.getItem("isCreated")
    if (!isCreated) {
      return res(ctx.status(403))
    }

    return res(
      ctx.status(200),
      ctx.json({ id: 1, username: "testuser", email: "test@email.com" })
    )
  })
]
