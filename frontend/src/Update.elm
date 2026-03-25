module Update exposing (..)

import Browser.Navigation as Nav
import Model exposing (Model)
import Event exposing (Msg(..))
import Browser exposing (UrlRequest(..))
import Model.Route exposing (parseUrl)
import Url
import Model.PageModel as PageModel
import Model.Page.RegisterModel as Register
import Model.Page.LoginModel as Login
import Api.Rest exposing (register)
import Api.Ports as Ports
import Http
import Model.AccountStatus exposing (AccountStatus(..))

update : Msg -> Model -> ( Model, Cmd Msg )
update msg model = 
   case msg of
      -- GENERAL
      UrlChange url ->
         let newRoute = parseUrl url
         in 
            (  { model 
               | route = newRoute 
               , page = PageModel.fromRoute newRoute
               }
            , Cmd.none
            )

      LinkClicked req ->
         case req of 
            External href ->
               ( model, Nav.load href )

            Internal url ->
               ( model, Nav.pushUrl model.key (Url.toString url) )     
      
      SetBackend backend -> 
         ({ model | backend = backend }, Cmd.none)

      -- REGISTER
      UpdateRegisterField field str ->
         case model.page of
            PageModel.Register rm ->
               (  { model | page = PageModel.Register 
                     ( case field of
                        Register.Username -> Register.validateField Register.Username { rm | username = str, submitStatus = Nothing }
                        Register.Email -> Register.validateField Register.Email { rm | email = str, submitStatus = Nothing }
                        Register.Password -> Register.validateField Register.Password { rm | password = str, submitStatus = Nothing }
                        Register.PasswordAgain -> Register.validateField Register.PasswordAgain { rm | passwordAgain = str, submitStatus = Nothing }
                     ) 
                  }
               , Cmd.none
               )
            _ -> ( model, Cmd.none )

      UpdateRegisterSaveSession val ->
         case model.page of
            PageModel.Register rm -> ( { model | page = PageModel.Register { rm | saveSession = val } }, Cmd.none )
            _ -> ( model, Cmd.none )

      SubmitRegister registerModel ->
         let newModel = registerModel
               |> Register.validateField Register.Username
               |> Register.validateField Register.Email
               |> Register.validateField Register.Password
               |> Register.validateField Register.PasswordAgain
         in if List.isEmpty newModel.errors then
            (  { model
               | page = PageModel.Register
                  { newModel
                  | registerButtonDisabled = True
                  }
               }
            , register 
               { username = newModel.username
               , email = newModel.email
               , password = newModel.password
               , saveSession = newModel.saveSession
               }
            )
         else
            ({ model | page = PageModel.Register newModel }, Cmd.none)

      RegisterResponseReceived result ->
         case model.page of
            PageModel.Register rm ->
               case result of
                  Ok userData ->
                     (  { model 
                        | page = PageModel.Register
                           { rm
                           | registerButtonDisabled = False
                           , submitStatus = Just (Register.Success "Registered successfully")
                           } 
                        , accountStatus = LoggedIn userData
                        }
                     , Ports.saveUserData userData
                     )

                  Err err ->
                     ( { model
                        | page = PageModel.Register
                           { rm
                           | registerButtonDisabled = False
                           , submitStatus = Just (Register.Error (httpErrorToMessage err))
                           }
                        }
                     , Cmd.none
                     )

            _ ->
               ( model, Cmd.none )


      -- LOGIN
      UpdateLoginField field str ->
         case model.page of
            PageModel.Login lm ->
               (  { model | page = PageModel.Login 
                     ( case field of
                        Login.Username -> Login.validateField Login.Username { lm | username = str }
                        Login.Password -> Login.validateField Login.Password { lm | password = str }
                     ) 
                  }
               , Cmd.none
               )
            _ -> ( model, Cmd.none )

      UpdateLoginSaveSession val ->
         case model.page of
            PageModel.Login lm -> ( { model | page = PageModel.Login { lm | saveSession = val } }, Cmd.none )
            _ -> ( model, Cmd.none )

      SubmitLogin loginModel ->
         let newModel = loginModel
               |> Login.validateField Login.Username
               |> Login.validateField Login.Password
         in if List.isEmpty newModel.errors then
            (  { model
               | page = PageModel.Login
                  { newModel
                  | loginButtonDisabled = True
                  }
               }
            , Cmd.none
            )
         else
            ({ model | page = PageModel.Login newModel }, Cmd.none)

      _ -> (model, Cmd.none)


httpErrorToMessage : Http.Error -> String
httpErrorToMessage err =
   case err of
      Http.BadUrl _ ->
         "Invalid request URL"

      Http.Timeout ->
         "Request timed out"

      Http.NetworkError ->
         "Network error, check if backend is running"

      Http.BadStatus status ->
         if status == 409 then
            "Username or email already exists"
         else
            "Registration failed"

      Http.BadBody message ->
         if String.trim message == "" then
            "Unexpected response from server"
         else
            message