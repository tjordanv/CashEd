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
  }),
  rest.get(
    "http://localhost:8080/auth/getUserIdByEmailAndUsername",
    (req, res, ctx) => {
      const email = req.url.searchParams.get("emailAddress")
      const username = req.url.searchParams.get("username")
      if (email === "taken@email.com" && !username) {
        return res(ctx.status(200), ctx.json(1))
      } else if (email === "taken@email.com" && username === "user") {
        return res(ctx.status(200), ctx.json(2))
      } else {
        return res(ctx.status(200), ctx.json(0))
      }
    }
  ),
  rest.get(
    "http://localhost:8080/auth/getSecurityQuestions",
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json([
          {
            id: 1,
            question: "What is your favorite color?"
          },
          {
            id: 2,
            question: "What is your favorite food?"
          },
          {
            id: 3,
            question: "What is your favorite animal?"
          }
        ])
      )
    }
  ),
  rest.post(
    "http://localhost:8080/saveSecurityQuestionAnswer",
    (req, res, ctx) => {
      return res(ctx.status(201))
    }
  ),
  rest.get(
    "http://localhost:8080/auth/getActiveSecurityQuestionAnswersByUserId",
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json([
          {
            id: 1,
            question: "What is your favorite color?"
          },
          {
            id: 2,
            question: "What is your favorite food?"
          },
          {
            id: 3,
            question: "What is your favorite animal?"
          }
        ])
      )
    }
  ),
  rest.get("http://localhost:8080/auth/validateAnswer", (req, res, ctx) => {
    const answer = req.url.searchParams.get("answerProvided")
    return res(ctx.status(200), ctx.json(answer === "correct answer"))
  }),
  rest.get("http://localhost:8080/auth/usernameRecovery", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(true))
  }),
  rest.get("http://localhost:8080/auth/resetPassword", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(true))
  }),
  rest.get("http://localhost:8080/fetcherTest", (req, res, ctx) => {
    // Get the Authorization header
    const authHeader = req.headers.authorization

    // The Authorization header should be in the format "Bearer <token>"
    // You can get the token by removing the "Bearer " prefix
    const token = authHeader.replace("Bearer ", "")
    return res(ctx.status(200), ctx.json(token === "validToken" ? true : false))
  })
]
