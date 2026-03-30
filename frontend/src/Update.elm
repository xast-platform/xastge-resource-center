module Update exposing (..)

import Url
import Http
import Browser.Navigation as Nav
import Model exposing (Model)
import Event exposing (Msg(..))
import Browser exposing (UrlRequest(..))
import Model.Route as Route
import Model.Route exposing (Route, parseUrl)
import Model.PageModel as PageModel
import Model.Page.RegisterModel as Register
import Model.Page.LoginModel as Login
import Model.Page.DashboardModel as Dashboard
import Model.AccountStatus exposing (AccountStatus(..))
import Api.Rest exposing (login, register, uploadAsset)
import Api.Ports as Ports

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
            ,  if shouldRedirectAuthenticated model.accountStatus newRoute then
                  Nav.replaceUrl model.key "/"
               else if shouldRedirectAnonymous model.accountStatus newRoute then
                  Nav.replaceUrl model.key "/login"
               else
                  Cmd.none
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
                     , Cmd.batch
                        [ Ports.saveUserData userData
                        , Nav.pushUrl model.key "/"
                        ]
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
            , login 
               { username = newModel.username
               , password = newModel.password
               , saveSession = newModel.saveSession
               }
            )
         else
            ({ model | page = PageModel.Login newModel }, Cmd.none)

      LoginResponseReceived result ->
         case model.page of
            PageModel.Login lm ->
               case result of
                  Ok userData ->
                     (  { model 
                        | page = PageModel.Login
                           { lm
                           | loginButtonDisabled = False
                           , submitStatus = Just (Register.Success "Logged in successfully")
                           } 
                        , accountStatus = LoggedIn userData
                        }
                     , Cmd.batch
                        [ Ports.saveUserData userData
                        , Nav.pushUrl model.key "/"
                        ]
                     )

                  Err err ->
                     ( { model
                        | page = PageModel.Login
                           { lm
                           | loginButtonDisabled = False
                           , submitStatus = Just (Register.Error (httpErrorToMessage err))
                           }
                        }
                     , Cmd.none
                     )

            _ ->
               ( model, Cmd.none )

      Logout -> 
         ( { model | accountStatus = LoggedOut }
         , Cmd.batch
            [ Ports.cleanUserData ()
            , Nav.pushUrl model.key "/login"
            ]
         )

      -- DASHBOARD
      SelectDashboardTab tab ->
         case model.page of
            PageModel.Dashboard dbm ->
               ( { model | page = PageModel.Dashboard { dbm | tab = tab } }, Cmd.none )
            _ ->
               ( model, Cmd.none )

      UpdateDashboardAssetType assetType ->
         case model.page of
            PageModel.Dashboard dbm ->
               ( { model
                  | page = PageModel.Dashboard
                     (Dashboard.validateUploadField Dashboard.AssetType
                        { dbm
                        | assetType = assetType
                        , uploadStatus = Nothing
                        }
                     )
                  }
               , Cmd.none
               )

            _ ->
               ( model, Cmd.none )

      UpdateDashboardDescription description ->
         case model.page of
            PageModel.Dashboard dbm ->
               ( { model
                  | page = PageModel.Dashboard
                     (Dashboard.validateUploadField Dashboard.Description
                        { dbm
                        | description = description
                        , uploadStatus = Nothing
                        }
                     )
                  }
               , Cmd.none
               )

            _ ->
               ( model, Cmd.none )

      UpdateDashboardTags tags ->
         case model.page of
            PageModel.Dashboard dbm ->
               ( { model | page = PageModel.Dashboard { dbm | tags = tags, uploadStatus = Nothing } }
               , Cmd.none
               )

            _ ->
               ( model, Cmd.none )

      SelectDashboardAssetFile assetFile ->
         case model.page of
            PageModel.Dashboard dbm ->
               ( { model
                  | page = PageModel.Dashboard
                     (Dashboard.validateUploadField Dashboard.AssetFile
                        { dbm
                        | assetFile = Just assetFile
                        , uploadStatus = Nothing
                        }
                     )
                  }
               , Cmd.none
               )

            _ ->
               ( model, Cmd.none )

      SelectDashboardThumbnailFile thumbnailFile ->
         case model.page of
            PageModel.Dashboard dbm ->
               ( { model
                  | page = PageModel.Dashboard
                     (Dashboard.validateUploadField Dashboard.ThumbnailFile
                        { dbm
                        | thumbnailFile = Just thumbnailFile
                        , uploadStatus = Nothing
                        }
                     )
                  }
               , Cmd.none
               )

            _ ->
               ( model, Cmd.none )

      SubmitDashboardUpload ->
         case model.page of
            PageModel.Dashboard dbm ->
               let
                  validatedModel =
                     dbm
                        |> Dashboard.validateUploadField Dashboard.AssetType
                        |> Dashboard.validateUploadField Dashboard.AssetFile
                        |> Dashboard.validateUploadField Dashboard.ThumbnailFile
                        |> Dashboard.validateUploadField Dashboard.Description
               in
               if List.isEmpty validatedModel.uploadErrors then
                  case ( model.accountStatus, validatedModel.assetFile ) of
                     ( LoggedIn userData, Just assetFile ) ->
                        ( { model
                           | page = PageModel.Dashboard
                              { validatedModel
                              | uploadButtonDisabled = True
                              }
                           }
                        , uploadAsset
                           { assetType = validatedModel.assetType
                           , description = String.trim validatedModel.description
                           , tags = validatedModel.tags
                           , token = userData.token
                           , assetFile = assetFile
                           , thumbnailFile = validatedModel.thumbnailFile
                           }
                        )

                     ( LoggedOut, _ ) ->
                        ( { model
                           | page = PageModel.Dashboard
                              { validatedModel
                              | uploadStatus = Just (Register.Error "You must be logged in")
                              }
                           }
                        , Cmd.none
                        )

                     ( _, Nothing ) ->
                        ( { model | page = PageModel.Dashboard validatedModel }, Cmd.none )
               else
                  ( { model | page = PageModel.Dashboard validatedModel }, Cmd.none )

            _ ->
               ( model, Cmd.none )

      DashboardUploadResponseReceived result ->
         case model.page of
            PageModel.Dashboard dbm ->
               case result of
                  Ok message ->
                     ( { model
                        | page = PageModel.Dashboard
                           { dbm
                           | assetType = "Scene"
                           , assetFile = Nothing
                           , thumbnailFile = Nothing
                           , description = ""
                           , tags = ""
                           , uploadButtonDisabled = False
                           , uploadErrors = []
                           , uploadStatus = Just (Register.Success message)
                           }
                        }
                     , Cmd.none
                     )

                  Err err ->
                     ( { model
                        | page = PageModel.Dashboard
                           { dbm
                           | uploadButtonDisabled = False
                           , uploadStatus = Just (Register.Error (httpErrorToMessage err))
                           }
                        }
                     , Cmd.none
                     )

            _ ->
               ( model, Cmd.none )


      _ -> (model, Cmd.none)


shouldRedirectAuthenticated : AccountStatus -> Route -> Bool
shouldRedirectAuthenticated accountStatus route =
   case accountStatus of
      LoggedIn _ ->
         case route of
            Route.Login ->
               True

            Route.Register ->
               True

            _ ->
               False

      LoggedOut ->
         False


shouldRedirectAnonymous : AccountStatus -> Route -> Bool
shouldRedirectAnonymous accountStatus route =
   case accountStatus of
      LoggedOut ->
         case route of
            Route.Dashboard ->
               True

            _ ->
               False

      LoggedIn _ ->
         False


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