module Model.Route exposing (..)

import Url.Parser exposing (oneOf, map, top, s, parse, Parser, (</>))
import Url

type Route
   = Home
   | About
   | Login
   | Register
   | Dashboard
   | Asset String
   | NotFound String

routeParser : Parser (Route -> a) a
routeParser = oneOf
   [ map Home top
   , map Login (s "login")
   , map Register (s "register")
   , map About (s "about")
   , map Dashboard (s "dashboard")
   , map Asset (s "asset" </> Url.Parser.string)
   ]

parseUrl : Url.Url -> Route
parseUrl url =
   parse routeParser url
      |> Maybe.withDefault (NotFound (String.dropLeft 1 url.path))

getTitle : Route -> String
getTitle route = case route of
   Home -> "XastGE Resource Center"
   About -> "About | XastGE Resource Center"
   NotFound _ -> "Page not found | XastGE Resource Center"
   Register -> "Register | XastGE Resource Center"
   Login -> "Login | XastGE Resource Center"
   Dashboard -> "Dashboard | XastGE Resource Center"
   Asset _ -> "Asset | XastGE Resource Center"