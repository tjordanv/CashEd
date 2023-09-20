import classes from "./AuthFooter.module.css"

const AuthFooter = () => {
  return (
    <div className={classes.footerContainer}>
      <svg
        className={classes.vector}
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="300"
        viewBox="0 0 1440 300"
        fill="none"
      >
        <path
          d="M390.235 42.6938C148.945 -20.1494 29.541 6.28171 0 27.3527V290.37H1440V2.95471C1417.31 21.13 1285.38 47.8322 939.109 9.23907C506.277 -39.0024 691.846 121.248 390.235 42.6938Z"
          fill="url(#paint0_linear_1176_86)"
        />
        <defs>
          <linearGradient
            id="paint0_linear_1176_86"
            x1="720"
            y1="0"
            x2="720"
            y2="300"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#DEF6FF" />
            <stop offset=".4" stopColor="#227C9D" />
          </linearGradient>
        </defs>
      </svg>
      <svg
        className={`${classes.vector} ${classes.middle}`}
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="220"
        viewBox="0 0 1440 220"
        fill="none"
      >
        <path
          d="M935.089 16.7944C816.389 -13.6178 262.238 29.4661 0 54.8096V219.926H1440V0.666748C1321.15 18.7143 1053.79 47.2065 935.089 16.7944Z"
          fill="url(#paint0_linear_1176_87)"
        />
        <defs>
          <linearGradient
            id="paint0_linear_1176_87"
            x1="720"
            y1="0.666748"
            x2="720"
            y2="98.1588"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#FFF7EA" />
            <stop offset="1" stopColor="#FFCB77" />
          </linearGradient>
        </defs>
      </svg>
      <svg
        className={`${classes.vector} ${classes.bottom}`}
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="250"
        viewBox="0 0 1440 250"
        fill="none"
      >
        <path
          d="M343.034 41.5537C308.08 14.6143 99.7805 37.6594 0 52.5493V257H1440V9.2539C1381.9 -23.0459 1171.34 41.5537 1119.74 41.5537C1068.15 41.5537 860.839 103.748 770.2 52.5493C679.561 1.35074 386.727 75.2279 343.034 41.5537Z"
          fill="url(#paint0_linear_1176_88)"
        />
        <defs>
          <linearGradient
            id="paint0_linear_1176_88"
            x1="720"
            y1="0.209961"
            x2="720"
            y2="250"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#FFF3F4" />
            <stop offset="1" stopColor="#FE6D73" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}

export default AuthFooter
