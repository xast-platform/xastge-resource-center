module Model.Page.RegisterModel exposing (..)

type FieldError
   = UsernameError String
   | EmailError String
   | PasswordError String
   | PasswordAgainError String

validateField : RegisterField -> RegisterModel -> RegisterModel
validateField field model = 
   case field of
      Username -> 
         let error = 
               if model.username == "" then 
                  Just (UsernameError "Username cannot be empty") 
               else if String.length model.username < 3 then
                  Just (UsernameError "Username must be at least 3 characters long")
               else
                  Nothing
         in { model | errors = errorInList Username error model.errors }

      Email -> 
         let error = 
               if model.email == "" then 
                  Just (EmailError "Email cannot be empty") 
               else if not (String.contains "@" model.email) then
                  Just (EmailError "This field must be a valid email")
               else 
                  Nothing
         in { model | errors = errorInList Email error model.errors }

      Password -> 
         let error = 
               if model.password == "" then 
                  Just (PasswordError "Password cannot be empty") 
               else if String.length model.password < 6 then
                  Just (PasswordError "Password must be at least 6 characters long")
               else 
                  Nothing
         in { model | errors = errorInList Password error model.errors }

      PasswordAgain -> 
         let error = 
               if model.passwordAgain == "" then 
                  Just (PasswordAgainError "Please confirm your password") 
               else if model.passwordAgain /= model.password then
                  Just (PasswordAgainError "Passwords do not match")
               else 
                  Nothing
         in { model | errors = errorInList PasswordAgain error model.errors }

getUsernameError : List FieldError -> Maybe String
getUsernameError errors =
   errors
      |> List.filterMap (\e ->
            case e of
               UsernameError msg -> Just msg
               _ -> Nothing
         )
      |> List.head

getEmailError : List FieldError -> Maybe String
getEmailError errors =
   errors
      |> List.filterMap (\e ->
            case e of
               EmailError msg -> Just msg
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

getPasswordAgainError : List FieldError -> Maybe String
getPasswordAgainError errors =
   errors
      |> List.filterMap (\e ->
            case e of
               PasswordAgainError msg -> Just msg
               _ -> Nothing
         )
      |> List.head

type alias RegisterModel =
   { username : String
   , email : String
   , password : String
   , passwordAgain : String
   , saveSession : Bool
   , registerButtonDisabled : Bool
   , errors : List FieldError
   }

type RegisterField
   = Username
   | Email
   | Password
   | PasswordAgain

empty : RegisterModel
empty = 
   { username = ""
   , email = ""
   , password = ""
   , passwordAgain = ""
   , saveSession = False
   , registerButtonDisabled = False
   , errors = []
   }

errorInList : RegisterField -> Maybe FieldError -> List FieldError -> List FieldError
errorInList field maybeError errors =
   let filteredErrors = 
         List.filter (\e ->
            case (field, e) of
               (Username, UsernameError _) -> False
               (Email, EmailError _) -> False
               (Password, PasswordError _) -> False
               (PasswordAgain, PasswordAgainError _) -> False
               _ -> True
         ) errors
   in case maybeError of
         Just err -> err :: filteredErrors
         Nothing -> filteredErrors