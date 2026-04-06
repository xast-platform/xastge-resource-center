module Model.Page.ConfirmModel exposing (..)

import Model.Page.RegisterModel exposing (SubmitStatus)

type alias ConfirmModel =
   { token : String
   , status : Maybe SubmitStatus
   }

init : String -> ConfirmModel
init token =
   { token = token
   , status = Nothing
   }
