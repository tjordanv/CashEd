import { rest } from "msw"

export const handlers = [
  rest.get(
    "http://localhost:8080/auth/checkEmailAvailability",
    (req, res, ctx) => {
      const email = req.url.searchParams.get("email")
      return res(ctx.status(200), ctx.json(email === "taken@email.com"))
    }
  ),
  rest.get(
    "http://localhost:8080/auth/checkUsernameAvailability",
    (req, res, ctx) => {
      const username = req.url.searchParams.get("username")
      return res(ctx.status(200), ctx.json(username !== "user"))
    }
  ),
  rest.post("http://localhost:8080/auth/register", (req, res, ctx) => {
    sessionStorage.setItem("isCreated", true)
    return res(
      ctx.status(200),
      ctx.json({ username: "newUser", password: "Test123$" })
    )
  }),
  rest.post("http://localhost:8080/auth/login", (req, res, ctx) => {
    const user = { username: "user", password: "password" }
    const newUser = { username: "newUser", password: "Test123$" }
    return req.json().then((data) => {
      if (
        (data.username === user.username && data.password === user.password) ||
        (data.username === newUser.username &&
          data.password === newUser.password)
      ) {
        sessionStorage.setItem("isLoggedIn", true)
        return res(ctx.status(200), ctx.json({ id: 1, ...data }))
      } else {
        return res(ctx.status(200))
      }
    })
  }),
  rest.put("http://localhost:8080/auth/updatePassword", (req, res, ctx) => {
    return req.json().then((data) => {
      if (data.id === "1" && data.password === "newPassword1!") {
        return res(ctx.status(200), ctx.json(true))
      } else {
        return res(ctx.status(200), ctx.json(false))
      }
    })
  })
]
