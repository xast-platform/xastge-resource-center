module Model.Page.RegisterModel exposing (..)

type FieldError
   = UsernameError String
   | EmailError String
   | PasswordError String
   | PasswordAgainError String

fieldsEmpty : RegisterModel -> Bool
fieldsEmpty model 
   = model.username == "" 
   || model.email == "" 
   || model.password == "" 
   || model.passwordAgain == ""

validated : RegisterModel -> RegisterModel
validated model = 
   let usernameErrors =
         if (not (String.isEmpty model.username)) && String.length model.username < 3 then
            [ UsernameError "Username must be at least 3 characters long" ]
         else
            []
       emailErrors =
         if (not (String.isEmpty model.email)) && (String.length model.email < 5 || not (String.contains "@" model.email)) then
            [ EmailError "Please enter a valid email address" ]
         else
            []
       passwordErrors =
         if (not (String.isEmpty model.password)) && String.length model.password < 6 then
            [ PasswordError "Password must be at least 6 characters long" ]
         else
            []
       passwordAgainErrors =
         if (not (String.isEmpty model.passwordAgain)) && model.password /= model.passwordAgain then
            [ PasswordAgainError "Passwords do not match" ]
         else
            []

   in { model | errors = usernameErrors 
         ++ emailErrors 
         ++ passwordErrors 
         ++ passwordAgainErrors 
      }

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