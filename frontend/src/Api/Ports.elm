port module Api.Ports exposing (..)
import Model.AccountStatus exposing (UserData)

port saveBackend : String -> Cmd msg

port saveUserData : UserData -> Cmd msg