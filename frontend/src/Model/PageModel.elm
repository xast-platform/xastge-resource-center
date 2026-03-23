module Model.PageModel exposing (..)

import Model.Route exposing (Route(..))

type PageModel = A | B | C

fromRoute : Route -> PageModel
fromRoute route = case route of
   Home -> A
   _ -> B