module Model.Page.LoginModel exposing (..)

type FieldError
   = UsernameError String
   | PasswordError String

validateField : LoginField -> LoginModel -> LoginModel
validateField field model = 
   case field of
      Username -> 
         let error = 
               if model.username == "" then 
                  Just (UsernameError "Username cannot be empty") 
               else
                  Nothing
         in { model | errors = errorInList Username error model.errors }

      Password -> 
         let error = 
               if model.password == "" then 
                  Just (PasswordError "Password cannot be empty") 
               else 
                  Nothing
         in { model | errors = errorInList Password error model.errors }

getUsernameError : List FieldError -> Maybe String
getUsernameError errors =
   errors
      |> List.filterMap (\e ->
            case e of
               UsernameError msg -> Just msg
               _ -> Nothing
         )
      |> List.head

getPasswordError : List FieldError -> Maybe String
getPasswordError errors =
   errors
      |> List.filterMap (\e ->
            case e of
               PasswordError msg -> Just msg
               _ -> Nothing
         )
      |> List.head

type alias LoginModel =
   { username : String
   , password : String
   , saveSession : Bool
   , loginButtonDisabled : Bool
   , errors : List FieldError
   }

empty : LoginModel
empty = 
   { username = ""
   , password = ""
   , saveSession = False 
   , loginButtonDisabled = False
   , errors = []
   }

type LoginField
   = Username
   | Password

errorInList : LoginField -> Maybe FieldError -> List FieldError -> List FieldError
errorInList field maybeError errors =
   let filteredErrors = 
         List.filter (\e ->
            case (field, e) of
               (Username, UsernameError _) -> False
               (Password, PasswordError _) -> False
               _ -> True
         ) errors
   in case maybeError of
         Just err -> err :: filteredErrors
         Nothing -> filteredErrors