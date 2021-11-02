import request from "../utils/request";

export const getArticles = (params) => {
  return request({
    method: 'GET',
    url: 'articles',
    params
  })
}

export const getFeedArticles = (params) => {
  return request({
    method: 'GET',
    url: 'articles/feed',
    headers: {
      authorization: `Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjQxNjQ3MTk4N0BxcS5jb20iLCJ1c2VybmFtZSI6ImZha2VyIiwicGFzc3dvcmQiOiIkMmEkMTAkTkpNYncxTFdDL1dvajVoekxBaGxjT2NYcWtDdXNvaFpDZ05NUDZlblJ1b2U1YVZvUllsY2EiLCJiaW8iOm51bGwsImltYWdlIjoiaHR0cHM6Ly9yZWFsd29ybGQtdGVtcC1hcGkuaGVyb2t1YXBwLmNvbS9pbWFnZXMvc21pbGV5LWN5cnVzLmpwZWciLCJpYXQiOjE2MzU4NjE2NTcsImV4cCI6MTY0MTA0NTY1N30.WLHguVRpPIw4GhPZOBFRn25QuWqKqLRA3Pj4-iBxshE`
    },
    params
  })
}