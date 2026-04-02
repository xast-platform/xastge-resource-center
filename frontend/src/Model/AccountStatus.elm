module Model.AccountStatus exposing (..)

type AccountStatus 
   = LoggedOut
   | LoggedIn UserData

type alias UserData =
   { username : String
   , email : String
   , token : String
   , confirmed : Bool
   , role : String
   }